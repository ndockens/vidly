import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://ef909696d1e94d7da5d33e090dab54f5@sentry.io/1364761"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
