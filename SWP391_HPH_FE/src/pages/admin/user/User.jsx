import React from 'react';
import UserSidebar from './UserSidebar';
import Grid from '@mui/material/Grid';
import AllUser from './AllUser';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import StudentUser from './StudentUser';
import ManagerUser from './ManagerUser';
import StudentDetail from './userdetail/StudentDetail';
import ManagerDetail from './userdetail/ManagerDetail';
const Layout = () => {
  return (
    <Grid container flexDirection={'row-reverse'}>
      <Grid item xs={12}>
        <div
          style={{
            backgroundColor: '#034EA2',
            padding: '6px',
            borderRadius: '15px',
            marginBottom: '10px',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#fff',
              textTransform: 'uppercase',
              margin: '0',
            }}
          >
            User Management
          </h1>
        </div>
      </Grid>
      <Grid item xs={2} paddingRight={1}>
        <UserSidebar />
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
};
export default function User() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Navigate to='all' replace />} />
        <Route path='all' element={<AllUser />} />
        <Route path='student' element={<StudentUser />} />
        <Route path='student/:rollNumber' element={<StudentDetail />} />
        <Route path='manager' element={<ManagerUser />} />
        <Route path='manager/:managerId' element={<ManagerDetail />} />
      </Route>
    </Routes>
  );
}
