import { useEffect } from 'react';

type Callback = () => void;

export const useDidMount = (callback: Callback): void => {
  useEffect(() => {
    callback();
  });
};
