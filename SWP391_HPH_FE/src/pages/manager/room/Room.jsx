import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { privateAxios } from "../../../service/axios";
import BedModal from "./BedModal";
export default function Room() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [semester, setSemester] = useState("");
  const [buildingList, setBuildingList] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [floorList, setFloorList] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [roomTypeList, setRoomTypeList] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSemester = async () => {
    const res = await privateAxios.get("semester/next-semester");
    setSemester(res.data);
  };
  const fetchBuilding = async () => {
    const res = await privateAxios.get("building");
    setBuildingList(res.data);
  };
  const fetchFloor = async () => {
    const res = await privateAxios.get(`building/${selectedBuilding}`);
    setFloorList(res.data.floors);
  };
  const fetchRoomType = async () => {
    const res = await privateAxios.get(`room-type`);
    setRoomTypeList(res.data);
  };
  const fetchRoom = async () => {
    let filterQuery = "";

    if (selectedBuilding) filterQuery += `&buildingId=${selectedBuilding}`;
    if (selectedFloor) filterQuery += `&floor=${selectedFloor}`;
    if (selectedRoomType) filterQuery += `&roomTypeId=${selectedRoomType}`;
    try {
      const res = await privateAxios.get(
        `room?pageNo=${currentPage - 1}${filterQuery}`
      );
      console.log(res.data);
      setRoomList(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setRoomList([]);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBuilding();
    fetchRoomType();
    fetchSemester();
  }, []);
  useEffect(() => {
    if (selectedBuilding) {
      fetchFloor();
      if (selectedFloor) {
        setSelectedFloor(1);
      }
    }
  }, [selectedBuilding, currentPage]);
  useEffect(() => {
    setCurrentPage(1);
    fetchRoom();

    console.log(roomList);
  }, [selectedFloor, selectedBuilding, selectedRoomType]);

  useEffect(() => {
    fetchRoom();
  }, [currentPage]);
  useEffect(() => {
    if (selectedRoom !== "") {
      setOpen(true);
    }
  }, [selectedRoom]);
  return (
    <Box p={1}>
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
          Room
        </h2>
      </div>

      <Divider variant="middle" sx={{ marginBottom: 2 }} />
      <Grid
        container
        spacing={2}
        p={1}
        justifyContent="center"
        sx={{
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Grid item container xs={12} md={8} spacing={2}>
          {roomList.map((room) => (
            <Grid item xs={12} md={6} key={room.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  display: "inline-block",
                  width: "100%",
                  border: "1px solid #fff",
                  bgcolor:
                    room.numberOfAvailableBeds !== 0 ? "#D4EFDF" : "#F5B7B1",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    backgroundImage: `url("https://img.freepik.com/free-vector/student-bedroom-dormitory-with-bunk-bed-desk-chair_88138-1025.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(1px) brightness(60%) ",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                ></div>
                <CardActionArea
                  onClick={() => {
                    setSelectedRoom(room.id);
                    setOpen(true);
                  }}
                >
                  <CardContent sx={{ color: "#fff", fontWeight: "bold" }}>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        Room Name:
                      </Grid>
                      <Grid item xs={12} md={6} sx={{ fontWeight: "lighter" }}>
                        {room.roomName}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Building Name:
                      </Grid>
                      <Grid item xs={12} md={6} sx={{ fontWeight: "lighter" }}>
                        {room.buildingName}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Room Type:
                      </Grid>
                      <Grid item xs={12} md={6} sx={{ fontWeight: "lighter" }}>
                        {room.roomTypeName}
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Price
                      </Grid>
                      <Grid item xs={12} md={6} sx={{ fontWeight: "lighter" }}>
                        <div>
                          {room.roomPrice.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        Available Bed:
                      </Grid>
                      <Grid item xs={12} md={6} sx={{ fontWeight: "lighter" }}>
                        {room.numberOfAvailableBeds}
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            gap={2}
            mb={2}
          >
            <Typography
              flexGrow={1}
              textAlign={"center"}
              mx={1}
              variant="h6"
              color={"orangered"}
              sx={{
                fontWeight: "bold",
                fontStyle: "italic",
                color: "orangered",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* Semester: {semester.semesterName} */}
              Filter by:
            </Typography>
            <FormControl sx={{ width: 250 }}>
              <Select
                displayEmpty
                value={selectedRoomType}
                onChange={(e) => {
                  setSelectedRoomType(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em style={{ color: "#666" }}>Select a room type</em>
                </MenuItem>
                {roomTypeList &&
                  roomTypeList.map((roomType) => (
                    <MenuItem
                      key={roomType.roomTypeId}
                      value={roomType.roomTypeId}
                    >
                      {roomType.roomTypeName}&nbsp;&nbsp;- &nbsp;
                      {roomType.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 250 }}>
              <Select
                displayEmpty
                value={selectedBuilding}
                onChange={(e) => {
                  setSelectedBuilding(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em style={{ color: "#666" }}>Select a building</em>
                </MenuItem>
                {buildingList.map((building) => (
                  <MenuItem
                    key={building.buildingId}
                    value={building.buildingId}
                  >
                    {building.buildingName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: 250 }}>
              <Select
                displayEmpty
                value={selectedFloor}
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em style={{ color: "#666" }}>Select a floor</em>
                </MenuItem>
                {floorList &&
                  floorList.map((floor, index) => (
                    <MenuItem key={index} value={floor}>
                      {floor}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
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
        <BedModal
          open={open}
          setOpen={setOpen}
          roomId={selectedRoom}
          studentId={user.studentId}
          semesterId={semester.semesterId}
        />
      )}
    </Box>
  );
}
