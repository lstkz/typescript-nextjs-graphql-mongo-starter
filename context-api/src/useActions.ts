import React from 'react';

export function useActions<T>(actions) {
  return React.useMemo<T>(() => actions, []);
}
