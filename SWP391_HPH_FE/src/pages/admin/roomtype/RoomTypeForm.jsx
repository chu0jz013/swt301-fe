import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import { Close } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { privateAxios } from "../../../service/axios";
const getInitialValue = (roomType) => {
  return {
    roomTypeName: roomType ? roomType.roomTypeName : "",
    roomTypeDescription: roomType ? roomType.roomTypeDescription : "",
    numberOfBeds: roomType ? roomType.numberOfBeds : 0,
    price: roomType ? roomType.price : 0,
  };
};
export default function RoomTypeForm({
  open,
  setOpen,
  roomType,
  reload,
  setReload,
}) {
  const schema = yup.object().shape({
    roomTypeName: yup
      .string()
      .required()
      .test(
        "noWhiteSpace",
        "Room type name cannot contain only white spaces",
        (value) => {
          // Use a regular expression to check if the string contains only white spaces
          return /\S/.test(value);
        }
      ),
    roomTypeDescription: yup
      .string()
      .required()
      .test(
        "noWhiteSpace",
        "Room type description cannot contain only white spaces",
        (value) => {
          // Use a regular expression to check if the string contains only white spaces
          return /\S/.test(value);
        }
      ),
    numberOfBeds: yup.number().moreThan(0).required(),
    price: yup.number().moreThan(0).required(),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: getInitialValue(roomType),
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    if (!roomType) {
      privateAxios
        .post(`room-type`, data)
        .then((res) => {
          console.log(res);
          alert("Create Room Type Successfully!");
          reset(getInitialValue());
          setReload(!reload);
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
          // dispatch(resetForm());
          // reset(getInitialValue());
        });
    } else {
      privateAxios
        .put(`room-type/${roomType.roomTypeId}`, data)
        .then((res) => {
          console.log(res);
          alert("Room Type is Updated Successfully!");
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
                {!roomType ? "Create" : "Edit"} Room Type
              </h3>
            </div>
          </Box>
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              {...register("roomTypeName")}
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              error={!!errors.roomTypeName}
              helperText={errors?.roomTypeName?.message}
            />
            <TextField
              {...register("roomTypeDescription")}
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              error={!!errors.roomTypeDescription}
              helperText={errors?.roomTypeDescription?.message}
            />
            <TextField
              {...register("numberOfBeds")}
              margin="dense"
              label="Number Of Beds"
              type="number"
              fullWidth
              error={!!errors.numberOfBeds}
              helperText={errors?.numberOfBeds?.message}
              disabled={roomType}
            />
            <TextField
              {...register("price")}
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              error={!!errors.price}
              helperText={errors?.price?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">VND</InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              type="submit"
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
            >
              {!roomType ? "Create" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
