import { FiSave } from 'react-icons/fi';
import { useContext, useMemo, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { SalesActivityCheckoutLineModal } from './SalesActivityCheckoutLineModal';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import { DatabaseContext } from '../contexts/DatabaseContext';
import { IoIosAddCircle } from 'react-icons/io';

export function SalesActivityModal({
  id,
  name,
  address,
  checkouts,
  modalVisibility,
  setModalVisibility,
}) {
  const { fetchData } = useContext(DatabaseContext);
  const [formData, setFormData] = useState({
    name: name,
    address: address,
    checkouts: checkouts,
  });

  const isNewPos = id ? false : true;

  const totalChanges = useMemo(() => {
    const headerChanges =
      (formData.name !== name ? 1 : 0) + (formData.address !== address ? 1 : 0);

    const checkoutChanges = formData.checkouts.reduce((acc, current) => {
      const original = checkouts.find((c) => c._id === current._id);

      const isNewItem = current.isNew && !current.isDeleted;

      const isExistingDeleted = !current.isNew && current.isDeleted;

      const isModified =
        !current.isNew &&
        !current.isDeleted &&
        (current.name !== original?.name ||
          current.lastPurchase?.slice(0, 10) !==
            original?.lastPurchase?.slice(0, 10) ||
          current.lastVerification?.slice(0, 10) !==
            original?.lastVerification?.slice(0, 10));

      const isChanged = isNewItem || isExistingDeleted || isModified;

      return acc + (isChanged ? 1 : 0);
    }, 0);

    return headerChanges + checkoutChanges;
  }, [formData, name, address, checkouts]);

  const handleOnChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckoutChange = (id, updates) => {
    setFormData((prev) => ({
      ...prev,
      checkouts: prev.checkouts.map((checkout) => {
        if (checkout._id === id) {
          return {
            ...checkout,
            ...updates,
          };
        }
        return checkout;
      }),
    }));
  };

  const handleCheckoutDelete = (id) => {
    setFormData((prev) => ({
      ...prev,
      checkouts: prev.checkouts.map((checkout) => {
        if (checkout._id === id) {
          return {
            ...checkout,
            isDeleted: 'isDeleted',
          };
        }
        return checkout;
      }),
    }));
  };

  const createNewCheckout = () => {
    const newCheckout = {
      _id: `tempId_${new Date().toISOString()}`,
      name: `Checkout ${formData.checkouts.length + 1}`,
      lastPurchase: new Date().toISOString(),
      lastVerification: new Date().toISOString(),
      isNew: 'isNew',
    };

    setFormData((prev) => ({
      ...prev,
      checkouts: [...prev.checkouts, newCheckout],
    }));
  };

  const closeModal = () => {
    setModalVisibility(false);
  };

  const handleSaveChanges = async () => {
    let promises = [];

    if (isNewPos) {
      const cleanCheckouts = formData.checkouts
        .filter((c) => !c.isDeleted)
        .map(({ _id, isNew, isDeleted, ...rest }) => rest);

      promises = [
        axios.post(`/pos`, {
          name: formData.name,
          address: formData.address,
          checkouts: cleanCheckouts,
        }),
      ];
    } else {
      const posChecked =
        formData.name !== name || formData.address !== address
          ? [
              axios.put(`/pos/${id}`, {
                name: formData.name,
                address: formData.address,
              }),
            ]
          : [];

      const checkoutsChecked = formData.checkouts.filter((checkout) => {
        if (checkout.isNew && checkout.isDeleted) return false;

        if (checkout.isNew || checkout.isDeleted) return true;

        const original = checkouts.find((c) => c._id === checkout._id);

        const isChanged =
          checkout.name !== original?.name ||
          checkout.lastPurchase?.slice(0, 10) !==
            original?.lastPurchase?.slice(0, 10) ||
          checkout.lastVerification?.slice(0, 10) !==
            original?.lastVerification?.slice(0, 10);

        return isChanged;
      });

      const checkoutUpdateOrCreate = checkoutsChecked.map((checkout) => {
        const { _id, isNew, isDeleted, ...cleanData } = checkout;

        if (isDeleted) {
          return axios.delete(
            `/pos/${id}/checkout/${_id}`,
          );
        }

        if (isNew) {
          return axios.post(`/pos/${id}`, cleanData);
        }

        return axios.put(
          `/pos/${id}/checkout/${_id}`,
          cleanData,
        );
      });

      promises = checkoutUpdateOrCreate.concat(posChecked);
    }

    try {
      await Promise.all(promises);
      await fetchData();
      closeModal();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-9 flex justify-center items-center w-full h-full z-99 ${
        !modalVisibility ? 'hidden' : ''
      }`}
    >
      <div className='bg-white text-silver-900 flex flex-col rounded-xl border border-silver-200 w-full max-w-5xl shadow-xl'>
        <div className='flex items-center justify-between w-full gap-2 p-6 border-b border-silver-200 bg-silver-50/40 pb-6'>
          <div className='flex flex-col items-start gap-3'>
            <input
              type='text'
              className='h-8 rounded-md border border-silver-200 bg-white px-3 py-1 font-semibold text-xl shadow-sm transition-all outline-none focus:border-silver-500 focus:ring-2 focus:ring-silver-500/20'
              value={formData.name}
              onChange={(e) => handleOnChange('name', e.target.value)}
            />

            <input
              type='text'
              className='h-7 w-full rounded-md border border-silver-200 bg-white px-3 py-1 font-semibold text-sm text-silver-500 shadow-sm transition-all outline-none focus:border-silver-500 focus:ring-2 focus:ring-silver-500/20'
              value={formData.address}
              onChange={(e) => handleOnChange('address', e.target.value)}
            />
          </div>
          <div className='flex items-center gap-3'>
            {isNewPos ||
              (totalChanges > 0 && (
                <span className='flex justify-center items-center gap-2 rounded-md border border-orange-200 px-2.5 py-1.5 font-medium text-sm bg-orange-100 text-orange-700'>
                  <BsExclamationCircle className='size-4' />
                  {`${totalChanges} ${
                    totalChanges === 1
                      ? 'alteração não salva'
                      : 'alterações não salvas'
                  }`}
                </span>
              ))}
            <div className='flex justify-center items-center gap-4'>
              <button
                className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all bg-silver-950 text-white hover:bg-silver-800 h-9 px-4 py-2 gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={totalChanges === 0 && !isNewPos}
                onClick={() => handleSaveChanges()}
              >
                <FiSave className='size-4' />
                Salvar
              </button>
              <button onClick={() => closeModal()}>
                <IoCloseSharp className='size-6 cursor-pointer' />
              </button>
            </div>
          </div>
        </div>

        <div className='max-h-[60vh] overflow-y-auto'>
          <table className='w-full text-sm'>
            <thead className='sticky top-0 bg-silver-100 z-20 border-b border-silver-200 h-12'>
              <tr className='text-silver-600'>
                <th className='px-4 text-left align-middle font-semibold'>
                  Nome
                </th>
                <th className='px-4 text-left align-middle font-semibold'>
                  Last Purchase
                </th>
                <th className='px-4 text-left align-middle font-semibold'>
                  Last Verification
                </th>
              </tr>
            </thead>

            <tbody className='divide-y divide-silver-100'>
              {formData.checkouts
                .filter((checkout) => !checkout.isDeleted)
                .map((checkout, index) => {
                  const original = checkouts.find(
                    (check) => check._id === checkout._id,
                  );

                  return (
                    <SalesActivityCheckoutLineModal
                      key={`checkout_${checkout._id ? checkout._id : index}__key`}
                      id={checkout._id}
                      index={index + 1}
                      name={checkout.name}
                      lastPurchase={checkout.lastPurchase}
                      lastVerification={checkout.lastVerification}
                      originalData={original}
                      handleCheckoutChange={handleCheckoutChange}
                      handleCheckoutDelete={handleCheckoutDelete}
                      isNewPos={isNewPos}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>

        <div
          className='flex justify-center items-center border-2 border-dashed border-silver-950/75 shadow-md rounded-lg p-3 w-full cursor-pointer hover:bg-silver-50 transition-colors'
          onClick={() => createNewCheckout()}
        >
          <IoIosAddCircle className='size-10 fill-silver-950/75' />
        </div>
      </div>
    </div>
  );
}
