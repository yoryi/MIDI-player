import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import * as React from "react";
import { defaultTheme } from "../../../common/theme/Theme";
import { StoreContext } from "../../hooks/useStores";
import { ThemeContext } from "../../hooks/useTheme";
import RootStore from "../../stores/RootStore";
import { GlobalCSS } from "../Theme/GlobalCSS";

const RootView = React.lazy(() =>
  import(/* webpackPrefetch: true */
  /* webpackChunkName: "lazy-component" */
  '../RootView/RootView')
    .then(({ RootView }) => ({ default: RootView })),
);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.VERCEL_GIT_COMMIT_SHA,
  environment: process.env.VERCEL_ENV,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

export function App() {
  return (
    <React.StrictMode>
      <StoreContext.Provider value={new RootStore()}>
        <ThemeContext.Provider value={defaultTheme}>
          <GlobalCSS />
          <React.Suspense fallback={<div>Loading...</div>}>
            <RootView />
          </React.Suspense>
        </ThemeContext.Provider>
      </StoreContext.Provider>
    </React.StrictMode>
  );
}
