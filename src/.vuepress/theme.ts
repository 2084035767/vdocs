import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar.js'
import sidebar from './sidebar.js'

export default hopeTheme({
  // 当前网站部署到的域名
  hostname: '',

  // 作者信息
  author: {
    name: '子十',
    email: '2084035767@qq.com',
  },

  //图标
  iconAssets: 'fontawesome-with-brands',

  //热更新
  hotReload: false,

  logo: '/logo.svg',
  // repo: 'https://github.com/2084035767/vdocs',

  docsDir: 'src',

  // navbarAndsidebar
  navbar,
  sidebar,

  //纯净模式
  pure: true,

  // 页脚
  displayFooter: true,
  copyright: false,
  footer: 'MIT Licensed | Copyright © 2021-present 子十',

  // 加密文章
  encrypt: {},

  // page meta
  metaLocales: {
    editLink: '在 GitHub 上编辑此页',
  },

  plugins: {
    searchPro: true,
    copyright: {
      author: '子十',
      license: 'CC-BY-NC-SA-4.0',
      triggerLength: 100,
      global: true,
    },
    mdEnhance: {
      codetabs: true,
      hint: true,
      // container: true,
      // demo: true,
      // echarts: true,
      figure: true,
      gfm: true,
      imgLazyload: true,
      // katex: true,
      mark: true,
      // mermaid: true,
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      // vuePlayground: true,
      // playground: {
      //   presets: ['ts', 'vue'],
      // },
      // presentation: ['highlight', 'math', 'search', 'notes', 'zoom'],
    },
  },
})
