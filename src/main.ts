import { createApp } from 'vue';
import { Inkline, components } from '@inkline/inkline';
import '@inkline/inkline/inkline.scss';
import { InklineIcons } from '@inkline/icons';
// import { mdiAutorenew48 } from '@inkline/icons/packs/material-design';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';


InklineIcons.add({
  // mdiAutorenew48,
});

createApp(App)
  .use(store)
  .use(router)
  .use(Inkline, {
    components,
  })
  // .use(InklineIcons)
  .mount('#app');
