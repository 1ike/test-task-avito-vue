import { createStore } from 'vuex';

import { StoryInterface } from '@/types';
import stories from './stories';


export default createStore({
  modules: {
    stories,
  },
});
