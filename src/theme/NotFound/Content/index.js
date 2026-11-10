import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)} data-docs-not-found="">
      <div className={styles.container}>
        <img src={useBaseUrl('/img/404.webp')} alt="404" className={styles.image} />
        <h1><Translate id="notFound.heading">Website seems to have run into a problem.</Translate></h1>
        <p><Translate id="notFound.message">404 Not Found</Translate></p>
        <Link to="/" className="button button--primary"><Translate id="notFound.home">Back to Home</Translate></Link>
      </div>
    </main>
  );
}
