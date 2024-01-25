import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '为自由献诗',
  description: '知识库兼考研笔记',
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
})
