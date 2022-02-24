import { Ref } from 'vue';
import { ID, IDs, Time } from '@/types';
import config from '@/config';
import { Comments } from '@/API';


export const formatDate = (time: Time): string => (new Date(time)).toLocaleString('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

interface PollingArgs {
  timer: Ref<ReturnType<typeof setTimeout>>;
  successCallback: () => Promise<void>;
  errorCallback?: () => Promise<void>;
  interval?: number;
}


export const polling = (args: PollingArgs): void => {
  const {
    timer,
    successCallback,
    interval = config.POLLING_INTERVAL,
  } = args;

  successCallback()
    .then(() => {
      timer.value = setTimeout(
        () => {
          clearTimeout(timer.value);
          polling(args);
        },
        interval,
      );
    });
};


type Kids = IDs | undefined;
export const getLiveCommentIds = (kids: Kids, comments: Comments): Kids => kids
  ?.filter(
    (commentId: ID) => Object.keys(comments)
      .includes(String(commentId)),
  )
  .sort()
  .reverse();
