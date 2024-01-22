import { Outlet, Route, Routes } from "react-router";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Box } from "@mui/system";
import SideBar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useState } from "react";
import News from "../student/news/News";
import NewsDetail from "../student/news/NewsDetail";
import ViewSchedule from "./schedule/ViewSchedule";
import PenaltyTicket from "./penaltyticket/PenaltyTicket";

const navItems = [
  { text: "News", icon: <NewspaperIcon /> },
  { text: "View Schedule", icon: <AccessTimeIcon /> },
  { text: "Penalty Ticket", icon: <ReportGmailerrorredIcon /> },
];

function Guard() {
  const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
      <>
        <Box width={"100%"} height={"100%"} display={"flex"}>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            navItems={navItems}
            trimPath={7}
          />
          <Box width={"100%"} height={"100%"}>
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
        <Route path="/" />
        <Route path="news" element={<News />} />
        <Route path="news/detail/:id" element={<NewsDetail />} />
        <Route path="viewschedule" element={<ViewSchedule />} />
        <Route path="penaltyticket" element={<PenaltyTicket />} />
      </Route>
    </Routes>
  );
}

export default Guard;
