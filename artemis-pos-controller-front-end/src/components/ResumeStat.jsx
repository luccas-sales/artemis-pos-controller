export function ResumeStat({ value, text }) {
  return (
    <div className='text-center'>
      <p className='text-2xl font-bold max-md:text-xl'>{value}</p>
      <p className='text-sm opacity-50 max-md:text-xs'>{text}</p>
    </div>
  );
}
