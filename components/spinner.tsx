// components/Spinner.tsx

import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Spinner: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin">
        <Skeleton circle={true} height={50} width={50} />
      </div>
    </div>
  );
};

export default Spinner;
