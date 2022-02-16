import { StoryInterface } from '@/types';
import { getNewestStories } from '@/API';
import { ActionArgs } from './types';


interface StoriesState {
  items: StoryInterface[],
}


export default {
  namespaced: true,

  state: [],
  mutations: {
    setStories: (state: StoriesState, payload: { stories: StoryInterface[] }): void => {
      state.items = payload.stories;
    },
  },
  actions: {
    fetchNewestStories: async ({ commit }: ActionArgs, qty: number): Promise<void> => {
      const stories = await getNewestStories(qty);
      commit('setStories', { stories });
    },
  },
  getters: {
    getNewestStories(state: StoriesState): StoryInterface[] {
      return state.items;
    },
  },
};
