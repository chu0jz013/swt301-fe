/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import WarningIcon from '@mui/icons-material/Warning';
import { privateAxios } from '../../../service/axios';
import {
  Check,
  Close,
  PersonAdd,
  PersonRemove,
  PriorityHigh,
} from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function BedModal({
  roomId,
  open,
  setOpen,
  // studentId,
  // semesterId,
}) {
  const muiConfirm = useConfirm();
  const [reload, setReload] = useState(false);
  const [openMoveStudent, setOpenMoveStudent] = useState(false);
  const [bedList, setBedList] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const handleBedClick = (bed) => {
    setSelectedBed(bed);
  };
  const schema = yup.object().shape({
    rollNumber: yup.string().required(),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { rollNumber: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    muiConfirm({
      title: 'ADD STUDENT!',
      content: `Are you sure you want to assign student ${data.rollNumber} to this bed?`,
    }).then(async () => {
      const res = await privateAxios.put(
        `bed/${selectedBed.id}/move-student?rollNumber=${data.rollNumber}`
      );
      if (res.data.message.includes('successfully')) {
        alert(res.data.message);
        setSelectedBed(res.data);
        reset();
        setOpenMoveStudent(false);
        console.log(selectedBed.rollNumber);
        setReload(!reload);
      } else {
        alert(res.data.message);
      }
    });
  };
  const fetchBed = async () => {
    const res = await privateAxios.get(`room/${roomId}/beds`);
    if (res.data) setBedList(res.data);
  };

  useEffect(() => {
    fetchBed();
  }, [reload]);
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto', // Enable vertical scrolling
            maxHeight: '80vh', // Set a maximum height to enable scrolling
          }}
        >
          <Grid container spacing={0} sx={{ xs: 12, md: 4 }}>
            {bedList.map((bed) => (
              <Grid
                item
                xs={12}
                md={3}
                textAlign={'center'}
                key={bed.id}
                sx={{
                  '&.selected': {
                    border:
                      bed.status.toLowerCase() === 'occupied'
                        ? '1px solid red'
                        : bed.status.toLowerCase() === 'reserved'
                        ? '1px solid yellow'
                        : '1px solid green',
                    borderRadius: '15px',
                  },
                }}
                className={selectedBed === bed ? 'selected' : ''}
              >
                <Typography
                  sx={{
                    '&.selected': {
                      color:
                        bed.status.toLowerCase() === 'occupied'
                          ? 'red'
                          : bed.status.toLowerCase() === 'reserved'
                          ? 'yellow'
                          : 'green',
                    },
                  }}
                  className={selectedBed === bed ? 'selected' : ''}
                >
                  {bed.bedName}
                </Typography>
                <IconButton
                  sx={{
                    '& .MuiSvgIcon-root': {
                      fill:
                        bed.status.toLowerCase() === 'vacant'
                          ? 'green'
                          : bed.status.toLowerCase() === 'reserved'
                          ? 'yellow'
                          : 'red',
                      width: '50px',
                      height: '50px',
                    },
                    cursor:
                      bed.status === 'occupied' || bed.status === 'reserved'
                        ? 'not-allowed'
                        : 'pointer',
                  }}
                  className={selectedBed === bed ? 'selected' : ''}
                  onClick={() => handleBedClick(bed)}
                >
                  <SingleBedIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          {selectedBed && (
            <div>
              <Typography variant='h6' p={1}>
                Selected Bed: {selectedBed.bedName}
              </Typography>
              <Typography variant='body1' p={1}>
                Status:
                <span
                  style={{
                    color:
                      selectedBed.status.toLowerCase() === 'occupied'
                        ? 'red'
                        : selectedBed.status.toLowerCase() === 'reserved'
                        ? 'yellow'
                        : 'green',
                  }}
                >
                  &nbsp; &nbsp; &nbsp; {selectedBed.status.toUpperCase()}
                </span>
              </Typography>
              <Typography
                p={1}
                // style={{ display: 'flex', alignItems: 'center' }}
              >
                Student in:{' '}
                {selectedBed.rollNumber ? selectedBed.rollNumber : 'N/A'}
                {/* {!selectedBed.rollNumber && openMoveStudent && (
                  <>
                    <TextField
                      sx={{ ml: 1 }}
                      {...register('rollNumber')}
                      margin='dense'
                      label='Roll Number'
                      type='text'
                      error={!!errors.rollNumber}
                      helperText={errors?.rollNumber?.message}
                    />
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={handleSubmit(onSubmit)}
                    >
                      <Check color='success' />
                    </span>
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        reset();
                        setOpenMoveStudent(false);
                      }}
                    >
                      <Close color='error' />
                    </span>
                  </>
                )}
                {selectedBed.rollNumber && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: '1px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      muiConfirm({
                        title: (
                          <div
                          // style={{ display: 'flex', alignItems: 'center' }}
                          >
                            REMOVE STUDENT
                            <PriorityHigh
                              color='error'
                              sx={{ width: '33px', height: '33px' }}
                            />
                          </div>
                        ),
                        content: (
                          <div>
                            Are you sure you want to remove student{' '}
                            {selectedBed.rollNumber} from this bed?
                          </div>
                        ),
                      }).then(async () => {
                        const res = await privateAxios.put(
                          `bed/${selectedBed.id}/move-student`
                        );
                        alert(res.data.message);
                        setOpenMoveStudent(false);
                        setSelectedBed(res.data);
                        setReload(!reload);
                      });
                    }} // Add onClick handler
                  >
                    <PersonRemove
                      sx={{
                        color: 'red',
                        transition: 'color 0.3s ease-in-out',
                        '&:hover': {
                          color: 'darkred',
                        },
                      }}
                    />
                  </span>
                )}
                {!selectedBed.rollNumber && !openMoveStudent && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setOpenMoveStudent(true);
                    }} // Add onClick handler
                  >
                    <PersonAdd
                      sx={{
                        color: 'green',
                        transition: 'color 0.3s ease-in-out',
                        '&:hover': {
                          color: 'darkgreen',
                        },
                      }}
                    />
                  </span>
                )} */}
              </Typography>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() => handleConfirm(selectedBed)}
              >
                Book
              </Button> */}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
