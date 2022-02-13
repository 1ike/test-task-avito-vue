export default {
  BASE_URL: process.env.BASE_URL,
  HACKER_NEWS_API_URL: process.env.HACKER_NEWS_API_URL || 'https://hacker-news.firebaseio.com/v0/',
  POLLING_INTERVAL: process.env.POLLING_INTERVAL || 60000,
  STORIES_QTY: process.env.STORIES_QTY || 100,
  STORIES_QTY_PER_PAGE: process.env.STORIES_QTY_PER_PAGE || 10,
  TITLE_POSTFIX: process.env.TITLE_POSTFIX || 'Avito test task',
};
