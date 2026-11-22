import * as rootParams from 'next/root-params';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { notFound } from 'next/navigation';

export default getRequestConfig(async () => {
  const requested = await rootParams.locale();
  const locale = hasLocale(routing.locales, requested) ? requested : notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
