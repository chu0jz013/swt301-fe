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
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import Payment from "./Payment";
import SearchIcon from "@mui/icons-material/Search";
import Searchbar from "../../../components/Searchbar";
const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

export default function BedRequest() {
  const [bookedList, setBookedList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedBedReq, setSelectedBedReq] = useState("");
  const [searchRollnumber, setSearchRollnumber] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchSemester = async () => {
    try {
      const res = await privateAxios.get(`semester`);
      console.log(res.data);
      setSemesters(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    let filter = "";

    if (selectedSemester !== "" && selectedSemester !== "all")
      filter += "&semesterId=" + selectedSemester;
    if (selectedStatus !== "" && selectedStatus !== "all")
      filter += "&status=" + selectedStatus;
    try {
      const res = await privateAxios.get(
        `bed-request?pageNo=${
          currentPage - 1
        }&studentRollNumber=${searchRollnumber}${filter}`
      );
      console.log(res.config.url);
      console.log(res.data);
      setBookedList(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSemester();
    fetchData();
  }, [currentPage, searchRollnumber, selectedSemester, selectedStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchRollnumber, selectedSemester, selectedStatus]);
  return (
    <Box padding={2}>
      <Box>
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
            Bed Request
          </h1>
        </div>
      </Box>
      <Box m={2}>
        {/* Filter start */}
        <Box display={"flex"} justifyContent={"right"} gap={2} mb={2}>
          <Search sx={{ display: "inline-block" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={(e) => {
                setSearchRollnumber(e.target.value);
              }}
              placeholder="Search by rollnumber…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                border: "5px solid orangered",
                borderRadius: "30px",
                minWidth: "250px",
              }}
            />
          </Search>
          <Typography
            flexGrow={1}
            textAlign={"right"}
            mx={1}
            variant="h6"
            color={"orangered"}
            sx={{
              fontWeight: "bold",
              fontStyle: "italic",
              color: "orangered",
              transform: "translateY(10px)",
            }}
          >
            Filter by:
          </Typography>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel id="semester-label">Semester</InputLabel>
            <Select
              labelId="semester-label"
              label="Semester"
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <MenuItem value="all">ALL</MenuItem>
              {semesters.map((semester) => (
                <MenuItem value={semester.semesterId} key={semester.semesterId}>
                  {semester.semesterName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: 180 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              label="Status"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="all">ALL</MenuItem>
              <MenuItem value="pending">PENDING</MenuItem>
              <MenuItem value="approved">APPROVED</MenuItem>
              <MenuItem value="rejected">REJECTED</MenuItem>
              <MenuItem value="expired">EXPIRED</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Filter end */}
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#FF5800" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Student Rollnumber
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Bed
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Semester
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Dorm
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Room
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Room Type
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Created Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Updated Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Status
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "#fff" }}>
                Payment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedList.map((bookedRequest) => (
              <TableRow
                key={bookedRequest.bedRequestId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {bookedRequest.bedRequestId}
                </TableCell>
                <TableCell>{bookedRequest.studentRollNumber}</TableCell>
                <TableCell>{bookedRequest.bedName}</TableCell>
                <TableCell>{bookedRequest.semesterName}</TableCell>
                <TableCell>{bookedRequest.buildingName}</TableCell>
                <TableCell>{bookedRequest.roomName}</TableCell>
                <TableCell>{bookedRequest.roomTypeName}</TableCell>
                <TableCell>{bookedRequest.createdAt}</TableCell>
                <TableCell>
                  {bookedRequest.status.toLowerCase() === "approved" ||
                  bookedRequest.status.toLowerCase() === "expired"
                    ? bookedRequest.updatedAt
                    : "N/A"}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      bookedRequest.status.toLowerCase() === "expired" ||
                      bookedRequest.status.toLowerCase() === "rejected"
                        ? "red"
                        : bookedRequest.status === "pending"
                        ? "#FFC300 "
                        : "green",
                    fontWeight: "bold",
                  }}
                >
                  {bookedRequest.status.toUpperCase()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setSelectedBedReq(bookedRequest.bedRequestId);
                      setOpen(true);
                    }}
                  >
                    Payment
                  </Button>

                  {/* {bookedRequest.status.toLowerCase() === "pending" && (
                    <IconButton
                      // data-itemID={bookedRequest.bedRequestId}
                      onClick={() =>
                        handleCanelBooking(bookedRequest.bedRequestId)
                      }
                    >
                      <Remove />
                    </IconButton>
                  )} */}
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
      {open && (
        <Payment open={open} setOpen={setOpen} bedRequestId={selectedBedReq} />
      )}
    </Box>
  );
}
