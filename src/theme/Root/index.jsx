import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import {localeFromPath, rememberLocale} from '@site/src/utils/locale-preference.cjs';
import {isPreviewSource} from '@site/src/utils/link-preview.cjs';
import LinkPreview from '@site/src/components/LinkPreview';

export default function Root({children}) {
  const {pathname} = useLocation();
  useEffect(() => {
    const locale = localeFromPath(pathname);
    if (locale && !isPreviewSource()) rememberLocale(locale);
  }, [pathname]);
  return <>{children}<LinkPreview /></>;
}
