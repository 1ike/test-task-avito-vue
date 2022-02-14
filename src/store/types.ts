import { Dispatch, Commit } from 'vuex';


export interface ActionArgs { dispatch: Dispatch; commit: Commit }


// eslint-disable-next-line no-shadow
export enum RequestStatus {
  IDLE = 'IDLE',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

