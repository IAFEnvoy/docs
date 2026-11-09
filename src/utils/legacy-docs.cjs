function languageLinks(currentUrl) {
  const url = new URL(currentUrl, 'https://docs.iafenvoy.com');
  const suffix = url.pathname + url.search + url.hash;
  return {en: '/en' + suffix, zh: '/zh' + suffix};
}

function isLegacyDocs(pathname) {
  return pathname === '/docs' || pathname.startsWith('/docs/');
}

function languageChoiceHtml(currentUrl, fallback = false) {
  const links = languageLinks(currentUrl);
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>选择语言 / Choose a language</title>
<style>:root{color-scheme:light dark}*{box-sizing:border-box}body{margin:0;font:16px/1.6 system-ui,sans-serif;background:light-dark(#f6f7f9,#17191d);color:light-dark(#222,#eee);min-height:100vh;display:grid;place-items:center;padding:1.5rem}main{width:100%;max-width:30rem;padding:2rem;border:1px solid light-dark(#ddd,#444);border-radius:12px;background:light-dark(white,#22252b)}h1{font-size:1.5rem;margin-top:0}p{color:light-dark(#555,#bbb)}nav{display:flex;gap:1rem;flex-wrap:wrap}a{flex:1;text-align:center;padding:.75rem 1rem;border:1px solid #6084cc;border-radius:6px;color:light-dark(#244d9f,#a4c5ff);text-decoration:none}a:hover{background:light-dark(#eef3ff,#303b50)}a:focus-visible{outline:3px solid #6084cc;outline-offset:3px}</style></head>
<body><main><h1 id="heading">选择语言 / Choose a language</h1><p id="message">请选择文档语言。<br>Please select the documentation language.</p><nav aria-label="Language"><a id="en" lang="en" href="${escape(links.en)}">English</a><a id="zh" lang="zh-CN" href="${escape(links.zh)}">简体中文</a></nav></main>
<script>const links=(${languageLinks.toString()})(location.href);for(const locale of ['en','zh'])document.getElementById(locale).href=links[locale];${fallback ? `if(!(${isLegacyDocs.toString()})(location.pathname)){document.getElementById('heading').textContent='404';document.getElementById('message').textContent='找不到页面 / Page not found';document.getElementById('en').href='/en/';document.getElementById('zh').href='/zh/';}` : ''}</script></body></html>\n`;
}

module.exports = {languageLinks, isLegacyDocs, languageChoiceHtml};
