// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IAFEnvoy\'s Docs',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.iafenvoy.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'IAFEnvoy', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'IAFEnvoy\'s Docs',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'dropdown',
            position: 'left',
            label: 'Tutorials',
            items: [
              { to: '/docs/tutorial', label: 'Mixin（中文）' },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Libraries',
            items: [
              { to: '/docs/library/annotation-lib', label: 'Annotation Lib (Deprecated)' },
              { to: '/docs/library/jupiter', label: 'Jupiter' },
              { to: '/docs/library/neptune', label: 'Neptune' },
              { to: '/docs/library/uranus', label: 'Uranus' },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Mods',
            items: [
              { to: '/docs/mod/avaritia-reborn', label: 'Avaritia Reborn' },
              { to: '/docs/mod/rainimator-mod', label: 'Rainimator Mod' },
            ]
          },
          {
            href: 'https://github.com/IAFEnvoy',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              // {
              //   label: 'Tutorial',
              //   to: '/docs/intro',
              // },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/NDzz2upqAk',
              },
              {
                label: 'QQ群 966154502',
                href: 'https://qm.qq.com/q/wPu6kcmgQo',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Home Page',
                href: 'https://www.iafenvoy.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/IAFEnvoy',
              },
              {
                label: 'Status Page',
                href: 'https://iafenvoy.online',
              },
              {
                label: 'Maven (Deprecated)',
                href: 'https://maven.iafenvoy.com',
              },
            ],
          },
        ],
        copyright: `Copyright © 2023-${new Date().getFullYear()} IAFEnvoy. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
