import React, {useEffect} from 'react';
import DocItem from '@theme-original/DocItem';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Register project styles here when needed. See ./styles/README.md.
const styles = {};

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
