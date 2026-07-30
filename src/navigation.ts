import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {locales, localePrefix} from './config/locales';

export {locales, localePrefix};

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});
