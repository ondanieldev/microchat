import React from 'react';

import ErrorsProvider from './errors';
import ColorsProvider from './colors';

const providers = [ErrorsProvider, ColorsProvider];

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
