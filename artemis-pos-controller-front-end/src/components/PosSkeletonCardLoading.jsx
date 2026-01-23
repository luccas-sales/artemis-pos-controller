import React from 'react';

function PosSkeletonCardLoading() {
  return (
    <div className='bg-linear-to-b from-silver-950/85 to-silver-950 shadow-md rounded-lg p-6 h-fit animate-in fade-in duration-1000'>
      <div className='flex justify-between mb-3 transition-all duration-300 animate-pulse max-sm:flex-col'>
        <div className='flex flex-col justify-center items-start gap-2'>
          <div className='bg-silver-500 h-6 w-35 shadow-lg rounded-sm mb-1'></div>
          <div className='bg-silver-500 h-5 w-45 shadow-lg rounded-sm mb-3'></div>
        </div>
        <div className='flex justify-center items-start gap-2'>
          <div className='bg-silver-500 h-7 w-15 shadow-lg rounded-sm max-sm:w-full'></div>
          <div className='bg-silver-500 h-7 w-10 shadow-lg rounded-sm max-sm:w-full'></div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2 transition-all duration-300 animate-pulse max-sm:grid-cols-1'>
        <div className='bg-silver-500 h-35 w-full shadow-lg rounded-lg'></div>
      </div>
    </div>
  );
}

export default PosSkeletonCardLoading;
