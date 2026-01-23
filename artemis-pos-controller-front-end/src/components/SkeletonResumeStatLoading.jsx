export function SkeletonResumeStatLoading() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 transition-all duration-300 animate-pulse'>
      <div className='bg-silver-500 h-6 w-20 shadow-lg rounded-sm'></div>
      <div className='bg-silver-500 h-4 w-40 shadow-lg rounded-sm'></div>
    </div>
  );
}
