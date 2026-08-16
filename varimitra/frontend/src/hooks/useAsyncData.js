import { useCallback, useEffect, useState } from 'react';
import { toApiError } from '../api/http';

export function useAsyncData(fetcher, dependencies = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));
    try {
      const data = await fetcher();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: toApiError(error) });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  useEffect(() => { refresh(); }, [refresh]);
  return { ...state, refresh };
}
