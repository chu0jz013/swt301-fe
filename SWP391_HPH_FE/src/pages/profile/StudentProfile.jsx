import { useEffect } from 'react';
import './studentProfile.css';
import avatar from '../../assets/image/avatar.png';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Avatar, Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPic } from '../../features/picSlice';
export default function StudentProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { picUrl } = useSelector((state) => state.pic);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserPic(user.id));
  }, []);
  return (
    <Grid
      container
      sx={{
        maxWidth: '930px',
        margin: '0 auto',
        marginTop: '50px',
        padding: '30px 10px 30px 10px',
      }}
    >
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('../');
          }}
        >
          <Close />
        </span>
      </Grid>
      <div
        style={{
          backgroundColor: '#034EA2',
          padding: '6px',
          borderRadius: '15px',
          marginBottom: '10px',
          width: '100%',
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
          Personal Information
        </h3>
      </div>
      <Grid item container xs={12} m={0} component={Paper}>
        <Grid item md={4}>
          <Avatar
            alt='Remy Sharp'
            sx={{ width: '300px', height: '300px', borderRadius: '50%' }}
            variant='square'
            src={picUrl}
          />
        </Grid>
        <Grid item md={8} width={'100%'} paddingLeft={1}>
          <Typography m={2} fontSize={'24px'}>
            {user.fullName}
          </Typography>
          <Typography m={2} fontSize={'24px'}>
            {user.dob}
          </Typography>
          <Typography m={2} fontSize={'24px'}>
            {user.gender}
          </Typography>
          {user.studentRollNumber && (
            <Typography m={2} fontSize={'24px'}>
              {user.studentRollNumber}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
