import { Outlet, Route, Routes, Navigate } from 'react-router';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Box } from '@mui/system';
import SideBar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { useState } from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';

import RoomType from './roomtype/RoomType';
import Room from './room/Room';
import Building from './building/Building';
import User from './user/User';
import StudentProfile from '../profile/StudentProfile';
import ChangePassword from '../changePassword/ChangePassword';

const navItems = [
  { text: 'User', icon: <ManageAccountsIcon /> },
  { text: 'Building', icon: <ApartmentIcon /> },

  { text: 'Room Type', icon: <MeetingRoomIcon /> },
  { text: 'Room', icon: <BedroomParentIcon /> },
];

function AdminPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.roleName !== 'ADMIN') {
    return <Navigate to='/login' replace />;
  }
  const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
      <>
        <Box width={'100%'} height={'100%'} display={'flex'}>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            navItems={navItems}
            trimPath={7}
          />
          <Box width={'100%'} height={'100%'}>
            <Topbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet />
          </Box>
        </Box>
      </>
    );
  };
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Navigate to='user/' replace />} />
        <Route path='user/*' element={<User />} />
        <Route path='building' element={<Building />} />
        <Route path='roomtype' element={<RoomType />} />
        <Route path='room' element={<Room />} />
      </Route>
      <Route path='profile' element={<StudentProfile />} />
      <Route path='changepassword' element={<ChangePassword />} />
    </Routes>
  );
}

export default AdminPage;
