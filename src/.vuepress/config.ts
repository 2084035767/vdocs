import { defineUserConfig } from 'vuepress'
import theme from './theme.js'
import { searchProPlugin } from 'vuepress-plugin-search-pro'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: '为自由献诗',
  description: '知识库兼考研笔记',
  theme,
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
})
