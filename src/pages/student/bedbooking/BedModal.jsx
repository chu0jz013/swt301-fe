/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { privateAxios } from "../../../service/axios";
import MessageModal from "./MessageModal";
import { useConfirm } from "material-ui-confirm";

export default function BedModal({
  roomId,
  open,
  setOpen,
  studentId,
  semesterId,
}) {
  const [bedList, setBedList] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const [bookedStatus, setBookedStatus] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [reload, setReload] = useState(false);
  const muiConfirm = useConfirm();
  const handleBedClick = (bed) => {
    setSelectedBed(bed);
  };

  const handleConfirm = (bed) => {
    // Handle the confirmation action here
    if (selectedBed) {
      muiConfirm({ title: `Confirmed Booking: ${selectedBed.bedName}?` }).then(
        () => {
          privateAxios
            .post(
              `bed-request/book?studentId=${studentId}&bedId=${bed.id}&semesterId=${semesterId}`
            )
            .then((response) => {
              console.log(response);
              if (response.data.bedRequestId) {
                setBookedStatus(true);
              } else {
                setBookedStatus(false);
              }
              setOpenStatus(true);
              setReload(!reload);
            })
            .catch((error) => {
              setBookedStatus(false);
              setOpenStatus(true);
              setReload(!reload);
            });
        }
      );
    }
  };
  const fetchBed = async () => {
    const res = await privateAxios.get(`room/${roomId}/beds`);
    console.log(res.data);
    if (res.data) setBedList(res.data);
  };
  useEffect(() => {
    fetchBed();
  }, [reload]);
  if (openStatus) {
    return (
      <MessageModal
        open={openStatus}
        setOpen={setOpenStatus}
        status={bookedStatus}
      />
    );
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "80vh", // Set a maximum height to enable scrolling
          }}
        >
          <Grid container spacing={2} sx={{ xs: 12, md: 3 }}>
            {bedList.map((bed) => (
              <Grid item xs={12} textAlign={"center"} key={bed.id} md={4}>
                <div style={{ whiteSpace: "nowrap" }}>Bed: {bed.bedName}</div>
                <div>RollNumber: {bed.rollNumber ? bed.rollNumber : "N/A"}</div>
                <IconButton
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fill:
                        bed.status.toLowerCase() === "vacant"
                          ? "currentColor"
                          : bed.status.toLowerCase() === "reserved"
                          ? "#FFC300"
                          : "red",
                      width: "50px",
                      height: "50px",
                    },
                    cursor:
                      bed.status.toLowerCase() === "occupied" ||
                      bed.status.toLowerCase() === "reserved"
                        ? "not-allowed !important"
                        : "pointer",
                    "&.selected": {
                      "& .MuiSvgIcon-root": {
                        fill:
                          bed.status.toLowerCase() === "vacant" ? "green" : "",
                      },
                    },
                  }}
                  className={selectedBed === bed ? "selected" : ""}
                  onClick={() => handleBedClick(bed)}
                >
                  <SingleBedIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          {selectedBed && (
            <div>
              <Typography variant="h6">
                Selected Bed: {selectedBed.bedName.toUpperCase()}
              </Typography>
              <Typography
                variant="body1"
                color={
                  selectedBed.status.toLowerCase() === "vacant"
                    ? "green"
                    : selectedBed.status.toLowerCase() === "reserved"
                    ? "#FFC300"
                    : "red"
                }
              >
                Status: {selectedBed.status.toUpperCase()}
              </Typography>
              <Button
                disabled={
                  selectedBed.status.toLowerCase() !== "vacant" ? true : false
                }
                variant="contained"
                color="primary"
                onClick={() => handleConfirm(selectedBed)}
              >
                Book
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
