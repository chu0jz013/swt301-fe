import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Close from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, Select } from "@mui/material";
import { privateAxios } from "../../../service/axios";
export default function RoomForm({
  reload,
  setReload,
  open,
  setOpen,
  room,
  roomTypeList,
  buildingList,
}) {
  const [floorList, setFloorList] = React.useState([]);
  const getInitialValue = (selectedRoom) => {
    return {
      roomName: selectedRoom ? selectedRoom.roomName : "",
      roomTypeId: selectedRoom
        ? selectedRoom.roomTypeId
        : roomTypeList[0].roomTypeId,
      buildingId: selectedRoom
        ? selectedRoom.roomTypeId
        : buildingList[0].buildingId,
      floor: selectedRoom ? selectedRoom.floor : 1,
    };
  };
  const schema = yup.object().shape({
    roomName: yup
      .string()
      .required()
      .test(
        "noWhiteSpace",
        "Room Name cannot contain only white spaces",
        (value) => {
          // Use a regular expression to check if the string contains only white spaces
          return /\S/.test(value);
        }
      ),
    roomTypeId: yup.number().required(),
    buildingId: yup.number().required(),
    floor: yup.number().required(),
  });
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: getInitialValue(room),
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    if (!room) {
      privateAxios
        .post(`room`, data)
        .then((res) => {
          console.log(res);
          alert("Create Room Successfully!");
          reset(getInitialValue());
          setReload(!reload);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          alert("Duplicated Room Name");
          // dispatch(resetForm());
          // reset(getInitialValue());
        });
    } else {
      privateAxios
        .put(`room/${room.roomId}`, data)
        .then((res) => {
          console.log(res);
          alert("Room is Updated Successfully!");
          setReload(!reload);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          // dispatch(resetForm());
          // reset(getInitialValue());
        });
    }
  };
  const fetchFloor = async () => {
    const res = await privateAxios.get(`building/${watch("buildingId")}`);
    setFloorList(res.data.floors);
  };
  React.useEffect(() => {
    fetchFloor();
  }, [watch("buildingId")]);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <span
          style={{ alignSelf: "end", cursor: "pointer" }}
          onClick={() => setOpen(false)}
        >
          <Close />
        </span>
        <DialogTitle>
          <Box>
            <div
              style={{
                backgroundColor: "#034EA2",
                padding: "6px",
                borderRadius: "15px",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#fff",
                  textTransform: "uppercase",
                  margin: "0",
                }}
              >
                {!room ? "Create" : "Edit"} Room
              </h3>
            </div>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register("roomName")}
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              error={!!errors.roomName}
              helperText={errors?.roomName?.message}
            />
            <Controller
              name="roomTypeId"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth sx={{ marginBottom: "4px" }}>
                  {roomTypeList?.map((roomType) => (
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
              )}
            />
            <Controller
              name="buildingId"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth sx={{ marginBottom: "4px" }}>
                  {buildingList.map((building) => (
                    <MenuItem
                      key={building.buildingId}
                      value={building.buildingId}
                    >
                      {building.buildingName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <Controller
              name="floor"
              control={control}
              render={({ field }) => (
                <Select {...field} fullWidth>
                  {floorList &&
                    floorList.map((floor, index) => (
                      <MenuItem key={index} value={floor}>
                        {floor}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
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
              variant="contained"
              type="submit"
            >
              {!room ? "Create" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
