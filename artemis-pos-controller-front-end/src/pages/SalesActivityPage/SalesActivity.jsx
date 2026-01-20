import axios from 'axios';
import { SalesActivityModal } from '../../components/SalesActivityModal';
import { PosCard } from '../../components/PosCard';
import { DatabaseContext } from '../../contexts/DatabaseContext';
import { useContext, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import PosSkeletonCardLoading from '../../components/PosSkeletonCardLoading';

export function SalesActivity() {
  const { database, fetchData } = useContext(DatabaseContext);
  const [modalData, setModalData] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);

  const handleModal = (data) => {
    setModalVisibility(true);
    if (!data) {
      data = {
        name: 'New Pos',
        address: 'street for example, N 91225',
        checkouts: [
          {
            name: 'Checkout 1',
            lastPurchase: new Date().toISOString(),
            lastVerification: new Date().toISOString(),
          },
        ],
      };
    }

    setModalData({ ...data });
  };

  const handleDeletePos = async (id) => {
    try {
      await axios.delete(`/pos/${id}`);
      await fetchData();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <main
      className='relative bg-silver-50 p-6 h-full w-full rounded-2xl overflow-x-hidden overflow-y-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-silver-950/50
      [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-silver-950
      [&::-webkit-scrollbar-thumb]:cursor-pointer max-lg:p-3'
    >
      {modalVisibility && (
        <SalesActivityModal
          id={modalData.id}
          name={modalData.name}
          address={modalData.address}
          checkouts={modalData.checkouts}
          modalVisibility={modalVisibility}
          setModalVisibility={setModalVisibility}
        />
      )}

      <div className='grid grid-cols-2 gap-2 mb-2 w-full max-lg:grid-cols-1'>
        {database ? (
          <>
            {database.map((pos) => {
              return (
                <PosCard
                  id={pos._id}
                  name={pos.name}
                  address={pos.address}
                  key={`pos__${pos.name}__key`}
                  checkouts={pos.checkouts}
                  handleModal={handleModal}
                  handleDeletePos={handleDeletePos}
                />
              );
            })}

            <div
              className='flex justify-center items-center border-2 border-dashed border-silver-950/75 shadow-md rounded-lg p-6 mb-8 cursor-pointer h-full min-h-60'
              onClick={() => handleModal()}
            >
              <IoIosAddCircle className='size-15 fill-silver-950/75' />
            </div>
          </>
        ) : (
          <PosSkeletonCardLoading />
        )}
      </div>
    </main>
  );
}
