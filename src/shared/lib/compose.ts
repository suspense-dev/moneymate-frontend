type Decorator = <T>(target: T) => T;

export const compose =
  <T>(...decorators: Decorator[]) =>
  (Component: T): T =>
    decorators.reduce((currentComponent, dec) => dec<T>(currentComponent), Component);
