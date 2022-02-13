import axios from 'axios';

import {
  ID,
  IDs,
  StoryInterface,
  CommentInterface,
  Time,
} from '@/types';

import config from '@/config';


export interface CommentTreeNode {
  data: CommentInterface;
  children: CommentTreeNode[];
  qty: number;
  level: number;
}

export interface CommentTreeData {
  children: CommentTreeNode[];
  qty: number;
}


const transformDate = (time: Time) => time * 1000;


const fetchItem = async <T extends { time: Time }>(id: ID) => axios.get<T>(`${config.HACKER_NEWS_API_URL}/item/${id}.json`);


// eslint-disable-next-line no-shadow
export enum EntityNames {
  Story = 'Story',
  Comment = 'Comment',
}

const getItem = async <T extends { time: Time }>(id: ID, entityName: EntityNames): Promise<T> => {
  let item;

  try {
    const response = await fetchItem<T>(id);
    item = response.data;
  } catch (error) {
    throw new Error(`Fetching ${entityName} with id "${id}" failed with error: ${error}`);
  }

  if (!item) {
    throw new Error(`Validation ${entityName} with id "${id}" failed`);
  }

  item.time = transformDate(item.time);

  return item;
};

const getStory = async (id: ID): Promise<StoryInterface> => {
  const story$ = getItem<StoryInterface>(id, EntityNames.Story);

  return story$;
};

const getNewestStoryIds = async (storiesQty: number): Promise<IDs> => {
  const { data: storyIds } = await axios.get<IDs>(`${config.HACKER_NEWS_API_URL}/newstories.json`);

  return storyIds.slice(0, storiesQty);
};

export const getNewestStories = async (
  storiesQty: number = config.STORIES_QTY,
): Promise<StoryInterface[]> => {
  const storyIds = await getNewestStoryIds(storiesQty);

  const storyPromises = storyIds.map((id) => getStory(id));

  const responses = await Promise.allSettled(storyPromises);
  const responsesFullfiled = responses.filter((response) => response.status === 'fulfilled') as PromiseFulfilledResult<StoryInterface>[];
  const stories = responsesFullfiled.map((res) => res.value);

  return stories;
};


// const getComment = async (id: ID): Promise<CommentInterface> => {
//   const comment$ = getItem<CommentInterface>(id, EntityNames.Comment);

//   return comment$;
// };

/* const getCommentTree(kids: IDs = [], level = 1): Promise<any> => {

  if (!kids?.length) return of({ children: [], qty: 0 });

  const getNode = (id: ID) => getComment(id).pipe(
    switchMap((commentData) => {
      if (commentData instanceof Error) return of(commentData);

      const commentNode$ = getCommentTree(commentData?.kids, level + 1)
      .pipe(
        map(({ children, qty }) =>
        ({ data: commentData, children, qty, level }) as CommentTreeNode),
      );

      return commentNode$;
    }),
  );

  return of(kids).pipe(
    switchMap((ids) => forkJoin(ids.map((id) => getNode(id)))),
    map((commentNodesData) => {
      const commentNodes = commentNodesData
      .filter((node) => !(node instanceof Error)) as CommentTreeNode[];

      const qty = commentNodes.reduce((acc, node) => acc + node.qty, commentNodes.length);

      return { children: commentNodes, qty };
    }),
  );
} */

