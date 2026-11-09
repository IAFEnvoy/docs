import React, {useEffect, useRef, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './mxt-tools/tools.css';

const tools = {
  'formation-figure': () => import('./mxt-tools/formation-figure.mjs'),
  'talisman-strokes': () => import('./mxt-tools/talisman-strokes.mjs'),
};

export default function MxtToolFrame({tool, host, standalone = false}) {
  const root = useRef(null);
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const [error, setError] = useState('');
  useEffect(() => {
    let cancelled = false;
    let dispose;
    setError('');
    tools[tool]().then(({mount}) => {
      if (!cancelled) dispose = mount(root.current, currentLocale)?.dispose;
    }).catch(reason => {
      if (!cancelled) setError(String(reason));
    });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [tool, currentLocale]);
  return (
    <>
      {error && <p role="alert">{error}</p>}
      <div ref={root} id={host} className={`mxt-tool mxt-tool--${tool}${standalone ? ' mxt-tool--standalone' : ''}`} />
    </>
  );
}
