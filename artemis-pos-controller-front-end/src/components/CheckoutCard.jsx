import { useTranslation } from 'react-i18next';
import { AiFillAlert } from 'react-icons/ai';
import { FaCalendarCheck } from 'react-icons/fa6';

export function CheckoutCard({
  checkoutName,
  lastVerification,
  lastPurchase,
  redFlag,
}) {
  function formattingDate(date) {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  }

  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col justify-between p-4 shadow-lg rounded-lg divide-y divide-silver-200 ${
        redFlag
          ? 'bg-linear-to-b from-red-900/85 to-red-900'
          : 'bg-linear-to-b from-green-900/85 to-green-900'
      }`}
    >
      <div>
        <div className='flex justify-between items-center w-full'>
          <p className='font-bold text-sm'>{checkoutName}</p>
          {redFlag ? (
            <AiFillAlert className='size-5' />
          ) : (
            <FaCalendarCheck className='size-4' />
          )}
        </div>
        <p className='flex flex-col text-center mt-2 mb-2 text-sm'>
          {t('checkoutCard.lastPurchase')}:
          <span className='font-bold'>{formattingDate(lastPurchase)}</span>
        </p>
      </div>

      <p className='text-center mt-2 text-xs font-semibold text-silver-200'>
        {t('checkoutCard.lastVerification')}: {formattingDate(lastVerification)}
      </p>
    </div>
  );
}
