import React, {useRef, useState} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './system-card-editor.module.css';

// The editor owns its document, keyboard shortcuts and draft; SPA navigation removes the whole instance.
export default function SystemCardEditorWidget() {
  const root = useRef(null);
  const [error, setError] = useState('');
  const url = useBaseUrl('/tools/system-card-editor/index.html');

  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.current.requestFullscreen();
      setError('');
    } catch {
      setError(translate({
        id: 'systemCardEditor.fullscreenFailed',
        message: 'Your browser did not allow full screen. Open the editor in a new tab instead.',
      }));
    }
  }

  return (
    <div className={styles.widget} ref={root}>
      <div className={styles.toolbar}>
        <span><Translate id="systemCardEditor.title">Card JSON editor</Translate></span>
        <button type="button" onClick={fullscreen}>
          <Translate id="systemCardEditor.toggleFullscreen">Toggle full screen</Translate>
        </button>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Translate id="systemCardEditor.open">Open editor in a new tab ↗</Translate>
        </a>
      </div>
      {error && <p role="status" className={styles.error}>{error}</p>}
      <iframe
        className={styles.frame}
        src={url}
        title={translate({id: 'systemCardEditor.frameTitle', message: 'System card JSON editor'})}
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  );
}
