import React, { useState } from 'react';

import useToast from 'common/hooks/useToast';
import { useModal } from 'common/components/modal';
import { deleteHoldingByPosition } from 'api/request.api';

import DeleteConfirmationModal, { IDeleteConfirmationContent } from './delete-confirmation.modal';

const deleteContent: IDeleteConfirmationContent = {
  cancelText: 'Cancel',
  deleteText: 'Delete Position',
  message: 'Do you really want to delete this position? This process cannot be undone.',
};

interface IDeleteHoldingPosition {
  holdingDetails: any;
  onDelete: () => void;
}

const DeleteHoldingPosition = (holdingDetailsProps: IDeleteHoldingPosition) => {
  const { mmToast } = useToast();
  const [loading, setLoading] = useState(false);
  const deleteConfirmationModal = useModal();

  const { holdingDetails, onDelete } = holdingDetailsProps;
  const mmHoldingType = holdingDetails?.mmHoldingType;

  const holdingId = holdingDetails?.id;
  const isDeletable = mmHoldingType === 'MANUAL';

  const deleteByPosition = () => {
    deleteConfirmationModal.open();
  };

  const handleDeleteByPosition = async () => {
    if (holdingId) {
      setLoading(true);
      const { error } = await deleteHoldingByPosition(holdingId);
      setLoading(false);

      if (error) {
        mmToast('Error occurred on deleting holding by position', { type: 'error' });
      } else {
        onDelete();
      }

      return deleteConfirmationModal.close();
    }

    return deleteConfirmationModal.close();
  };

  if (loading) {
    return <span className='spinner-grow spinner-grow-sm text-danger' />;
  }

  if (isDeletable) {
    return (
      <>
        <button className='mm-btn-animate text-danger' onClick={deleteByPosition} type='button'>
          Delete Position
        </button>
        <DeleteConfirmationModal
          deleteConfirmationModal={deleteConfirmationModal}
          onSuccess={handleDeleteByPosition}
          content={deleteContent}
        />
      </>
    );
  }

  return null;
};

export default DeleteHoldingPosition;
