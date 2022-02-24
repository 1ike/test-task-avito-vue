import axios from 'axios';

import {
  ID,
  IDs,
  BaseEntityInterface,
  StoryInterface,
  CommentInterface,
  Time,
} from '@/types';

import config from '@/config';


const transformDate = (time: Time) => time * 1000;


const fetchItem = async <T>(id: ID) => axios.get<T>(`${config.HACKER_NEWS_API_URL}item/${id}.json`);


// eslint-disable-next-line no-shadow
export enum EntityNames {
  Story = 'Story',
  Comment = 'Comment',
}

type PartialItem = Partial<BaseEntityInterface>

const getItem = async <T extends PartialItem>(id: ID, entityName: EntityNames): Promise<T> => {
  let item;

  try {
    const response = await fetchItem<T>(id);
    item = response.data as T;
  } catch (error) {
    throw new Error(`Fetching ${entityName} with id "${id}" failed with error: ${error}`);
  }

  if (!item || item.dead || item.deleted) {
    throw new Error(`Validation ${entityName} with id "${id}" failed`);
  }

  item.time = transformDate(item.time as Time);

  return item;
};

export const getStory = async (id: ID): Promise<StoryInterface> => {
  const story = await getItem<StoryInterface>(id, EntityNames.Story);

  return story;
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


export const getComment = async (id: ID): Promise<CommentInterface> => {
  const comment = await getItem<CommentInterface>(id, EntityNames.Comment);

  return comment;
};


export interface Comments {
  [id: number]: CommentInterface;
}

export const getComments = async (kids: IDs = [], acc: Comments = {}): Promise<Comments> => {
  await Promise.allSettled(kids.map(async (id) => {
    const comment = await getComment(id);
    acc[comment.id] = comment;
    if (comment.kids?.length) await getComments(comment.kids, acc);
  }));

  return acc;
};

