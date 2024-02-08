
export const hostApi =
  process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://api.expona.ai';
export const portApi = 
  process.env.NODE_ENV === 'development' ? 8080 : 443;

export const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/api`;

export const hostApp =
  process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://app.expona.ai';


export const localStorageDarkModeKey = 'darkMode';

export const localStorageStyleKey = 'style';

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto';

export const appTitle = 'Expona Personas';

export const getPageTitle = (currentPageTitle: string) =>
  `${currentPageTitle} — ${appTitle}`;

if(process.env.NODE_ENV === 'development') console.log("Running in development mode")