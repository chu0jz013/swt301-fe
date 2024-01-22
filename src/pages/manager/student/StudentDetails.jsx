import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableCell,
  TableRow,
} from "@mui/material";
// import Searchbar from "../../../components/Searchbar";
// import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import avatarLong from "../../../assets/image/avatar.png";
import avatarTuan from "../../../assets/image/avatar-1.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { privateAxios } from "../../../service/axios";

// const { Search, SearchIconWrapper, StyledInputBase } = Searchbar;

export default function StudentDetail() {
  const { rollNumber } = useParams();
  const navigate = useNavigate();
  console.log(rollNumber);
  const [student, setStudent] = useState({});
  const fetchStudentData = async () => {
    const res = await privateAxios.get(`student/${rollNumber}`);
    setStudent(res.data);
  };

  useEffect(() => {
    fetchStudentData();
  }, []);
  return (
    <Box p={2}>
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
          Student Detail
        </h1>
      </div>
      <Grid container spacing={4}>
        {/* Student Card start */}
        <Grid item xs={9} md={9}>
          <Card>
            <CardContent>
              <div style={{ display: "flex" }}>
                <Avatar
                  sx={{ width: 350, height: 400, marginRight: 4 }}
                  src={rollNumber == "HE173334" ? avatarTuan : avatarLong}
                />
                <Table>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Roll Number
                    </TableCell>
                    <TableCell align="right">{student.rollNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Name
                    </TableCell>
                    <TableCell align="right">
                      {student.userDto?.fullName}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Parent Name
                    </TableCell>
                    <TableCell align="right">{student.parentName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Gender
                    </TableCell>
                    <TableCell align="right">
                      {student.userDto?.gender}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Date of birth
                    </TableCell>
                    <TableCell align="right">{student.userDto?.dob}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Phone Number
                    </TableCell>
                    <TableCell align="right">
                      {student.userDto?.phone}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Email
                    </TableCell>
                    <TableCell align="right">
                      {student.userDto?.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" sx={{ fontWeight: "bolder" }}>
                      Address
                    </TableCell>
                    <TableCell align="right">
                      {student.userDto?.address}
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* Student Card end */}
        <Grid item xs={3} md={3}>
          <Button
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={() => {
              if (rollNumber) navigate("payment");
            }}
          >
            View payment
          </Button>
          <br />
          <Button
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={() => {
              if (rollNumber) navigate("request");
            }}
          >
            View request
          </Button>
          <br />
        </Grid>
      </Grid>
    </Box>
  );
}
