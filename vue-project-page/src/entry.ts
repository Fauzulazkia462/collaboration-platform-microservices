import { createApp } from "vue";
import ProjectPage from "./app/ProjectPage.vue";
import { HostBridge } from "./bridge/hostBridge";
import type { HostStore } from "./bridge/hostBridge";
import "./styles/ui.css";

let app: any = null;

export function mount(el: HTMLElement, hostStore: HostStore) {
    HostBridge.setStore(hostStore);

    app = createApp(ProjectPage);
    app.mount(el);
}

export function unmount() {
    app?.unmount();
}