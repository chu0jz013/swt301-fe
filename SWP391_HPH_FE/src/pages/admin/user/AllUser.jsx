import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { privateAxios } from "../../../service/axios";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { deepOrange, orange } from "@mui/material/colors";
import { AddCircle, Edit, RemoveRedEye } from "@mui/icons-material";
import AddUser from "./form/AddUser";
import EditUser from "./form/EditUser";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";

export default function AllUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState(false);
  const [reload, setReload] = useState(false);
  const [partialName, setPartialName] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [roles, setRoles] = useState([]);
  const [selectedStatus, SetSelectedStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const muiConfirm = useConfirm();
  const fetchRoles = async () => {
    try {
      const res = await privateAxios.get("role");
      setRoles(
        res.data.filter(
          (role) => role.roleName !== "ADMIN" && role.roleName !== "GUARD"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUser = async () => {
    let roleFilter = "";
    if (roleId !== 0) roleFilter = roleId;
    const res = await privateAxios.get(
      `user?partialName=${partialName}&roleId=${roleFilter}&pageNo=${
        currentPage - 1
      }`
    );
    setUsers(res.data?.data.filter((user) => user.username !== "admin"));
    setTotalPages(res.data.totalPages);
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  useEffect(() => {
    fetchUser().then(() => {
      if (selectedStatus !== "all") {
        setUsers((prev) =>
          prev.filter((user) => user.status.toLowerCase() === selectedStatus)
        );
      }
    });
    setCurrentPage(1);
  }, [roleId, partialName, selectedStatus]);
  useEffect(() => {
    fetchUser();
  }, [reload]);
  useEffect(() => {
    fetchUser();
  }, [currentPage]);
  // const deleteUser = async () => {
  //   try {
  //     const res = await privateAxios.delete('user')
  //     setRoles(res.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <Box padding={1}>
      <Box
        display={"flex"}
        sx={{ justifyContent: "space-between" }}
        margin={"5vh 0"}
      ></Box>
      <Box display={"flex"} justifyContent={"center"} gap={2} mb={2}>
        <FormControl sx={{ width: 250 }}>
          <TextField
            label="Username"
            fullWidth
            multiline
            value={partialName}
            onChange={(event) => {
              setPartialName(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="floor-label">Role</InputLabel>
          <Select
            labelId="floor-label"
            label="Floor"
            value={roleId}
            onChange={(e) => {
              setRoleId(e.target.value);
            }}
          >
            <MenuItem key={0} value={0}>
              ALL
            </MenuItem>
            {roles &&
              roles.map((item, index) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.roleName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 250 }}>
          <InputLabel id="room-type-label">Status</InputLabel>
          <Select
            labelId="room-type-label"
            label="Status"
            value={selectedStatus}
            onChange={(e) => {
              SetSelectedStatus(e.target.value);
            }}
          >
            <MenuItem value={"all"}>{"ALL"}</MenuItem>
            <MenuItem value={"active"}>{"ACTIVE"}</MenuItem>
            <MenuItem value={"inactive"}>{"INACTIVE"}</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box textAlign={"right"} mb={2}>
        <Button
          onClick={() => setOpenAdd(true)}
          variant="contained"
          endIcon={<AddCircle />}
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "orangered" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Username
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Activate
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Created Date
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Updated Date
              </TableCell>
              <TableCell
                colSpan={2}
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Settings
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th">{item.id}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <FormControl>
                    <Switch
                      checked={item.status === "active" ? true : false}
                      onChange={(e) => {
                        const newStatus =
                          item.status === "active" ? "inactive" : "active";
                        muiConfirm({
                          title: "Update status",
                          content: `Are you sure you want to update User (ID: ${
                            item.id
                          }) from ${item.status.toUpperCase()} to ${newStatus.toUpperCase()}`,
                        }).then(() => {
                          privateAxios
                            .put(`user/${item.id}`, { status: newStatus })
                            .then((res) => {
                              setReload(!reload);
                            })
                            .catch((err) => console.log(err));
                        });
                      }}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.updatedAt}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedUser(item);
                      setOpenEdit(true);
                    }}
                    variant="contained"
                  >
                    <Edit />
                  </IconButton>
                  {/* <IconButton
                    color='error'
                    onClick={() => {
                      if (confirm(`Do you want to delete user ${item.id}`)) {
                        privateAxios.delete(`user/${item.id}`);
                      }
                    }}
                    variant='contained'
                  >
                    <Delete />
                  </IconButton> */}
                  <IconButton
                    sx={{ color: "orangered" }}
                    onClick={() => {
                      if (item.roleName === "STUDENT") {
                        navigate(`../student/${item.studentRollNumber}`);
                      } else {
                        navigate(`../manager/${item.managerId}`);
                      }
                    }}
                    variant="contained"
                  >
                    <RemoveRedEye />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={(e, value) => {
          setCurrentPage(value);
        }}
        sx={{
          justifyContent: "center",
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
          "&& .Mui-selected": {
            bgcolor: "orangered",
          },
          "& .MuiPaginationItem-root:hover": {
            bgcolor: "rgba(255,69,0,0.8)",
          },
          "&& .Mui-selected:hover": {
            bgcolor: "rgba(255,69,0,0.8)",
          },
          my: 4,
        }}
      />
      {openAdd && <AddUser openAdd={openAdd} setOpenAdd={setOpenAdd} />}
      {openEdit && (
        <EditUser
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          user={selectedUser}
        />
      )}
    </Box>
  );
}
