import { createPinia } from 'pinia';
import type { App } from 'vue';

const piniaStore = createPinia();

export function setupPiniaStore(app: App<Element>) {
    // pinia.use(({ store }) => {
    //   store.router = markRaw(router);
    // });
    app.use(piniaStore);
}

export { piniaStore };
