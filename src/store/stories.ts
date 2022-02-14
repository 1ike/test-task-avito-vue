import { StoryInterface } from '@/types';
import { getNewestStories } from '@/API';
import { ActionArgs, RequestStatus } from './types';


interface StoriesState {
  items: StoryInterface[],
  requestStatus: RequestStatus,
}

export default {
  namespaced: true,

  state: {
    items: [],
    requestStatus: RequestStatus.IDLE,
  },
  mutations: {
    setStories: (state: StoriesState, payload: { stories: StoriesState['items'] }) => {
      state.items = payload.stories;
    },
  },
  actions: {
    fetchNewestStories: async ({ commit }: ActionArgs, qty: number) => {
      const stories = await getNewestStories(qty);
      commit('setStories', { stories });
    },
  },
  getters: {
    getNewestStories(state: StoriesState) {
      return state.items;
    },
  },
};
