import React, {useEffect} from 'react';
import DocItem from '@theme-original/DocItem';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Shared by both locales; retained CSS is isolated by the directory classes.
const styles = {
  'mod/ice-and-fire-ce': () => import('./styles/ice-and-fire-ce.css'),
  'mod/origins': () => import('./styles/origins.css'),
  'mod/origins-js': () => import('./styles/origins.css'),
  'mod/system': () => import('./styles/system.css'),
  'mod/mxt': () => import('./styles/mxt.css'),
};

export default function DirectoryDocItem(props) {
  const {pathname} = useLocation();
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const directory = props.content.metadata.id.split('/').slice(0, 2).join('/');
  const sectionClass = `dir-${directory.replaceAll('/', '-')}`;
  const languageClass = `lang-${currentLocale}`;
  useEffect(() => {
    styles[directory]?.().catch(error => console.error('Unable to load documentation styles', error));
    document.body.classList.add(sectionClass, languageClass);
    return () => document.body.classList.remove(sectionClass, languageClass);
  }, [pathname, directory, sectionClass, languageClass]);
  return (
    <HtmlClassNameProvider className={`doc-section ${sectionClass} ${languageClass}`}>
      <DocItem {...props} />
    </HtmlClassNameProvider>
  );
}
