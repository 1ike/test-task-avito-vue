export type ID = number;
export type IDs = ID[];

export type Time = number;

export interface BaseEntityInterface {
  id: ID;
  by: string;
  time: Time;
  kids?: IDs;
  deleted?: boolean;
  dead?: boolean;
}

export interface StoryInterface extends BaseEntityInterface {
  title: string;
  score: number;
  url?: string;
  text?: string;
}

export interface CommentInterface extends BaseEntityInterface {
  text: string;
  parent?: ID;
}
