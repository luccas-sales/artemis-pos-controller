import { useState } from 'react';
import { CheckoutCard } from './CheckoutCard';
import { FiEdit } from 'react-icons/fi';
import { MdMonitor } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';

export function PosCard({
  id,
  name,
  address,
  checkouts,
  handleModal,
  handleDeletePos,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(checkouts.length / 9);

  const initialIndex = (currentPage - 1) * 9;
  const finalIndex = initialIndex + 9;

  const handlePrevPage = () => setCurrentPage((prev) => prev - 1);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  return (
    <div className='bg-linear-to-b from-silver-950/85 to-silver-950 shadow-md rounded-lg p-6'>
      <div className='flex justify-between mb-3 max-sm:flex-col'>
        <div className='flex flex-col justify-center items-start gap-2'>
          <h3 className='flex items-center gap-2 text-xl font-bold mb-1 max-sm:text-base max-sm:gap-1'>
            <MdMonitor className='size-7 opacity-50 max-sm:size-6' />
            {name}
          </h3>
          <p className='opacity-50 font-bold text-sm mb-3 max-sm:text-xs'>
            {address}
          </p>
        </div>

        <div className='flex justify-center items-center gap-2 max-sm:items-center'>
          <div
            className='flex justify-center items-center gap-1 bg-orange-900/75 py-2 px-4 rounded-lg text-sm cursor-pointer max-sm:w-full transition-all duration-300 ease-out shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:shadow-lg'
            onClick={() =>
              handleModal({ id: id, name: name, address: address, checkouts })
            }
          >
            <FiEdit className='size-4' />
            Edit
          </div>
          <div
            className='flex justify-center items-center gap-1 bg-red-900/75 py-2 px-4 rounded-lg text-sm cursor-pointer max-sm:w-full transition-all duration-300 ease-out shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:shadow-lg'
            onClick={() => handleDeletePos(id)}
          >
            <FaRegTrashAlt className='size-4' />
            Delete
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2 max-sm:grid-cols-1'>
        {checkouts
          .sort((a, b) => {
            return a.name.localeCompare(b.name, 'pt-BR', {
              numeric: true,
              sensitivity: 'base',
            });
          })
          .slice(initialIndex, finalIndex)
          .map((checkout) => {
            const date = new Date().setHours(0, 0, 0, 0);
            const lastPurchaseFormatted = new Date(
              checkout.lastPurchase,
            ).setHours(0, 0, 0, 0);
            const weeklyMilliseconds = 1000 * 60 * 60 * 24 * 5;
            const redFlag = date - lastPurchaseFormatted >= weeklyMilliseconds;

            return (
              <CheckoutCard
                checkoutName={checkout.name}
                lastVerification={checkout.lastVerification}
                lastPurchase={checkout.lastPurchase}
                key={`checkout_${checkout._id}__key`}
                redFlag={redFlag}
              />
            );
          })}
      </div>

      {checkouts.length > 9 && (
        <div className='flex justify-center items-center gap-3 mt-5 pt-3 border-t-2 border-silver-500'>
          <button
            className='text-sm pl-3 pr-3 pt-1 pb-1 rounded-lg border-2 border-silver-500 cursor-pointer max-sm:text-xs transition-all duration-300 ease-out shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:shadow-lg'
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span className='max-sm:text-sm'>
            {currentPage} de {totalPages}
          </span>
          <button
            className='text-sm pl-3 pr-3 pt-1 pb-1 rounded-lg border-2 border-silver-500 cursor-pointer max-sm:text-xs transition-all duration-300 ease-out shadow-md active:scale-95 lg:active:scale-95 lg:hover:-translate-y-0.5 lg:hover:shadow-lg'
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
