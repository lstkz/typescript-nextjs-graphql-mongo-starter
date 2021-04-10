import { useApolloClient } from '@apollo/client';
import React from 'react';

export function useSubscription<T>(query: any, onData: (data: T) => void) {
  const client = useApolloClient();
  React.useEffect(() => {
    const obs = client
      .subscribe({
        query,
      })
      .subscribe(({ data }) => {
        onData(data);
      });
    return () => {
      obs.unsubscribe();
    };
  }, []);
}
