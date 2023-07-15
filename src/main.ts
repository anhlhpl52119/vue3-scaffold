import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { setupPiniaStore, setupAssets } from '@/plugins';

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
