import { ID, CommentInterface } from '@/types';
import { getComment } from '@/API';
import { ActionArgs } from './types';


interface Comments {
  [id: number]: CommentInterface;
}

interface CommentsState {
  items: Comments;
}


export default {
  namespaced: true,

  state: {
    items: {},
  },
  mutations: {
    setComment: (state: CommentsState, payload: { comment: CommentInterface }): void => {
      state.items[payload.comment.id] = payload.comment;
    },
  },
  actions: {
    fetchComment: async ({ commit }: ActionArgs, id: ID): Promise<void> => {
      const comment = await getComment(id);
      commit('setComment', { comment });
    },
  },
  getters: {
    getComments(state: CommentsState): Comments {
      return state.items;
    },
    getCommentsQty(state: CommentsState): number {
      return Object.keys(state.items).length;
    },
    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    getComment(state: CommentsState, getters: any) {
      return (id: ID): CommentInterface | undefined => getters.getComments[id];
    },
  },
};
