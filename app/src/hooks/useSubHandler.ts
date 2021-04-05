import React from 'react';

export function useSubHandler<T>(
  { data }: { data?: T },
  handler: (data: T) => void
) {
  const setRef = React.useRef(new Set<any>());
  console.log(setRef.current);
  React.useEffect(() => {
    console.log({ data });
    if (!data) {
      return;
    }
    if (setRef.current.has(data)) {
      return;
    }
    setRef.current.add(data);
    handler(data);
  }, [data]);
}
