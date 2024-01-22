import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";
import ReplyIcon from "@mui/icons-material/Reply";
import { useParams } from "react-router-dom";
export default function StudentRequest() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { rollNumber } = useParams();

  const [studentId, setStudentId] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [openUpdateAppReq, setOpenUpdateAppReq] = useState(false);
  const [requests, setRequests] = useState([]);
  const [requestTypes, setRequestTypes] = useState([]);
  const [reload, setReload] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState({
    successOpen: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [missingFieldErrorMsg, setMissingFieldErrorMsg] = useState({
    missingTextResponse: "",
    missingStatus: "",
  });
  const [selectedReq, setSelectedReq] = useState(null);
  const [formResponseAppReq, setFormResponseAppReq] = useState({
    textResponse: "",
    manager: {
      managerId: user.managerId,
    },
    status: "",
  });
  const { vertical, horizontal, successOpen } = snackBarOpen;
  const [selectedReqType, setSelectedReqType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleChangeAppReqResponse = (event) => {
    // Update the form data when the user enters data in the modal
    const { name, value } = event.target;
    setFormResponseAppReq({
      ...formResponseAppReq,
      [name]: value.trim(),
    });
    setMissingFieldErrorMsg({ missingTextResponse: "", missingStatus: "" });
  };

  const handleSelectedReq = (req) => {
    console.log(req);

    if (
      req.status.toLowerCase() === "denied" ||
      req.status.toLowerCase() === "resolved"
    ) {
      setSnackbarMessage(
        `You cannot reply to a request that was RESOLVE or DENIED!`
      );
      setSnackBarOpen({ ...snackBarOpen, successOpen: true });
    } else {
      setOpenUpdateAppReq(true);
      setSelectedReq(req);
    }
  };

  const handleCloseUpdateAppReq = () => {
    setMissingFieldErrorMsg({ missingTextResponse: "", missingStatus: "" });
    setOpenUpdateAppReq(false);
  };

  const handleSubmitUpdateApplicationRequest = async () => {
    console.log(formResponseAppReq);

    if (formResponseAppReq.textResponse === "") {
      setMissingFieldErrorMsg({
        missingTextResponse: "Missing response content!",
        missingStatus: "",
      });
      return;
    }

    if (formResponseAppReq.status === "") {
      setMissingFieldErrorMsg({
        missingTextResponse: "",
        missingStatus: "Please choose DENIED or RESOLVED",
      });
      return;
    }
    try {
      await privateAxios.put(
        `request-application/${selectedReq.requestApplicationId}`,
        formResponseAppReq
      );

      setSnackBarOpen({ ...snackBarOpen, successOpen: true });
      setSnackbarMessage(
        `Reply to application with Id = ${selectedReq.requestApplicationId} successfully!`
      );
      setReload(!reload);
      setOpenUpdateAppReq(false);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    let filter = "";

    if (selectedReqType !== "") {
      filter += "&requestApplicationTypeId=" + selectedReqType;
    }

    if (selectedStatus !== "") {
      filter += "&status=" + selectedStatus;
    }

    if (rollNumber) {
      filter += "&studentId=" + studentId;
    }

    console.log(`request-application?pageNo=${currentPage - 1}${filter}`);

    const res1 = await privateAxios.get(
      `request-application?pageNo=${currentPage - 1}${filter}`
    );
    setTotalPages(res1.data.totalPages);
    if (res1 && res1.data) {
      setRequests(res1.data.data);
    }

    const res2 = await privateAxios.get(`request-application-type`);
    setRequestTypes(res2.data);

    const res3 = await privateAxios.get(`student/${rollNumber}/user`);
    console.log(res3.data);
    setStudentId(res3.data.studentId);
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus, selectedReqType, reload, currentPage, studentId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, selectedReqType]);

  const handleCloseSnackBar = () => {
    setSnackBarOpen({ ...snackBarOpen, successOpen: false });
  };
  return (
    <Box padding={1}>
      {/* Reply pop-up start */}
      <Snackbar
        open={successOpen}
        onClose={handleCloseSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={
            snackbarMessage.includes("successfully") ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Modal
        open={openUpdateAppReq}
        onClose={handleCloseUpdateAppReq}
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
          <div
            style={{
              backgroundColor: "#034EA2",
              borderRadius: "8px",
              padding: "5px",
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Aplication Reply
          </div>
          <TextField
            name="textResponse"
            label="Enter response..."
            variant="outlined"
            fullWidth
            multiline
            sx={{
              marginTop: "1rem",
            }}
            minRows={4}
            onChange={handleChangeAppReqResponse}
            error={!!missingFieldErrorMsg.missingTextResponse}
            helperText={missingFieldErrorMsg.missingTextResponse}
          />
          <FormControl
            fullWidth
            sx={{ marginTop: "1rem", marginBottom: "1rem" }}
            error={!!missingFieldErrorMsg.missingStatus}
          >
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              name="status"
              onChange={handleChangeAppReqResponse}
            >
              <MenuItem value={"Denied"}>Denied</MenuItem>
              <MenuItem value={"Resolved"}>Resolved</MenuItem>
            </Select>
            <FormHelperText>
              {missingFieldErrorMsg.missingStatus}
            </FormHelperText>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleSubmitUpdateApplicationRequest}
              sx={{
                marginTop: "1rem",
                padding: "8px 20px",
                color: "#FFF",
                backgroundColor: "#FF5000",
                "&:hover": {
                  backgroundColor: "#FF2000",
                  borderColor: "#FF2000",
                  boxShadow: "none",
                },
                fontWeight: "bold",
                fontSize: "1.25rem",
              }}
            >
              <ReplyIcon /> &nbsp; Send
            </Button>
          </Box>
        </div>
      </Modal>
      {/* Reply pop-up end */}

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
          Application Request Management
        </h2>
      </div>
      {/* Filter start */}

      <Box display={"flex"} justifyContent={"right"} gap={2} mb={2}>
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
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            label="Type"
            onChange={(e) => setSelectedReqType(e.target.value)}
          >
            <MenuItem value="">ALL</MenuItem>
            {requestTypes.map((requestType) => (
              <MenuItem
                value={requestType.requestApplicationTypeId}
                key={requestType.requestApplicationTypeId}
              >
                {requestType.requestApplicationTypeName}
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
            <MenuItem value="">ALL</MenuItem>
            <MenuItem value="pending">PENDING</MenuItem>
            <MenuItem value="resolved">RESOLVED</MenuItem>
            <MenuItem value="denied">DENIED</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {/* Filter end */}
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
                Created by
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Request Type
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Created At
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Application Content
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Response Content
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Status
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Updated At
              </TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bolder" }}>
                Action
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
                  <TableCell>
                    {request.studentName} ({request.student.rollNumber})
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
                  <TableCell>{request.textResponse}</TableCell>
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
                  <TableCell>{request.updatedAt}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleSelectedReq(request)}>
                      <ReplyIcon />
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
    </Box>
  );
}
