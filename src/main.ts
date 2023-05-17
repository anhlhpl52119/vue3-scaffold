import App from './App.vue';
import { createApp } from 'vue';
import { setupPiniaStore, setupAssets } from '@/plugins';
import router from './router';

const app = createApp(App);

function setupPlugins() {
  setupAssets();
  setupPiniaStore(app);
}
async function setupApp() {
  app.use(router);
  await router.isReady();
  app.mount('#app');
}
//Process....
setupPlugins();
await setupApp();
