import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useConfirm } from 'material-ui-confirm';

const Test = () => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const muiConfirm = useConfirm();
  const handleConfirmationOpen = () => {
    const answer = muiConfirm({
      content: 'You want to delete this object?',
      title: 'Confirm',
    })
      .then(() => {
        console.log('Agree');
      })
      .catch(() => {
        console.log('Denied');
      });
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirmAction = () => {
    // Implement your action here
    // For example, perform deletion or other critical actions
    console.log('Confirmed action');
    handleConfirmationClose();
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={handleConfirmationOpen}
      >
        Open Confirmation Dialog
      </Button>
    </div>
  );
};

export default Test;
