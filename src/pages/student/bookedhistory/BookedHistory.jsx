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

import { Button, IconButton, Pagination } from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";

import Payment from "./Payment";
import BedDetails from "./BedDetails";

export default function BookedHistory() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookedList, setBookedList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBedReq, setSelectedBedReq] = useState(null);
  const [status, setStatus] = useState("");
  const [reload, setReload] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openBedDetails, setOpenBedDetails] = useState(false);
  const handleChange = (e) => {
    if (e.target.value === "All") setStatus("");
    else setStatus(e.target.value);
  };
  const handleCanelBooking = (id) => {
    if (confirm(`Room Type ID ${id} will be delete?`)) {
      (async () => {
        await privateAxios.delete(`bed-request/${id}`);
        await fetchData();
      })();
    }
    console.log(id);
  };
  const fetchData = async () => {
    try {
      const res = await privateAxios.get(
        `bed-request?studentRollNumber=${user.studentRollNumber}&page=${
          currentPage - 1
        }`
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
    fetchData();
  }, [currentPage, reload]);
  return (
    <Box padding={1}>
      <div
        style={{
          backgroundColor: "#034EA2",
          padding: "6px",
          borderRadius: "15px",
          marginBottom: "10px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
            textTransform: "uppercase",
            margin: "0",
          }}
        >
          Booked history
        </h2>
      </div>
      <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
        {/* <FormControl sx={{ minWidth: 120, m: 1 }}>
          <InputLabel id="roomType-label">Status</InputLabel>
          <Select
            id="select"
            label="Status"
            value={status === "" ? "All" : status}
            labelId="roomType-label"
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            {statusList.map((type) => {
              return (
                <MenuItem key={type} value={type.toLowerCase()}>
                  {type.toLowerCase()}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#FF4500" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                ID
              </TableCell>
              <TableCell
                colSpan={1}
                sx={{ color: "#fff", fontWeight: "bolder" }}
              >
                Bed
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Created Date
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Returned Date
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
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
                <TableCell>
                  {bookedRequest.bedName}
                  <IconButton
                    onClick={() => {
                      setSelectedBedReq(bookedRequest);
                      setOpenBedDetails(true);
                    }}
                    variant="contained"
                  >
                    <RemoveRedEye />
                  </IconButton>
                </TableCell>
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
                      setSelectedBedReq(bookedRequest);
                      setOpenPayment(true);
                    }}
                  >
                    Payment
                  </Button>
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
      {openPayment && (
        <Payment
          open={openPayment}
          setOpen={setOpenPayment}
          bedRequestId={selectedBedReq.bedRequestId}
        />
      )}
      {openBedDetails && (
        <BedDetails
          open={openBedDetails}
          setOpen={setOpenBedDetails}
          bed={selectedBedReq}
        />
      )}
    </Box>
  );
}
