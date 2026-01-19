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
    <div className='bg-linear-to-b from-silver-950/85 to-silver-950 shadow-md rounded-lg p-6 '>
      <div className='flex justify-between mb-3'>
        <div className='flex flex-col justify-center items-start gap-2'>
          <h3 className='flex items-center gap-2 text-xl font-bold mb-1'>
            <MdMonitor className='size-7 opacity-50' />
            {name}
          </h3>
          <p className='opacity-50 font-bold text-sm mb-3'>{address}</p>
        </div>

        <div className='flex flex-col justify-center items-end gap-2'>
          <div
            className='flex justify-center items-center gap-1 text-sm text-red-400 opacity-75 cursor-pointer'
            onClick={() => handleDeletePos(id)}
          >
            <FaRegTrashAlt className='size-4' />
            Delete
          </div>
          <div
            className='flex justify-center items-center gap-1 text-sm opacity-75 cursor-pointer'
            onClick={() =>
              handleModal({ id: id, name: name, address: address, checkouts })
            }
          >
            <FiEdit className='size-4' />
            Edit
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2'>
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
            className='text-sm pl-3 pr-3 pt-1 pb-1 rounded-lg border-2 border-silver-500 cursor-pointer'
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span>
            {currentPage} de {totalPages}
          </span>
          <button
            className='text-sm pl-3 pr-3 pt-1 pb-1 rounded-lg border-2 border-silver-500 cursor-pointer'
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
