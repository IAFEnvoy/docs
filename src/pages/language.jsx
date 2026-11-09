import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {useLocation} from '@docusaurus/router';
import {languageLinks, isLegacyDocs} from '../utils/legacy-docs.cjs';
import styles from './language.module.css';

export default function LanguageChoice() {
  const {search} = useLocation();
  const isBrowser = useIsBrowser();
  const requested = new URLSearchParams(isBrowser ? search : '').get('from') || '/';
  const url = new URL(requested, 'https://docs.iafenvoy.com');
  const destination = isLegacyDocs(url.pathname) ? url.pathname + url.search + url.hash : '/';
  const links = languageLinks(destination);
  return (
    <Layout title="选择语言 / Choose a language">
      <Head><meta name="robots" content="noindex" /></Head>
      <main className={`container margin-vert--xl ${styles.main}`}>
        <section className={`card ${styles.card}`} aria-labelledby="language-heading">
          <div className="card__header">
            <h1 id="language-heading" className={styles.title}>选择语言 / Choose a language</h1>
          </div>
          <div className="card__body">
            <p className={styles.message}>请选择文档语言。<br />Please select the documentation language.</p>
          </div>
          <nav className={`card__footer ${styles.choices}`} aria-label="Language">
            <Link id="en" lang="en" to={`pathname://${links.en}`} autoAddBaseUrl={false} target="_self" className="button button--primary button--lg">English</Link>
            <Link id="zh" lang="zh-CN" to={`pathname://${links.zh}`} autoAddBaseUrl={false} target="_self" className="button button--primary button--outline button--lg">简体中文</Link>
          </nav>
        </section>
      </main>
    </Layout>
  );
}
