import { RiResetLeftFill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';

export function SalesActivityCheckoutCardModal({
  id,
  index,
  name,
  lastPurchase,
  lastVerification,
  originalData,
  handleCheckoutChange,
  handleCheckoudivelete,
  isNewPos,
}) {
  const isNewCheckout = !originalData;

  const hasChanges =
    !isNewPos &&
    (isNewCheckout ||
      name !== originalData?.name ||
      lastPurchase.slice(0, 10) !== originalData?.lastPurchase?.slice(0, 10) ||
      lastVerification.slice(0, 10) !==
        originalData?.lastVerification?.slice(0, 10));

  function formattingDate(date) {
    if (!date) return '';
    return date.slice(0, 10);
  }

  return (
    <div
      className={`flex flex-col justify-center gap-3 p-4 bg-linear-to-b shadow-md rounded-lg ${
        hasChanges
          ? 'from-orange-100/85 to-orange-100'
          : 'from-silver-100/85 to-silver-100'
      } transition-all duration-300 ease-out shadow-md lg:hover:-translate-y-0.5 lg:hover:shadow-lg`}
    >
      <div className='flex justify-between items-center w-full'>
        <div
          className={`h-8 w-8 rounded-md flex items-center justify-center ${
            hasChanges
              ? 'bg-orange-200 text-orange-500'
              : 'bg-silver-200 text-silver-950'
          }`}
        >
          <span className='text-xs font-bold'>{index}</span>
        </div>
        <div className='flex gap-2'>
          <RiResetLeftFill
            className='size-4 cursor-pointer transition-all duration-300 ease-out text-shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:text-shadow-lg'
            onClick={() => {
              handleCheckoutChange(id, {
                name: originalData.name,
                lastPurchase: originalData.lastPurchase,
                lastVerification: originalData.lastVerification,
              });
            }}
          />
          <RiDeleteBinFill
            className='size-4 cursor-pointer transition-all duration-300 ease-out text-shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:text-shadow-lg'
            onClick={() => {
              handleCheckoudivelete(id);
            }}
          />
        </div>
      </div>

      <div className='flex items-center'>
        <input
          type='text'
          className='h-9 w-full rounded-md border border-silver-200 bg-white px-3 py-1 text-sm shadow-sm transition-all outline-none focus:border-silver-500 focus:ring-2 focus:ring-silver-500/20'
          value={name}
          onChange={(e) => handleCheckoutChange(id, { name: e.target.value })}
        />
      </div>

      <div className='flex items-center'>
        <input
          type='date'
          className='h-9 w-full rounded-md border border-silver-200 bg-white px-3 py-1 text-sm shadow-sm transition-all outline-none focus:border-silver-500 focus:ring-2 focus:ring-silver-500/20'
          value={formattingDate(lastPurchase)}
          onChange={(e) =>
            handleCheckoutChange(id, {
              lastPurchase: e.target.value
                ? new Date(e.target.value).toISOString()
                : originalData.lastPurchase,
            })
          }
        />
      </div>

      <div className='flex items-center'>
        <input
          type='date'
          className='h-9 w-full rounded-md border border-silver-200 bg-white px-3 py-1 text-sm shadow-sm transition-all outline-none focus:border-silver-500 focus:ring-2 focus:ring-silver-500/20'
          value={formattingDate(lastVerification)}
          onChange={(e) =>
            handleCheckoutChange(id, {
              lastVerification: e.target.value
                ? new Date(e.target.value).toISOString()
                : originalData.lastVerification,
            })
          }
        />
      </div>
    </div>
  );
}
