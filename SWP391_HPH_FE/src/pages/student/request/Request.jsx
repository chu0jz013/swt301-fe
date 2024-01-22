import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
export default function Request() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [requestTypeId, setRequestTypeId] = useState("");
  const [types, setTypes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [reload, setReload] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState({
    successOpen: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, successOpen } = snackBarOpen;
  const handleInputContent = (e) => {
    setInputText(e.target.value);
    console.log(e.target.value);
  };
  const handleSendRequest = () => {
    console.log(inputText);
    const request = {
      student: {
        studentId: user.studentId,
      },
      requestApplicationType: {
        requestApplicationTypeId: requestTypeId,
      },
      requestContent: inputText,
    };
    privateAxios.post("request-application", request).then(() => {
      setOpen(!open);
      setInputText("");
      setSnackBarOpen({ ...snackBarOpen, successOpen: true });
      setReload(!reload);
    });
  };
  const handleChange = (e) => {
    setRequestTypeId(e.target.value);
    console.log(e.target.value);
  };
  const fetchData = async () => {
    const res1 = await privateAxios.get(
      `request-application?studentId=${user.studentId}&pageNo=${
        currentPage - 1
      }`
    );
    setTotalPages(res1.data.totalPages);
    if (res1 && res1.data) {
      setRequests(res1.data.data);
    }
    const res2 = await privateAxios.get("request-application-type");
    if (res2 && res2.data) {
      setTypes(res2.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [reload, currentPage]);

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
          My Request
        </h2>
      </div>
      <Box display={"flex"} sx={{ justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            bgcolor: "orangered",
            padding: "20px",
            fontWeight: "bold",
            fontSize: "1.25rem",
            borderRadius: "35px",
          }}
        >
          Create Request
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#FF4500" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                ID
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Request Type
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Created Date
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Content
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Response from Manager
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests &&
              requests.map((request) => (
                <TableRow
                  key={request.requestApplicationId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {request.requestApplicationId}
                  </TableCell>
                  <TableCell>{request.requestApplicationTypeName}</TableCell>
                  <TableCell sx={{ whiteSpace: "pre" }}>
                    {request.createdAt}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {request.requestContent}
                  </TableCell>

                  <TableCell
                    sx={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {request.textResponse}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...(request.status.toLowerCase() === "pending" && {
                        color: "#ccb01c",
                      }),
                      ...(request.status.toLowerCase() === "denied" && {
                        color: "red",
                      }),
                      ...(request.status.toLowerCase() === "resolved" && {
                        color: "green",
                      }),
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {request.status}
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
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Request</DialogTitle>
        <Box p={3}>
          <FormControl fullWidth>
            <InputLabel id="requestType-label">Request Type</InputLabel>
            <Select
              id="select"
              label="Request Type"
              value={requestTypeId}
              labelId="requestType-label"
              onChange={handleChange}
            >
              {types.map((type) => {
                return (
                  <MenuItem
                    key={type.requestApplicationTypeId}
                    value={type.requestApplicationTypeId}
                  >
                    {type.requestApplicationTypeName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <DialogContent>
          <DialogContentText>
            To send your request, please enter your description of what you want
            to improve.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="My request"
            type="email"
            fullWidth
            multiline
            value={inputText}
            onChange={handleInputContent}
            variant="filled"
            color="success"
            minRows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            sx={{ color: "orangered" }}
          >
            Cancel
          </Button>
          <Button onClick={handleSendRequest} sx={{ color: "orangered" }}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: 500 }}>
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical, horizontal }}
          open={successOpen}
          onClose={() => {
            setSnackBarOpen({ ...snackBarOpen, successOpen: false });
          }}
          message="Send Request Success"
          key={vertical + horizontal}
          ContentProps={{
            sx: {
              bgcolor: "green",
            },
          }}
        />
      </Box>
    </Box>
  );
}
