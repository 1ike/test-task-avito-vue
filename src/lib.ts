import { Time } from '@/types';


export const formatDate = (time: Time): string => (new Date(time)).toLocaleString('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
