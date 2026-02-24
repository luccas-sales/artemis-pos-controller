import { useState, useEffect } from 'react';
import { ResumeStat } from './ResumeStat';
import { AiFillAlert } from 'react-icons/ai';
import { FaCalendarCheck } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export function PosResumeStat({ posName, checkouts, checkIsRedFlag }) {
  const [totalRedFlags, setTotalRedFlags] = useState(0);

  useEffect(() => {
    const storeRedFlags = checkouts.filter((checkout) =>
      checkIsRedFlag(checkout.lastPurchase),
    ).length;

    setTotalRedFlags(storeRedFlags);
  }, [setTotalRedFlags]);

  const { t } = useTranslation();

  return (
    <div
      className={`${
        totalRedFlags
          ? 'bg-linear-to-b from-red-900/85 to-red-900'
          : 'bg-linear-to-b from-green-900/85 to-green-900'
      } shadow-md rounded-lg p-6 animate-in fade-in duration-1000`}
    >
      <div className='flex justify-between mb-4 w-full'>
        <h3 className='text-xl font-bold max-md:text-base'>{posName}</h3>
        {totalRedFlags ? (
          <AiFillAlert className='size-6' />
        ) : (
          <FaCalendarCheck className='size-5' />
        )}
      </div>

      <div className='grid grid-cols-2 gap-2'>
        <ResumeStat
          value={checkouts.length}
          text={t('posResumeStat.totalNumberOfCheckouts')}
        />
        <ResumeStat
          value={totalRedFlags}
          text={t('posResumeStat.checkoutsInCriticalStatus')}
        />
      </div>
    </div>
  );
}
