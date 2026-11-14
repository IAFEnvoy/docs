import { themes as prismThemes } from 'prism-react-renderer';
import sidebarItemsGenerator from './scripts/sidebar-items.cjs';

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

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn'
    },
    mermaid: true,
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en', baseUrl: '/en/' },
      zh: { label: '简体中文', htmlLang: 'zh-CN' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  themes: [
    '@docusaurus/theme-mermaid',
    '@saucelabs/theme-github-codeblock',
  ],
  plugins: [
    [
      './plugins/localized-docs.cjs',
      {
        path: 'docs-en',
        sidebarPath: './sidebars.js',
        sidebarItemsGenerator,
      },
    ],
    './plugins/dev-locales.cjs',
    './plugins/directory-styles.cjs',
    './plugins/legacy-links.cjs',
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/favicon.webp',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#1a1a1a',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#1a1a1a',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-title',
            content: "IAFEnvoy's Docs",
          },
        ],
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.webp',
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
              { to: '/docs/tutorial/mixin', label: 'Mixin' },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Libraries',
            items: [
              { to: '/docs/library/jupiter', label: 'Jupiter', icon: 'img/navbar/jupiter.webp' },
              { to: '/docs/library/saturn', label: 'Saturn', icon: 'img/navbar/saturn.webp' },
              { to: '/docs/library/uranus', label: 'Uranus', icon: 'img/navbar/uranus.webp' },
              { to: '/docs/library/neptune', label: 'Neptune', icon: 'img/navbar/neptune.webp' },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Mods',
            items: [
              { to: '/docs/mod/dragon-mounts-reforged', label: 'Dragon Mounts: Reforged', icon: 'img/navbar/dragon-mounts-reforged.webp' },
              { to: '/docs/mod/evaluate', label: 'Evaluate', icon: 'img/navbar/evaluate.webp' },
              { to: '/docs/mod/ice-and-fire-ce', label: 'Ice And Fire CE', icon: 'img/navbar/ice-and-fire-ce.webp' },
              { to: '/docs/mod/mxt', label: 'MiXianTu', icon: 'img/navbar/mxt.webp' },
              { to: '/docs/mod/mite', label: 'MITE: Reforged', icon: 'img/navbar/mite.webp' },
              { to: '/docs/mod/origins', label: 'Origins (NeoForge)', icon: 'img/navbar/origins.webp' },
              { to: '/docs/mod/origins-js', label: 'Origins JS', icon: 'img/navbar/origins-js.webp' },
              { to: '/docs/mod/pendulum', label: 'Pendulum', icon: 'img/navbar/pendulum.webp' },
              { to: '/docs/mod/starting-point-buy', label: 'Starting Point Buy', icon: 'img/navbar/starting-point-buy.webp' },
              { to: '/docs/mod/system', label: 'System', icon: 'img/navbar/system.webp' },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Tools',
            items: [
              { to: '/docs/tool/dashboard', label: 'ModList Dashboard' },
            ]
          },
          {
            type: 'dropdown',
            position: 'left',
            label: 'Deprecated',
            items: [
              { to: '/docs/library/annotation-lib', label: 'Annotation Lib', icon: 'img/navbar/annotation-lib.webp' },
              { to: '/docs/mod/avaritia-reborn', label: 'Avaritia Reborn', icon: 'img/navbar/avaritia-reborn.webp' },
              { to: '/docs/mod/mobs-banner', label: 'Mobs Banner', icon: 'img/navbar/mobs-banner.webp' },
              { to: '/docs/mod/tameable', label: 'Tameable', icon: 'img/navbar/tameable.webp' },
            ]
          },
          {
            type: 'localeDropdown',
            position: 'right',
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
              {
                label: "Checklist Before Report",
                to: '/docs/checklist',
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
                label: 'Datapack Visual Editor',
                href: 'https://datapack.mcdev.tech/',
              },
            ],
          },
        ],
        copyright: `Copyright © 2023-${new Date().getFullYear()} IAFEnvoy. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java'],
      },
      codeblock: {
        showGithubLink: true,
        githubLinkLabel: 'View on GitHub'
      },
      algolia: {
        appId: 'L0D3UPINT6',
        apiKey: 'e2e9ba7af6e58bfe5b708a92768cb4e2',
        indexName: 'MAIN_INDEX'
      },
    }),
};

export default config;
