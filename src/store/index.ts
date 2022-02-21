import { createStore } from 'vuex';

import stories from './stories';
import comments from './comments';


export default createStore({
  modules: {
    stories,
    comments,
  },
});
