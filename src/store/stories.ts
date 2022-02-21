import { ID, StoryInterface } from '@/types';
import { getNewestStories, getStory } from '@/API';
import config from '@/config';
import { ActionArgs } from './types';


interface StoriesState {
  items: StoryInterface[];
  storyQty: number;
}


export default {
  namespaced: true,

  state: {
    items: [],
    storyQty: config.STORIES_QTY_PER_PAGE,
  },
  mutations: {
    setStories: (state: StoriesState, payload: { stories: StoryInterface[] }): void => {
      state.items = payload.stories;
    },
    setStory: (state: StoriesState, payload: { story: StoryInterface }): void => {
      const existedStoryIndex = state.items.findIndex((s) => s.id === payload.story.id);
      if (existedStoryIndex !== -1) {
        state.items[existedStoryIndex] = payload.story;
      } else {
        state.items.push(payload.story);
      }
    },
    setStoryQty: (state: StoriesState, payload: { storyQty: number }): void => {
      state.storyQty = payload.storyQty;
    },
  },
  actions: {
    fetchNewestStories: async ({ commit }: ActionArgs, qty: number): Promise<void> => {
      const stories = await getNewestStories(qty);
      commit('setStories', { stories });
    },
    fetchStory: async ({ commit }: ActionArgs, id: ID): Promise<void> => {
      const story = await getStory(id);
      commit('setStory', { story });
    },
  },
  getters: {
    getNewestStories(state: StoriesState): StoryInterface[] {
      return state.items;
    },
    getStoryQty(state: StoriesState): number {
      return state.storyQty;
    },
    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    getStory(state: StoriesState, getters: any) {
      return (id: ID): StoryInterface | undefined => getters.getNewestStories.find(
        (story:StoryInterface) => story.id === id,
      );
    },
  },
};
