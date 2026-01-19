export function ResumeStat({ value, text }) {
  return (
    <div className='text-center'>
      <p className='text-2xl font-bold'>{value}</p>
      <p className='text-sm opacity-50'>{text}</p>
    </div>
  );
}
