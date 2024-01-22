import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Close from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { privateAxios } from '../../../service/axios';
const getInitialValue = (building) => {
  return {
    buildingName: building ? building.buildingName : '',
    numberFloor: building ? building.numberFloor : 0,
  };
};
export default function BuildingForm({
  open,
  setOpen,
  building,
  reload,
  setReload,
}) {
  const schema = yup.object().shape({
    buildingName: yup
      .string()
      .required()
      .test(
        'noWhiteSpace',
        'Building Name cannot contain only white spaces',
        (value) => {
          // Use a regular expression to check if the string contains only white spaces
          return /\S/.test(value);
        }
      ),
    numberFloor: yup.number().moreThan(0).required(),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: getInitialValue(building),
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    if (!building) {
      privateAxios
        .post(`building`, data)
        .then((res) => {
          console.log(res);
          alert('Create Building Successfully!');
          reset(getInitialValue());
          setReload(!reload);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          // dispatch(resetForm());
          // reset(getInitialValue());
        });
    } else {
      privateAxios
        .put(`building/${building.id}`, data)
        .then((res) => {
          console.log(res);
          alert('Building is Updated Successfully!');
          setReload(!reload);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          // dispatch(resetForm());
          // reset(getInitialValue());
        });
    }
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <span
          style={{ alignSelf: 'end', cursor: 'pointer' }}
          onClick={() => setOpen(false)}
        >
          <Close />
        </span>
        <DialogTitle>
          <Box>
            <div
              style={{
                backgroundColor: '#034EA2',
                padding: '6px',
                borderRadius: '15px',
              }}
            >
              <h3
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#fff',
                  textTransform: 'uppercase',
                  margin: '0',
                }}
              >
                {!building ? 'Create' : 'Edit'} Building
              </h3>
            </div>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register('buildingName')}
              margin='dense'
              label='Name'
              type='text'
              fullWidth
              error={!!errors.buildingName}
              helperText={errors?.buildingName?.message}
            />
            <TextField
              {...register('numberFloor')}
              margin='dense'
              label='Number Of Floor'
              type='number'
              fullWidth
              error={!!errors.numberFloor}
              helperText={errors?.numberFloor?.message}
            />
          </DialogContent>
          <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant='contained'
              type='submit'
              sx={{
                padding: '8px 20px',
                color: '#FFF',
                backgroundColor: '#FF5000',
                '&:hover': {
                  backgroundColor: '#FF2000',
                  borderColor: '#FF2000',
                  boxShadow: 'none',
                },
                fontWeight: 'bold',
                fontSize: '1.25rem',
              }}
            >
              {!building ? 'Create' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
