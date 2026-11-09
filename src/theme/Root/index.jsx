import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import {localeFromPath, rememberLocale} from '@site/src/utils/locale-preference.cjs';

export default function Root({children}) {
  const {pathname} = useLocation();
  useEffect(() => {
    const locale = localeFromPath(pathname);
    if (locale) rememberLocale(locale);
  }, [pathname]);
  return <>{children}</>;
}
