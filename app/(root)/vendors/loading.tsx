// loading.tsx

import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-primary-500 border-opacity-25 border-b-4 border-dark-700 h-12 w-12">
        <Skeleton circle={true} height={12} width={12} />
      </div>
    </div>
  );
};

export default Loading;
