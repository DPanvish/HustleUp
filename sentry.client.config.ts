import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://a395e166eaa5ecfca5ad6a7e5ef2711e@o4509929247408128.ingest.us.sentry.io/4510319112159232",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});