import React, { createContext, Context } from 'react';
import Adhyan from '../core/Adhyan';

export const AppContext: Context<any> = createContext({});

export default ({
  app,
  children,
}: {
  app: Adhyan;
  children: JSX.Element;
}): JSX.Element => (
  <AppContext.Provider value={app}>{children}</AppContext.Provider>
);
