import http from 'node:http';
import net from 'node:net';

export function localeForRequest(url) {
  const pathname = new URL(url, 'http://localhost').pathname;
  return pathname === '/zh' || pathname.startsWith('/zh/') || pathname === '/__docs_hmr/zh' ? 'zh' : 'en';
}

export function createLocaleProxy(ports) {
  const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    if (url.pathname === '/en' || url.pathname === '/zh') {
      response.writeHead(302, {location: url.pathname + '/' + url.search}).end();
      return;
    }
    const upstream = http.request({
      hostname: '127.0.0.1', port: ports[localeForRequest(request.url)],
      path: request.url, method: request.method, headers: request.headers,
    }, result => {
      response.writeHead(result.statusCode, result.headers);
      result.pipe(response);
    });
    upstream.on('error', () => {
      if (!response.headersSent) response.writeHead(503, {'content-type': 'text/plain; charset=utf-8', 'retry-after': '1'});
      response.end('The documentation server is starting. Please refresh shortly.');
    });
    request.on('aborted', () => upstream.destroy());
    response.on('close', () => upstream.destroy());
    request.pipe(upstream);
  });
  // Each locale has its own webpack HMR socket, carried through the public port.
  server.on('upgrade', (request, socket, head) => {
    const upstream = net.connect(ports[localeForRequest(request.url)], '127.0.0.1', () => {
      upstream.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`);
      for (let index = 0; index < request.rawHeaders.length; index += 2) {
        upstream.write(`${request.rawHeaders[index]}: ${request.rawHeaders[index + 1]}\r\n`);
      }
      upstream.write('\r\n');
      if (head.length) upstream.write(head);
      socket.pipe(upstream).pipe(socket);
    });
    socket.on('error', () => upstream.destroy());
    upstream.on('error', () => socket.destroy());
    socket.on('close', () => upstream.destroy());
    upstream.on('close', () => socket.destroy());
  });
  return server;
}
