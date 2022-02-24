const int = (param: string) => parseInt(param, 10);

export default {
  BASE_URL: process.env.BASE_URL,
  HACKER_NEWS_API_URL: process.env.VUE_APP_HACKER_NEWS_API_URL || 'https://hacker-news.firebaseio.com/v0/',
  POLLING_INTERVAL: 60000,
  STORIES_QTY: int(process.env.VUE_APP_STORIES_QTY) || 100,
  STORIES_QTY_PER_PAGE: int(process.env.VUE_APP_STORIES_QTY_PER_PAGE) || 10,
  TITLE_POSTFIX: process.env.VUE_APP_TITLE_POSTFIX || 'Avito test task',
};
