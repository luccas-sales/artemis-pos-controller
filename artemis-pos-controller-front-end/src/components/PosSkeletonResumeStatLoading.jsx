import { SkeletonResumeStatLoading } from './SkeletonResumeStatLoading';

export function PosSkeletonResumeStatLoading() {
  return (
    <div className='bg-linear-to-b from-silver-950/85 to-silver-950 shadow-md rounded-lg p-6 animate-in fade-in duration-1000'>
      <div className='flex justify-between mb-4 w-full transition-all duration-300 animate-pulse'>
        <div className='bg-silver-500 h-6 w-45 shadow-lg rounded-sm'></div>

        <div className='bg-silver-500 h-6 w-6 shadow-lg rounded-sm'></div>
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <SkeletonResumeStatLoading />
        <SkeletonResumeStatLoading />
      </div>
    </div>
  );
}
