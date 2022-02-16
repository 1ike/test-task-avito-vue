import { createApp } from 'vue';
import { Inkline, components } from '@inkline/inkline';
import '@inkline/inkline/inkline.scss';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';


createApp(App)
  .use(store)
  .use(router)
  .use(Inkline, {
    components,
  })
  .mount('#app');
