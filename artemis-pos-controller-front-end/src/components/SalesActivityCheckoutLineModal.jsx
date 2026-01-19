import { RiResetLeftFill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';

export function SalesActivityCheckoutLineModal({
  id,
  index,
  name,
  lastPurchase,
  lastVerification,
  originalData,
  handleCheckoutChange,
  handleCheckoutDelete,
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
    <tr
      className={`transition-colors ${
        hasChanges
          ? 'bg-orange-100 hover:bg-orange-100/80'
          : 'bg-silver-50 hover:bg-silver-50/80'
      }`}
    >
      <td
        className={`p-4 align-middle whitespace-nowrap font-medium ${
          hasChanges
            ? 'border-l-3 border-orange-700'
            : 'border-l-3 border-transparent'
        }`}
      >
        <div className='flex items-center gap-3'>
          <div
            className={`h-8 w-8 rounded-md flex items-center justify-center ${
              hasChanges
                ? 'bg-orange-200 text-orange-500'
                : 'bg-silver-100 text-silver-950'
            }`}
          >
            <span className='text-xs font-bold'>{index}</span>
          </div>
          <input
            type='text'
            className='h-9 w-full rounded-md border border-silver-200 bg-white px-3 py-1 text-sm shadow-sm transition-all outline-none focus:border-silver-500 focus:ring-2 focus:ring-silver-500/20'
            value={name}
            onChange={(e) => handleCheckoutChange(id, { name: e.target.value })}
          />
        </div>
      </td>

      <td className='p-4 align-middle'>
        <div className='relative max-w-40'>
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
      </td>

      <td className='p-4 flex justify-between items-center align-middle'>
        <div className='relative max-w-40'>
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

        <div className='flex gap-2'>
          <RiResetLeftFill
            className='size-4 cursor-pointer'
            onClick={() => {
              handleCheckoutChange(id, {
                name: originalData.name,
                lastPurchase: originalData.lastPurchase,
                lastVerification: originalData.lastVerification,
              });
            }}
          />
          <RiDeleteBinFill
            className='size-4 cursor-pointer'
            onClick={() => {
              handleCheckoutDelete(id);
            }}
          />
        </div>
      </td>
    </tr>
  );
}
