import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'IAFEnvoy\'s Docs',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.webp',

  url: 'https://docs.iafenvoy.com/',
  baseUrl: '/',
  organizationName: 'IAFEnvoy',
  projectName: 'docs',

  onBrokenLinks: 'warn',
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
          alt: 'Logo',
          src: 'img/favicon.webp',
        },
        items: [
          {
            type: 'dropdown',
            position: 'left',
            label: 'Tutorials',
            items: [
              { to: '/docs/tutorial/mixin', label: 'Mixin（中文）' },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Libraries',
            items: [
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
              { to: '/docs/mod/ice-and-fire-ce', label: 'Ice And Fire CE' },
              { to: '/docs/mod/avaritia', label: 'Avaritia Series' },
              { to: '/docs/mod/mobs-banner', label: 'Mobs Banner' },
              { to: '/docs/mod/tameable', label: 'Tameable' },
              { to: '/docs/mod/rainimator-mod', label: 'Rainimator Mod' },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Deprecated',
            items: [
              { to: '/docs/library/annotation-lib', label: 'Annotation Lib (Deprecated)' },
              { to: '/docs/mod/avaritia-reborn', label: 'Avaritia Reborn (Deprecated)' },
            ]
          },
          {
            href: 'https://github.com/IAFEnvoy/docs',
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
              {
                label: 'FAQ',
                to: '/docs/faq',
              },
              {
                label: 'Mod List',
                to: 'https://mods.iafenvoy.com/',
              },
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
