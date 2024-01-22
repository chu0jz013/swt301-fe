import React, { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import AddCircle from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { open, updateFields } from "../../../features/userFormSlice";
import StudentForm from "./form/StudentForm";
import Searchbar from "../../../components/Searchbar";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;
export default function StudentUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openAddStudent } = useSelector((state) => state.userForm);
  const [openEdit, setOpenEdit] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const fetchStudent = async () => {
    const res = await privateAxios.get(
      `student?pageNo=${currentPage - 1}&rollNumber=${search}`
    );
    setStudents(res.data.data);
    setTotalPages(res.data.totalPages);
  };
  useEffect(() => {
    fetchStudent();
    setCurrentPage(1);
  }, [search, reload]);
  useEffect(() => {
    fetchStudent();
  }, [currentPage]);
  return (
    <Box padding={1}>
      <Search sx={{ display: "inline-block" }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onChange={(e) => {
            // setTimeout(() => {
            setSearch(e.target.value);
            // }, 700)();
          }}
          placeholder="Roll Number..."
          inputProps={{ "aria-label": "search" }}
          sx={{
            border: "5px solid orangered",
            borderRadius: "30px",
          }}
        />
      </Search>
      <Box textAlign={"right"} mb={2}>
        <Button
          onClick={() => {
            dispatch(open("ADD_STUDENT"));
          }}
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
                Roll Number
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                FullName
              </TableCell>
              {/* <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                Address
              </TableCell> */}
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
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell component="th">{student.id}</TableCell>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.userDto.fullName}</TableCell>
                {/* <TableCell>{student.userDto.address}</TableCell> */}
                <TableCell>{student.createdAt}</TableCell>
                <TableCell>{student.updateAt}</TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "orangered" }}
                    onClick={() => {
                      navigate(`${student.rollNumber}`);
                    }}
                    variant="contained"
                  >
                    <RemoveRedEye />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      const newUser = { ...student.userDto };
                      const { userDto, ...newStudentDto } = student;
                      const newStudentUser = {
                        ...newUser,
                        studentDto: newStudentDto,
                      };
                      dispatch(updateFields(newStudentUser));
                      dispatch(open("ADD_STUDENT"));
                    }}
                    variant="contained"
                  >
                    <Edit />
                  </IconButton>
                  {/* <IconButton
                    color='error'
                    onClick={() => {}}
                    variant='contained'
                  >
                    <Delete />
                  </IconButton> */}
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
      {openAddStudent && <StudentForm reload={reload} setReload={setReload} />}
    </Box>
  );
}
