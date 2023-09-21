export const hostApi =
  process.env.NODE_ENV === 'development' ? 'http://localhost' : 'http://api.digitalexhaust.net';
export const portApi = 
  process.env.NODE_ENV === 'development' ? 8080 : 8080;

export const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

export const localStorageDarkModeKey = 'darkMode';

export const localStorageStyleKey = 'style';

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto';

export const appTitle = 'Digital Exhaust Growth Environment';

export const getPageTitle = (currentPageTitle: string) =>
  `${currentPageTitle} — ${appTitle}`;

