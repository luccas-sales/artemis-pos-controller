import { CiCalendar } from 'react-icons/ci';

export function EditCheckout({ name, lastVerification, lastPurchase }) {
  function formattingDate(date) {
    const dateFormatted = new Date(date);
    return dateFormatted.toLocaleDateString('pt-BR');
  }

  return (
    <tr>
      <td className='p-4'>
        <input
          type='text'
          className='flex h-9 w-35 rounded-md border border-silver-200 bg-silver-50 px-3 py-1 text-sm shadow-sm'
          defaultValue={name}
        />
      </td>

      <td className='p-4'>
        <div className='flex justify-between items-center w-full'>
          <input
            type='text'
            className='flex h-9 w-35 rounded-md border border-silver-200 bg-silver-50 px-3 py-1 text-sm shadow-sm'
            defaultValue={formattingDate(lastPurchase)}
          />
          <CiCalendar className='size-6 fill-silver-500' />
        </div>
      </td>

      <td className='p-4'>
        <div className='flex justify-between items-center w-full'>
          <input
            type='text'
            className='flex h-9 w-35 rounded-md border border-silver-200 bg-silver-50 px-3 py-1 text-sm shadow-sm'
            defaultValue={formattingDate(lastVerification)}
          />
          <CiCalendar className='size-6 fill-silver-500' />
        </div>
      </td>
    </tr>
  );
}
