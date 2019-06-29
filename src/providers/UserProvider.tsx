import React, { createContext, Context } from 'react';

export const UserContext: Context<any> = createContext({});

export default ({
  user,
  children,
}: {
  user: UserInterface;
  children: JSX.Element;
}): JSX.Element => (
  <UserContext.Provider value={user}>{children}</UserContext.Provider>
);
