import React from 'react';

import ErrorsProvider from './errors';
import ColorsProvider from './colors';
import AuthProvider from './auth';
import RoomsProvider from './rooms';
import MessagesProvider from './messages';

const providers = [
  ErrorsProvider,
  ColorsProvider,
  AuthProvider,
  RoomsProvider,
  MessagesProvider,
];

const CombineProviders: React.FC = ({ children }) => {
  return (
    <>
      {providers.reduceRight((acc, Comp, i) => {
        return <Comp key={i}>{acc}</Comp>;
      }, children)}
    </>
  );
};

export default CombineProviders;
