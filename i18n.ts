import { getRequestConfig } from 'next-intl/server';

// ts-prune-ignore-next
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));
