import { useState, useEffect } from 'react';
import { ResumeStat } from './ResumeStat';

export function PosResumeStat({ posName, checkouts, checkIsRedFlag }) {
  const [totalRedFlags, setTotalRedFlags] = useState(0);

  useEffect(() => {
    const storeRedFlags = checkouts.filter((checkout) =>
      checkIsRedFlag(checkout.lastPurchase),
    ).length;

    setTotalRedFlags(storeRedFlags);
  }, [setTotalRedFlags]);

  return (
    <div
      className={`${
        totalRedFlags
          ? 'bg-linear-to-b from-red-900/85 to-red-900'
          : 'bg-linear-to-b from-green-900/85 to-green-900'
      } shadow-md rounded-lg p-6`}
    >
      <h3 className='text-xl font-bold mb-4 max-md:text-base'>{posName}</h3>

      <div className='grid grid-cols-2 gap-2'>
        <ResumeStat value={checkouts.length} text='Total Number of Checkouts' />
        <ResumeStat value={totalRedFlags} text='Checkouts in Critical Status' />
      </div>
    </div>
  );
}
