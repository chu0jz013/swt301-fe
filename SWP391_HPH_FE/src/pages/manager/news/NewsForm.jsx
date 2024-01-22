import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Dropzone from 'react-dropzone';
import Close from '@mui/icons-material/Close';
import CloudUpload from '@mui/icons-material/CloudUpload';
import InsertDriveFile from '@mui/icons-material/InsertDriveFile';
import { useNavigate } from 'react-router-dom';
import { Download } from '@mui/icons-material';
import { privateAxios } from '../../../service/axios';
export default function NewsForm({ openAdd, setOpenAdd, reload, setReload }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const initialValue = {
    category: '',
    content: '',
    title: '',
    avatar: [],
  };
  const schema = yup.object().shape({
    category: yup.string().required(),
    avatar: yup.array().min(1, 'Please select one file'),
    title: yup.string().required(),
    content: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('file', data.avatar[0]);
    formData.append('managerId', user.managerId);
    formData.append('category', data.category);
    formData.append('content', data.content);
    formData.append('title', data.title);
    privateAxios
      .post('news', formData)
      .then((res) => {
        alert(res.data);
        setReload(!reload);
        setOpenAdd(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Create New User</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register('title')}
              autoFocus
              margin='dense'
              label='Title'
              type='text'
              fullWidth
              error={!!errors.title}
              helperText={errors?.title?.message}
            />
            <TextField
              {...register('category')}
              margin='dense'
              label='Category'
              type='text'
              fullWidth
              error={!!errors.category}
              helperText={errors?.category?.message}
            />
            <TextField
              {...register('content')}
              margin='dense'
              label='Content'
              type='text'
              fullWidth
              error={!!errors.content}
              helperText={errors?.content?.message}
            />

            <div>
              <Controller
                control={control}
                name='avatar'
                render={({ field: { onBlur, onChange, name, value } }) => (
                  <>
                    <Dropzone onDrop={onChange} multiple={false}>
                      {({ getRootProps, getInputProps }) => (
                        <Paper
                          variant='outlined'
                          {...getRootProps()}
                          sx={{
                            backgroundColor: '#eee',
                            textAlign: 'center',
                            cursor: 'pointer',
                            color: '#333',
                            padding: '10px',
                            marginTop: '20px',
                            border: !!errors.avatar ? '1px solid red' : '',
                          }}
                        >
                          <CloudUpload
                            sx={{
                              marginTop: '16px',
                              color: '#333',
                              fontSize: '42px',
                            }}
                          />
                          <input
                            {...getInputProps()}
                            name={name}
                            onBlur={onBlur}
                          />
                          <p>Drag 'n' drop files here, or click select files</p>
                        </Paper>
                      )}
                    </Dropzone>
                    <List>
                      {value.map((f, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <InsertDriveFile />
                          </ListItemIcon>
                          <ListItemText primary={f.name} secondary={f.size} />
                          <IconButton
                            onClick={() => {
                              // Create a download link
                              const downloadLink = document.createElement('a');
                              downloadLink.href = URL.createObjectURL(f);
                              downloadLink.download = f.name;
                              downloadLink.click();
                            }}
                          >
                            <Download />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              resetField('avatar', { defaultValue: [] });
                            }}
                          >
                            <Close />
                          </IconButton>
                        </ListItem>
                      ))}
                      {errors.avatar && (
                        <ListItem>
                          <ListItemText
                            sx={{ color: 'red' }}
                            primary={errors.avatar.message + '!'}
                          />
                        </ListItem>
                      )}
                    </List>
                  </>
                )}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
            <Button type='submit'>Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
