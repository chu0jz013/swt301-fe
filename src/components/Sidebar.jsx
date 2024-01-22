/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/authSlice";
import logo from "../assets/image/avatar-logo.jpg";
const drawerWidth = 240;
export default function SideBar({
  isSidebarOpen,
  setIsSidebarOpen,
  navItems,
  trimPath,
}) {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const { pathname } = useLocation();
  const [active, setActive] = useState(navItems[0].text.toLowerCase());
  const navigate = useNavigate();
  useEffect(() => {
    setActive(pathname.substring(trimPath));
  }, [pathname]);
  return (
    <>
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Box sx={{ overflow: "auto" }}>
            <Box
              minHeight={"64px"}
              sx={{
                padding: "10px 0 10px 0",
              }}
            >
              {localStorage.getItem("role") === "STUDENT" && (
                <>
                  <Avatar
                    sx={{ margin: "auto", width: "100%", height: "100%" }}
                    variant="square"
                    src={logo}
                  ></Avatar>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        marginTop: "10px",
                        marginBottom: 0,
                      }}
                    >
                      {/* LongVH */}
                    </Typography>
                    <Typography paragraph>
                      {/* RollNumber: HE172788 */}
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            <Divider />
            <List
              sx={{
                "& .MuiListItemButton-root:hover": {
                  background: "rgba(255,69,0,0.8)",
                  transition: "0.1s",
                  color: "#fff",
                },
              }}
            >
              {navItems.map(({ text, icon }) => {
                const lcText = text.toLowerCase().replace(/ /g, "");
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      sx={{
                        backgroundColor:
                          active === lcText || active.startsWith(lcText + "/")
                            ? "orangered"
                            : "",
                        color:
                          active === lcText || active.startsWith(lcText + "/")
                            ? "#fff"
                            : "",
                      }}
                      onClick={() => {
                        navigate(`${lcText}`);
                        setActive(lcText);
                      }}
                    >
                      <ListItemIcon
                        sx={
                          {
                            // color: active === lcText ? "" : "",
                          }
                        }
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Toolbar>
            <Button
              onClick={onLogout}
              variant="contained"
              startIcon={<LogoutIcon />}
              fullWidth
              sx={{ bgcolor: "orangered" }}
            >
              LOGOUT
            </Button>
          </Toolbar>
        </Drawer>
      )}
    </>
  );
}
