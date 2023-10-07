import { navbar } from 'vuepress-theme-hope'

export default navbar([
  '/',
  {
    text: '知识库',
    icon: 'lightbulb',
    prefix: '/md/',
    children: [
      {
        text: '前端',
        icon: 'fa-brands fa-internet-explorer',
        link: 'frontend/README.md',
      },
      {
        text: '后端',
        icon: 'fa-solid fa-code',
        link: 'backend/README.md',
      },
      {
        text: '工具',
        icon: 'fa-solid fa-toolbox',
        link: 'tools/README.md',
      },
      {
        text: '智能',
        icon: 'fa-solid fa-key',
        link: 'ai/README.md',
      },
    ],
  },
  {
    text: '考研者',
    icon: 'book',
    prefix: '/ungee/',
    children: [
      {
        text: '408',
        icon: 'computer',
        link: '408/README.md',
      },
      {
        text: '英语',
        icon: 'fa-solid fa-language',
        link: 'english/README.md',
      },
      {
        text: '政治',
        icon: 'fa-solid fa-dove',
        link: 'politics/README.md',
      },
      {
        text: '数学',
        icon: 'fa-solid fa-calculator',
        link: 'math/README.md',
      },
    ],
  },
  {
    text: '关于',
    icon: 'fa-solid fa-list-check',
    link: '/other/',
  },
])
