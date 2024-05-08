export const seo = {
  title: 'Tracy Hu | 探險家、養生黨、音樂迷、筆耕者',
  description:
    '我是 Tracy，INFP，尋寶塢管理者。我熱愛閱讀、音樂、Bujo、探索新鮮的事物，喜歡帶著好奇心在知識的海洋裡悠遊。',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://papayahu-so.vercel.app'
      : 'http://localhost:3000'
  ),
} as const
