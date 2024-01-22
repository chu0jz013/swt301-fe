/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { privateAxios } from "../../../service/axios";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Searchbar from "../../../components/Searchbar";
import AddIcon from "@mui/icons-material/Add";
import { Button, Modal, SnackbarContent, TextField } from "@mui/material";
import { Snackbar } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

function BasicTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Penalty Ticket ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Student ID</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.penaltyTicketId}>
              <TableCell component="th" scope="row">
                {row.penaltyTicketId}
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>GUARD ID: {row.createdByGuardId}</TableCell>
              <TableCell>{row.studentId}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              {/* Thêm các cột khác ở đây */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PenaltyTicket() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState({ content: [], totalPages: 0, number: 0 });
  const [page, setPage] = useState(0);
  const pageSize = 3; // Kích thước trang

  const [searchTerm, setSearchTerm] = useState(""); // Thêm trường tìm kiếm

  const fetchData = async (page, size, search) => {
    try {
      const response = await privateAxios.get(
        `penalty-ticket/page?page=${page}&size=${size}&title=${search}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    setPage(0);
  };

  useEffect(() => {
    fetchData(page, pageSize, searchTerm);
  }, [page, searchTerm]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  // State for managing the form data in the modal
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "Pending",
    createdByGuardId: "",
    studentId: "",
  });

  const handleFormChange = (event) => {
    // Update the form data when the user enters data in the modal
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  // Sử dụng useState để lưu thông tin của Guard
  const [guardInfo, setGuardInfo] = useState(null);

  // State để lưu danh sách sinh viên và giá trị được chọn
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Gọi API để lấy danh sách tất cả sinh viên
    const fetchStudents = async () => {
      try {
        const response = await privateAxios.get("student");
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudents();
  }, []);

  // const handleStudentChange = (event) => {
  //   const selectedStudent = event.target.value;
  //   setSelectedStudent(selectedStudent);
  //   setFormData({
  //     ...formData,
  //     studentId: selectedStudent,
  //   });
  // };

  const handleStudentChange = (event, newValue) => {
    setSelectedStudent(newValue);
    setFormData({
      ...formData,
      studentId: newValue ? newValue.studentId : null,
    });
  };

  useEffect(() => {
    const fetchGuardInfo = async () => {
      try {
        const response = await privateAxios.get(
          `guard/get-guard-by-userid/${userId}`
        );
        setGuardInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGuardInfo();
  }, [userId]);

  // Quản lí thông báo bằng Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Trạng thái mở hay đóng Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nội dung thông báo trong Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Mức độ quan trọng của thông báo (success, error, warning, info, ...)
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);

    // Đặt một hẹn giờ để tự động đóng Snackbar sau 5 giây
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 5000); // 5000 milliseconds = 5 giây
  };

  // const handleCloseSnackbar = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setSnackbarOpen(false);
  // };

  //End

  if (guardInfo) {
    // Update formData with createdByGuardId
    formData.createdByGuardId = guardInfo.guardId;
  }

  // Function to handle adding a ticket
  const handleAddTicket = async () => {
    // Check if the fields are empty
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.studentId
    ) {
      // Show an error message in the Snackbar if any of the fields are empty
      showSnackbar("Please fill in all required fields.", "error");
      return;
    }
    try {
      console.log(formData);
      // Make a POST request to create a new Penalty Ticket using the formData
      const response = await privateAxios.post("penalty-ticket", formData);

      // Check if the request was successful
      if (response.status === 200) {
        // Close the modal
        handleClose();

        // Refresh the data by fetching all Penalty Tickets
        fetchData(page, pageSize, searchTerm);

        // Show a success message in the Snackbar
        showSnackbar("Ticket added successfully", "success");
      } else {
        // Show an error message in the Snackbar
        showSnackbar("Failed to add ticket", "error");
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that may occur during the request
    }
  };

  return (
    <div style={{ margin: "1.5rem" }}>
      {/* Snackbar start */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Thời gian tự động đóng Snackbar (6 giây)
        // onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: snackbarSeverity === "success" ? "green" : "red",
          }}
          message={snackbarMessage}
        />
      </Snackbar>

      {/* Snackbar end */}

      {/* Add pop-up start */}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "30%",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Add New Penalty Ticket
          </h3>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "0.3rem",
            }}
            onChange={handleFormChange}
          />
          <TextField
            name="content"
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{
              marginTop: "0.3rem",
            }}
            onChange={handleFormChange}
          />
          <TextField
            name="status"
            label="Status"
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "0.3rem",
            }}
            value={"Pending"}
            readOnly
          />
          {guardInfo && (
            <TextField
              label="Created By Guard ID"
              name="createdByGuardId"
              variant="outlined"
              fullWidth
              value={guardInfo.guardId}
              sx={{
                marginTop: "0.3rem",
              }}
              readOnly
            />
          )}
          {/* <TextField
            select
            name="studentId"
            label="Student"
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "0.3rem",
            }}
            value={selectedStudent}
            onChange={handleStudentChange}
          >
            {students.map((student) => (
              <MenuItem key={student.studentId} value={student.studentId}>
                {student.studentId}
              </MenuItem>
            ))}
          </TextField> */}
          <Autocomplete
            value={selectedStudent}
            onChange={handleStudentChange}
            options={students}
            getOptionLabel={(option) => option.studentId.toString()}
            renderInput={(params) => (
              <TextField
                {...params}
                name="studentId"
                label="Student"
                variant="outlined"
                fullWidth
                sx={{
                  marginTop: "0.3rem",
                }}
              />
            )}
          />

          <Button
            onClick={handleAddTicket}
            sx={{
              marginTop: "1rem",
              color: "#FFF",
              backgroundColor: "#FF5000",
              "&:hover": {
                backgroundColor: "#FF2000",
                borderColor: "#FF2000",
                boxShadow: "none",
              },
            }}
          >
            Add
          </Button>
        </div>
      </Modal>
      {/* Add pop-up end */}

      <div
        style={{
          backgroundColor: "#034EA2",
          padding: "6px",
          borderRadius: "15px",
          marginBottom: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
            textTransform: "uppercase",
            margin: "0",
          }}
        >
          Penalty Ticket
        </h1>
      </div>

      <Box flex sx={{ margin: "1.5rem" }}>
        <Search sx={{ display: "inline-block" }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            inputProps={{ "aria-label": "search" }}
            sx={{
              border: "5px solid orangered",
              borderRadius: "30px",
            }}
          />
        </Search>
      </Box>

      <Button
        variant="contained"
        sx={{
          color: "#FFF",
          backgroundColor: "#FF5000",
          "&:hover": {
            backgroundColor: "#FF2000",
            borderColor: "#FF2000",
            boxShadow: "none",
          },
        }}
        startIcon={<AddIcon />}
        onClick={handleOpen} // Mở pop-up khi nút được ấn
      >
        Add
      </Button>

      <BasicTable data={data.content} />
      <div>
        <Pagination
          count={data.totalPages}
          color="primary"
          page={data.number + 1}
          onChange={handlePageChange}
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
            my: 8,
          }}
        />
      </div>
    </div>
  );
}

export default PenaltyTicket;
