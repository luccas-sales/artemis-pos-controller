import { DatabaseContext } from '../../contexts/DatabaseContext';
import { useContext, useEffect, useState } from 'react';
import { ResumeStat } from '../../components/ResumeStat';
import { PosResumeStat } from '../../components/PosResumeStat';

export function SalesStats() {
  const [totalRedFlags, setTotalRedFlags] = useState(0);
  const { database } = useContext(DatabaseContext);

  const checkIsRedFlag = (lastPurchase) => {
    const date = new Date().setHours(0, 0, 0, 0);
    const weeklyMilliseconds = 1000 * 60 * 60 * 24 * 5;
    const lastPurchaseFormatted = new Date(lastPurchase).setHours(0, 0, 0, 0);
    return date - lastPurchaseFormatted >= weeklyMilliseconds;
  };

  const totalCheckouts = database?.reduce(
    (acc, pos) => acc + pos.checkouts.length,
    0,
  );

  useEffect(() => {
    const redFlagsCount = database?.reduce((acc, pos) => {
      const posRedFlags = pos.checkouts.filter((checkout) =>
        checkIsRedFlag(checkout.lastPurchase),
      ).length;
      return acc + posRedFlags;
    }, 0);

    setTotalRedFlags(redFlagsCount);
  }, [database, setTotalRedFlags]);

  return (
    <main
      className='bg-silver-50 p-6 h-full w-full rounded-2xl overflow-x-hidden overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-silver-950/50
      [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-silver-950
      [&::-webkit-scrollbar-thumb]:cursor-pointer'
    >
      <div className='bg-linear-to-b from-silver-950/85 to-silver-950 shadow-md rounded-lg p-6 mb-8'>
        <h3 className='text-xl font-bold mb-4'>General Statistics</h3>

        <div className='grid grid-cols-2 gap-2'>
          {database ? (
            <>
              <ResumeStat
                value={totalCheckouts}
                text='Total Number of Checkouts'
              />
              <ResumeStat
                value={totalRedFlags}
                text='Checkouts in Critical Status'
              />
            </>
          ) : (
            <p>...</p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-2 w-full'>
        {database ? (
          <>
            {database.map((pos) => {
              return (
                <PosResumeStat
                  posName={pos.name}
                  checkouts={pos.checkouts}
                  checkIsRedFlag={checkIsRedFlag}
                  key={`posResumeStat_${pos._id}__key`}
                />
              );
            })}
          </>
        ) : (
          <p>...</p>
        )}
      </div>
    </main>
  );
}
