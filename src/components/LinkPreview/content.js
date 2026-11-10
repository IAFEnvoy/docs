function pageContent(document) {
  return document.querySelector('main .theme-doc-markdown') || document.querySelector('main');
}

// Development serves an app shell. Read its rendered content in an invisible frame;
// Root and DocItem recognize this frame and skip locale memory and project CSS imports.
async function renderedDocument(url, signal) {
  return new Promise((resolve, reject) => {
    const frame = document.createElement('iframe');
    // Docusaurus measures headings during hydration; display:none would give
    // every heading a zero rectangle and break its TOC calculation.
    Object.assign(frame.style, {position: 'fixed', left: '-100000px', top: '0', width: `${window.innerWidth}px`, height: '800px', visibility: 'hidden', pointerEvents: 'none', border: '0'});
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    frame.inert = true;
    frame.setAttribute('data-docs-preview-source', '');
    frame.title = 'Preview source';
    let observer;
    const timeout = window.setTimeout(() => finish(new Error('Preview timed out')), 45000);
    function finish(error, result) {
      clearTimeout(timeout);
      observer?.disconnect();
      signal.removeEventListener('abort', abort);
      frame.remove();
      if (error) reject(error);
      else resolve(result);
    }
    function abort() { finish(new DOMException('Preview cancelled', 'AbortError')); }
    frame.onload = () => {
      try {
        const contentDocument = frame.contentDocument;
        if (!contentDocument) return finish(new Error('Preview source unavailable'));
        const check = () => {
          if (contentDocument.querySelector('[data-docs-not-found]')) return finish(new Error('Preview page not found'));
          if (contentDocument.documentElement.dataset.hasHydrated === 'true' && pageContent(contentDocument)) {
            // Own the DOM in this window before disposing its source frame.
            finish(null, new DOMParser().parseFromString(contentDocument.documentElement.outerHTML, 'text/html'));
          }
        };
        observer = new MutationObserver(check);
        observer.observe(contentDocument.documentElement, {subtree: true, childList: true, attributes: true});
        check();
      } catch (error) { finish(error); }
    };
    signal.addEventListener('abort', abort, {once: true});
    if (signal.aborted) return abort();
    frame.src = url;
    document.body.append(frame);
  });
}

export async function loadPreview(url, signal) {
  const response = await fetch(url, {signal});
  if (!response.ok || new URL(response.url).origin !== window.location.origin) throw new Error('Preview unavailable');
  const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
  if (parsed.querySelector('[data-docs-not-found]')) throw new Error('Preview page not found');
  return pageContent(parsed) ? parsed : renderedDocument(url, signal);
}

export function previewContent(sourceDocument, url, prefix, interactiveMessage, prismTheme) {
  const content = pageContent(sourceDocument).cloneNode(true);
  const base = new URL(url, window.location.href);
  const title = content.querySelector('h1')?.textContent || sourceDocument.title;
  content.querySelectorAll('script, style, link, base, meta, object, embed, form, button, input, select, textarea, [role="tablist"]').forEach(node => node.remove());
  content.querySelectorAll('iframe, .mxt-tool').forEach(node => {
    const note = document.createElement('p');
    note.textContent = interactiveMessage;
    node.replaceWith(note);
  });
  // Display all code examples when their React tab controls are unavailable.
  content.querySelectorAll('[role="tabpanel"]').forEach(node => { node.hidden = false; });
  // SSR and development may render a different Prism mode. Recolor the copied code
  // with the host mode; scoped project CSS can still override these inline values.
  for (const block of content.querySelectorAll('.theme-code-block')) {
    block.style.setProperty('--prism-background-color', prismTheme.plain.backgroundColor);
    block.style.setProperty('--prism-color', prismTheme.plain.color);
    for (const line of block.querySelectorAll('pre, .token-line')) {
      line.style.color = 'var(--prism-color)';
      line.style.backgroundColor = 'var(--prism-background-color)';
    }
    for (const token of block.querySelectorAll('.token')) {
      token.style.removeProperty('color');
      token.style.removeProperty('background-color');
      for (const rule of prismTheme.styles) {
        if (rule.types.some(type => token.classList.contains(type))) Object.assign(token.style, rule.style);
      }
    }
  }
  const ids = new Map(Array.from(content.querySelectorAll('[id]'), node => {
    const id = node.getAttribute('id');
    return [id, prefix + id];
  }));
  for (const node of content.querySelectorAll('*')) {
    // Keep the host page's document-wide TOC observer out of the preview.
    node.classList.remove('anchor', 'table-of-contents__link', 'table-of-contents__link--active');
    for (const attribute of Array.from(node.attributes)) {
      if (/^on/i.test(attribute.name) || ['srcdoc', 'autofocus', 'contenteditable'].includes(attribute.name)) node.removeAttribute(attribute.name);
    }
    if (node.hasAttribute('id')) node.setAttribute('id', prefix + node.getAttribute('id'));
    for (const attribute of ['for', 'aria-labelledby', 'aria-describedby', 'aria-controls']) {
      if (node.hasAttribute(attribute)) node.setAttribute(attribute, node.getAttribute(attribute).split(' ').map(id => ids.get(id) || id).join(' '));
    }
    for (const attribute of ['href', 'src', 'poster']) {
      const value = node.getAttribute(attribute);
      if (!value) continue;
      try {
        const target = new URL(value, base);
        if (!['http:', 'https:', 'mailto:', 'tel:'].includes(target.protocol)
          && !(attribute === 'src' && node.tagName === 'IMG' && /^data:image\//i.test(value))) {
          node.removeAttribute(attribute);
          continue;
        }
        const id = decodeURIComponent(target.hash.slice(1));
        if (attribute === 'href' && target.origin === base.origin && target.pathname === base.pathname && ids.has(id)) {
          node.setAttribute('href', '#' + ids.get(id));
        } else {
          node.setAttribute(attribute, target.href);
        }
      } catch { node.removeAttribute(attribute); }
    }
    if (node.hasAttribute('srcset')) {
      try {
        node.setAttribute('srcset', node.getAttribute('srcset').split(',').map(source => {
          const [src, ...descriptor] = source.trim().split(/\s+/);
          const target = new URL(src, base);
          return ['http:', 'https:'].includes(target.protocol) ? [target.href, ...descriptor].join(' ') : '';
        }).filter(Boolean).join(', '));
      } catch { node.removeAttribute('srcset'); }
    }
  }
  return {html: content.innerHTML, title, lang: sourceDocument.documentElement.lang, ids};
}
