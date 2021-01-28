import React, { useState } from 'react';

import useToast from 'common/hooks/useToast';
import { useModal } from 'common/components/modal';
import { deleteActivityTransaction } from 'api/request.api';

import DeleteConfirmationModal, { IDeleteConfirmationContent } from './delete-confirmation.modal';

interface IDeleteActivity {
  activityId?: string | number;
  onDelete: () => void;
}

const deleteActivityContent: IDeleteConfirmationContent = {
  cancelText: 'Cancel',
  deleteText: 'Delete Activity',
  message: 'Do you really want to delete this activity? This process cannot be undone.',
};

const DeleteActivity = (props: IDeleteActivity) => {
  const { activityId, onDelete } = props;
  const { mmToast } = useToast();
  const deleteConfirmationModal = useModal();
  const [loading, setLoading] = useState(false);

  const handleDeleteActivity = async () => {
    if (activityId) {
      setLoading(true);
      const { error } = await deleteActivityTransaction(`${activityId}`);

      if (error) {
        mmToast('Error on deleting Activity', { type: 'error' });
      } else {
        mmToast('Account deleted successfully', { type: 'success' });
        onDelete();
      }
      setLoading(false);
    }

    return deleteConfirmationModal.close();
  };

  if (loading) {
    return (
      <button className='mm-btn-animate '>
        <span className='spinner-grow spinner-grow-sm text-danger' />
      </button>
    );
  }

  if (!activityId) {
    return null;
  }

  return (
    <>
      <button className='mm-btn-animate text-danger' onClick={deleteConfirmationModal.open} type='button'>
        Delete Activity
      </button>
      <DeleteConfirmationModal
        deleteConfirmationModal={deleteConfirmationModal}
        onSuccess={handleDeleteActivity}
        content={deleteActivityContent}
      />
    </>
  );
};

export default DeleteActivity;
