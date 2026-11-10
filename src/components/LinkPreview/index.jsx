import {useCallback, useEffect, useId, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {themes} from 'prism-react-renderer';
import {isPreviewSource, previewUrl} from '@site/src/utils/link-preview.cjs';
import {loadPreview, previewContent} from './content';
import styles from './styles.module.css';

function PreviewDialog({target, onClose, onNavigate, locale, siteUrl, prism}) {
  const dialog = useRef(null);
  const body = useRef(null);
  const [source, setSource] = useState(null);
  const [failed, setFailed] = useState(false);
  const [mode, setMode] = useState(() => document.documentElement.dataset.theme);
  const prefix = useId().replaceAll(':', '') + '-preview-';
  const page = useMemo(() => source?.url === target.url && previewContent(source.document, target.url, prefix, translate({
    id: 'linkPreview.interactive', message: 'Open the full page to use interactive tools.',
  }), mode === 'dark' ? prism.darkTheme || themes.dracula : prism.theme || themes.github), [source, target.url, prefix, mode, prism]);
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    return () => { document.body.style.overflow = previous; };
  }, []);
  useEffect(() => {
    const observer = new MutationObserver(() => setMode(document.documentElement.dataset.theme));
    observer.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setSource(null);
    setFailed(false);
    loadPreview(target.url, controller.signal).then(source => {
      if (controller.signal.aborted) return;
      setSource({url: target.url, document: source});
    }).catch(error => {
      if (error.name !== 'AbortError' && !controller.signal.aborted) setFailed(true);
    });
    return () => controller.abort();
  }, [target.url, prefix]);
  useEffect(() => {
    if (!page) return;
    let hash;
    try { hash = decodeURIComponent(new URL(target.url, window.location.href).hash.slice(1)); } catch {}
    const destination = page.ids.get(hash);
    const heading = destination && document.getElementById(destination);
    if (heading) heading.scrollIntoView({block: 'start'});
    else body.current.scrollTop = 0;
  }, [page, target.url]);
  function followLink(event) {
    const anchor = event.target.closest('a[href]');
    if (!anchor || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || anchor.hasAttribute('download') || anchor.target === '_blank') return;
    if (anchor.getAttribute('href').startsWith('#')) {
      const heading = document.getElementById(anchor.getAttribute('href').slice(1));
      if (heading) { event.preventDefault(); heading.scrollIntoView({block: 'start'}); }
      return;
    }
    const url = previewUrl(anchor.href, new URL(target.url, window.location.href).href, locale, siteUrl);
    if (url) { event.preventDefault(); onNavigate({url, label: anchor.textContent.trim()}); }
  }
  return (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="link-preview-title" data-no-link-preview="" onCancel={onClose} onKeyDown={event => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); }
    }} onClick={event => {
      const rect = dialog.current.getBoundingClientRect();
      if (event.target === dialog.current && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) onClose();
    }}>
      <div className={styles.toolbar}>
        <div className={styles.heading}>
          <span className={styles.caption}><Translate id="linkPreview.label">Page preview</Translate></span>
          <strong id="link-preview-title" className={styles.title}>{page?.title || target.label}</strong>
        </div>
        <Link className="button button--primary button--sm" autoAddBaseUrl={false} target="_self" to={`pathname://${target.url}`}><Translate id="linkPreview.open">Open page</Translate></Link>
        <button type="button" className={`button button--secondary button--sm ${styles.close}`} onClick={onClose} autoFocus aria-label={translate({id: 'linkPreview.close', message: 'Close preview'})}>×</button>
      </div>
      <div ref={body} className={styles.body} onClick={followLink} aria-busy={!page && !failed}>
        {failed ? <p role="alert"><Translate id="linkPreview.failed">This page could not be previewed. Use “Open page” to continue.</Translate></p>
          : page ? <div className="theme-doc-markdown markdown" lang={page.lang} dangerouslySetInnerHTML={{__html: page.html}} />
            : <p role="status"><Translate id="linkPreview.loading">Loading preview…</Translate></p>}
      </div>
    </dialog>
  );
}

export default function LinkPreview() {
  const {pathname, search} = useLocation();
  const {i18n: {currentLocale}, siteConfig: {url: siteUrl, themeConfig: {prism = {}}}} = useDocusaurusContext();
  const [candidate, setCandidate] = useState(null);
  const [target, setTarget] = useState(null);
  const trigger = useRef(null);
  const opener = useRef(null);
  const open = useCallback(value => {
    opener.current = value.anchor || document.activeElement;
    setCandidate(null);
    setTarget(value);
  }, []);
  const close = useCallback(() => {
    setTarget(null);
    requestAnimationFrame(() => {
      if (opener.current?.isConnected) opener.current.focus({preventScroll: true});
    });
  }, []);
  useEffect(() => { setCandidate(null); setTarget(null); }, [pathname, search]);
  useEffect(() => {
    if (isPreviewSource() || target) return;
    let timer;
    let active;
    function clear() { clearTimeout(timer); }
    function hide() { clear(); timer = setTimeout(() => { active = null; setCandidate(null); }, 180); }
    function eligible(element) {
      const anchor = element?.closest?.('a[href]');
      if (!anchor?.closest('main .theme-doc-markdown') || anchor.closest('[data-no-link-preview]') || anchor.hasAttribute('download') || anchor.hasAttribute('lang') || anchor.getAttribute('role') === 'button') return null;
      const url = previewUrl(anchor.href, window.location.href, currentLocale, siteUrl);
      if (!url) return null;
      const rect = anchor.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      return {anchor, url, label: anchor.textContent.trim() || anchor.getAttribute('aria-label') || url,
        x: Math.max(8, Math.min(rect.right - 48, window.innerWidth - 120)),
        y: rect.bottom + 42 > window.innerHeight ? rect.top - 38 : rect.bottom + 4};
    }
    function show(event) {
      if (event.pointerType === 'touch') return;
      if (trigger.current?.contains(event.target)) { clear(); return; }
      const value = eligible(event.target);
      if (!value) { hide(); return; }
      clear();
      if (active !== value.anchor) { active = value.anchor; setCandidate(value); }
    }
    function leave(event) {
      if (active?.contains(event.relatedTarget) || trigger.current?.contains(event.relatedTarget)) return;
      hide();
    }
    function keydown(event) {
      if (event.key === 'Escape') { active = null; setCandidate(null); }
      if (event.key === 'Enter' && event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        const value = eligible(event.target);
        if (value) { event.preventDefault(); open(value); }
      }
    }
    function reset() { clear(); active = null; setCandidate(null); }
    document.addEventListener('pointerover', show);
    document.addEventListener('pointerout', leave);
    document.addEventListener('focusin', show);
    document.addEventListener('focusout', leave);
    document.addEventListener('keydown', keydown);
    document.addEventListener('scroll', reset, true);
    window.addEventListener('resize', reset);
    return () => {
      clear();
      document.removeEventListener('pointerover', show);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('focusin', show);
      document.removeEventListener('focusout', leave);
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('scroll', reset, true);
      window.removeEventListener('resize', reset);
    };
  }, [currentLocale, siteUrl, target, open]);
  if (!candidate && !target) return null;
  return createPortal(<>
    {candidate && <button ref={trigger} type="button" data-link-preview-trigger="" className={`button button--primary button--sm ${styles.trigger}`} style={{left: candidate.x, top: candidate.y}} title={translate({id: 'linkPreview.shortcut', message: 'Preview (Alt+Enter on a focused link)'})} onClick={() => open(candidate)}><Translate id="linkPreview.preview">Preview</Translate></button>}
    {target && <PreviewDialog target={target} onClose={close} onNavigate={setTarget} locale={currentLocale} siteUrl={siteUrl} prism={prism} />}
  </>, document.body);
}
