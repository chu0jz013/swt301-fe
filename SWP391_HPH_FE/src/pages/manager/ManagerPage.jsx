import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import { useState } from 'react';
import { Box } from '@mui/material';
import SideBar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Room from './room/Room';
import Student from './student/Student';
import BedRequest from './bedrequest/BedRequest';
import StudentDetail from './student/StudentDetails';
import HotelIcon from '@mui/icons-material/Hotel';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PaymentPage from './payment/PaymentPage';
import StudentPayment from './student/StudentPayment';
import News from './news/News';
import NewsDetail from './news/NewsDetail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Request from './request/Request';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import StudentRequest from './student/StudentRequest';
import StudentProfile from '../profile/StudentProfile';
import ChangePassword from '../changePassword/ChangePassword';

const navItems = [
  {
    text: 'Dashboard',
    icon: <SpaceDashboardIcon />,
  },
  {
    text: 'News',
    icon: <NotificationsIcon />,
  },
  {
    text: 'Room',
    icon: <BedroomChildIcon />,
  },
  {
    text: 'Student',
    icon: <AccountCircleIcon />,
  },
  {
    text: 'Bed Request',
    icon: <HotelIcon />,
  },
  {
    text: 'Payment',
    icon: <LocalAtmIcon />,
  },
  {
    text: 'Request',
    icon: <ContactSupportIcon />,
  },
];
function ManagerPage() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.roleName !== 'MANAGER') {
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
            trimPath={9}
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
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Navigate to='dashboard' replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='news' element={<News />} />
          <Route path='news/detail/:id' element={<NewsDetail />} />
          <Route path='room' element={<Room />} />
          <Route path='student' element={<Student />} />
          <Route path='student/:rollNumber' element={<StudentDetail />} />
          <Route path='bedrequest' element={<BedRequest />} />
          <Route path='payment' element={<PaymentPage />} />
          <Route path='request' element={<Request />} />
          <Route
            path='student/:rollNumber/payment'
            element={<StudentPayment />}
          />
          <Route
            path='student/:rollNumber/request'
            element={<StudentRequest />}
          />
        </Route>
        <Route path='profile' element={<StudentProfile />} />
        <Route path='changepassword' element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default ManagerPage;
