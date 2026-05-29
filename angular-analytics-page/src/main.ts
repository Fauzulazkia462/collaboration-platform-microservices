import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { AnalyticsDashboard } from './app/pages/analytics-dashboard/analytics-dashboard';

let appRef: any;
let hostElement: HTMLElement | null = null;

export let hostProps: any = null;

export async function mount(el: HTMLElement, props?: any) {
  hostProps = props;

  hostElement = document.createElement(
    'app-analytics-dashboard'
  );

  el.appendChild(hostElement);

  appRef = await bootstrapApplication(
    AnalyticsDashboard,
    {
      providers: []
    }
  );
}

export async function unmount() {
  appRef?.destroy?.();

  if (hostElement) {
    hostElement.remove();
    hostElement = null;
  }
}