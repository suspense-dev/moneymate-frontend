import React from 'react';

import { useDidMount } from './useDidMount';

type Callback = () => void;

export const useDidUpdate = (callback: Callback, conditions: any[]): void => {
  const [isMounted, setMounted] = React.useState<boolean>(false);

  useDidMount(() => {
    setMounted(true);
  });

  React.useEffect(() => {
    if (isMounted) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, conditions);
};
