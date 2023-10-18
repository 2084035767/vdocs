import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  sidebar: 'heading',
  '/md/frontend': [
    '',
    {
      text: '前端',
      children: [
        { text: 'HTML', link: 'html/' },
        {
          text: 'CSS',
          link: 'css/',
          prefix: 'css/',
          collapsible: true,
          children: [{ text: 'SASS', link: 'scss.md' }],
        },

        { text: 'JavaScript', link: 'js/' },
        { text: 'TypeScript', link: 'js/ts.md' },
        { text: 'Vue2', link: 'vue/' },
        {
          text: '参照表',
          prefix: 'table/',
          collapsible: true,
          children: [
            { text: 'ASCLL', link: 'ascll.md' },
            { text: 'DOS', link: 'dos.md' },
            { text: 'HTTP', link: 'http.md' },
            { text: 'Regex', link: 'table.md' },
          ],
        },
      ],
    },
  ],
  '/md/backend': [
    '',
    {
      text: '后端',
      children: [
        {
          text: 'Java',
          link: 'java/',
          prefix: 'java/',
          collapsible: true,
          children: [
            { text: 'JavaWeb', link: 'javaweb.md' },
            { text: 'JavaLin', link: 'javalin.md' },
          ],
        },
        {
          text: 'Spring',
          link: 'spring/spring.md',
          prefix: 'spring/',
          collapsible: true,
          children: [
            { text: 'Mybatis', link: 'mybatis.md' },
            { text: 'SpringBoot', link: 'springboot.md' },
            { text: 'SpringCloud', link: 'springcloud.md' },
          ],
        },
        { text: 'Python', link: 'python/' },
        { text: 'C++', link: 'c/' },
        { text: 'C', link: 'c/c.md' },
      ],
    },
    {
      text: '数据库',
      prefix: 'database/',
      children: [
        { text: 'Mysql', link: 'mysql.md' },
        { text: 'Redis', link: 'redis.md' },
      ],
    },
  ],
  '/md/tools/': [
    '',
    {
      text: '工具',
      children: [
        {
          text: 'Linux',
          link: 'linux.md',
          collapsible: true,
          children: [
            { text: 'Shell', link: 'shell.md' },
            { text: 'Vim', link: 'vim.md' },
          ],
        },
        { text: 'Docker', link: 'docker.md' },
        { text: 'Nginx', link: 'nginx.md' },
        { text: 'Git', link: 'git.md' },
        { text: 'Regex', link: 'regex.md' },
      ],
    },
  ],
  '/md/ai/': [
    '',
    {
      text: '人工智能',
      children: [
        { text: 'Numpy', link: 'numpy.md' },
        { text: 'Pandas', link: 'pandas.md' },
        { text: 'Matplotlib', link: 'matplotlib.md' },
        { text: 'OpenCV', link: 'opencv.md' },
      ],
    },
  ],
  '/ungee/408/': [
    '',
    {
      text: '408',
      children: [
        { text: '数据', link: 'DS.md' },
        { text: '计组', link: 'CA.md' },
        { text: '系统', link: 'OS.md' },
        { text: '计网', link: 'CN.md' },
        { text: '算法', link: 'AL.md' },
      ],
    },
  ],
  '/ungee/english/': [
    '',
    {
      text: '英语',
      children: [
        { text: '词汇', link: 'word.md' },
        { text: '阅读', link: 'read.md' },
        { text: '听力', link: 'listen.md' },
        { text: '写作', link: 'write.md' },
        { text: '口语', link: 'speak.md' },
        { text: '口语', link: 'syntax.md' },
        { text: '翻译', link: 'translate.md' },
      ],
    },
  ],
  '/ungee/math/': [
    '',
    {
      text: '数学',
      children: [
        { text: '高数', link: '高等数学.md' },
        { text: '线代', link: '线性代数.md' },
      ],
    },
  ],
  '/ungee/politics/': [
    '',
    {
      text: '政治',
      children: [
        { text: '马原', link: '马原.md' },
        { text: '毛中特', link: '毛中特.md' },
        { text: '新思想', link: '新思想.md' },
        { text: '思修', link: '思修.md' },
        { text: '近代史', link: '近代史.md' },
        { text: '时政', link: '时政.md' },
      ],
    },
  ],
  '/other/': [
    '',
    { text: '每周计划', link: 'task.md' },
    { text: '更新日志', link: 'log.md' },
    { text: '文档说明', link: 'explain.md' },
  ],
})
