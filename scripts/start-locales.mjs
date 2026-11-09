import {spawn} from 'node:child_process';
import {EventEmitter} from 'node:events';
import net from 'node:net';
import path from 'node:path';
import {createRequire} from 'node:module';
import {createLocaleProxy} from './locale-proxy.mjs';

function option(args, names, fallback) {
  const index = args.findIndex(arg => names.includes(arg.split('=')[0]));
  if (index === -1) return fallback;
  return args[index].includes('=') ? args[index].slice(args[index].indexOf('=') + 1) : args[index + 1];
}

async function freePort() {
  const listener = net.createServer();
  await new Promise((resolve, reject) => listener.once('error', reject).listen(0, '127.0.0.1', resolve));
  const {port} = listener.address();
  await new Promise(resolve => listener.close(resolve));
  return port;
}

export async function startLocales({cli, args, siteDir}) {
  const publicHost = option(args, ['--host', '-h'], 'localhost');
  const publicPort = Number(option(args, ['--port', '-p'], process.env.PORT ?? '3000'));
  const ports = {en: await freePort(), zh: await freePort()};
  const proxy = createLocaleProxy(ports);
  // Bind the public port before starting compilers, so port conflicts fail clearly.
  await new Promise((resolve, reject) => proxy.once('error', reject).listen(publicPort, publicHost, resolve));
  const boundPort = proxy.address().port;
  const portOptions = ['--port', '-p', '--host', '-h'];
  const childArgs = [];
  for (let index = 0; index < args.length; index++) {
    const argument = args[index];
    if (portOptions.includes(argument)) { index++; continue; }
    if (portOptions.some(name => argument.startsWith(name + '=')) || argument === '--no-open' || argument === '--') continue;
    childArgs.push(argument);
  }
  const lifecycle = new EventEmitter();
  const children = [];
  let stopping = false;
  lifecycle.kill = signal => {
    if (stopping) return;
    stopping = true;
    proxy.close();
    proxy.closeAllConnections();
    for (const child of children) child.kill(signal);
  };
  function stop(code) {
    if (!stopping) lifecycle.kill('SIGTERM');
    lifecycle.emit('exit', code);
  }
  for (const locale of ['en', 'zh']) {
    const child = spawn(process.execPath, [cli, 'start', ...childArgs,
      '--locale', locale, '--host', '127.0.0.1', '--port', String(ports[locale]), '--no-open'], {
      cwd: siteDir, stdio: 'inherit',
      env: {...process.env, DOCUSAURUS_GENERATED_FILES_DIR_NAME: `.docusaurus/dev-${boundPort}-${locale}`, DOCUSAURUS_DEV_LOCALE: locale},
    });
    children.push(child);
    child.on('error', error => { lifecycle.emit('error', error); stop(1); });
    child.on('exit', code => stop(code ?? 1));
  }
  const displayHost = ['0.0.0.0', '::'].includes(publicHost) ? 'localhost' : publicHost;
  const origin = `http://${displayHost.includes(':') ? `[${displayHost}]` : displayHost}:${boundPort}`;
  console.log(`[i18n] English: ${origin}/en/  中文: ${origin}/zh/`);
  console.log('[i18n] Both languages are compiling with hot reload.');
  // Keep the browser on the public origin when start opens it automatically.
  if (!args.includes('--no-open')) {
    const require = createRequire(import.meta.url);
    const core = path.dirname(require.resolve('@docusaurus/core/package.json'));
    const openBrowser = require(path.join(core, 'lib/commands/utils/openBrowser/openBrowser.js')).default;
    await openBrowser(origin + '/');
  }
  return lifecycle;
}
