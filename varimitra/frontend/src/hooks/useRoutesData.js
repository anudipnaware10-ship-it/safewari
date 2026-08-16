import { platformApi } from '../api/platform';
import { useAsyncData } from './useAsyncData';

export const useRoutesData = () => useAsyncData(platformApi.routes, []);
