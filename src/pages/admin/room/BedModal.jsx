/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import { privateAxios } from "../../../service/axios";

export default function BedModal({
  roomId,
  open,
  setOpen,
  // studentId,
  // semesterId,
}) {
  const [bedList, setBedList] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);
  const handleBedClick = (bed) => {
    setSelectedBed(bed);
  };

  // const handleConfirm = (bed) => {
  //   // Handle the confirmation action here
  //   if (selectedBed && confirm(`Confirmed Booking: ${selectedBed.bedName}?`)) {
  //     privateAxios.post(
  //       `bed-request?studentId=${studentId}&bedId=${bed.id}&semesterId=${semesterId}`
  //     );
  //     // You can perform further actions here, e.g., submit data or update the state.
  //   }
  // };
  const fetchBed = async () => {
    const res = await privateAxios.get(`room/${roomId}/beds`);
    if (res.data) setBedList(res.data);
  };
  useEffect(() => {
    fetchBed();
  }, []);
  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "80vh", // Set a maximum height to enable scrolling
          }}
        >
          <Grid container spacing={0} sx={{ xs: 12, md: 4 }}>
            {bedList.map((bed) => (
              <Grid
                item
                xs={12}
                md={3}
                textAlign={"center"}
                key={bed.id}
                sx={{
                  "&.selected": {
                    border:
                      bed.status.toLowerCase() === "occupied"
                        ? "1px solid red"
                        : bed.status.toLowerCase() === "reserved"
                        ? "1px solid yellow"
                        : "1px solid green",
                    borderRadius: "15px",
                  },
                }}
                className={selectedBed === bed ? "selected" : ""}
              >
                <Typography
                  sx={{
                    "&.selected": {
                      color:
                        bed.status.toLowerCase() === "occupied"
                          ? "red"
                          : bed.status.toLowerCase() === "reserved"
                          ? "yellow"
                          : "green",
                    },
                  }}
                  className={selectedBed === bed ? "selected" : ""}
                >
                  {bed.bedName}
                </Typography>
                <IconButton
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fill:
                        bed.status.toLowerCase() === "vacant"
                          ? "green"
                          : bed.status.toLowerCase() === "reserved"
                          ? "yellow"
                          : "red",
                      width: "50px",
                      height: "50px",
                    },
                    cursor:
                      bed.status === "occupied" || bed.status === "reserved"
                        ? "not-allowed"
                        : "pointer",
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
              <Typography variant="h6" p={1}>
                Selected Bed: {selectedBed.bedName}
              </Typography>
              <Typography variant="body1" p={1}>
                Status:
                <span
                  style={{
                    color:
                      selectedBed.status.toLowerCase() === "occupied"
                        ? "red"
                        : selectedBed.status.toLowerCase() === "reserved"
                        ? "yellow"
                        : "green",
                  }}
                >
                  &nbsp; &nbsp; &nbsp; {selectedBed.status.toUpperCase()}
                </span>
              </Typography>
              <Typography p={1}>
                Student in:{" "}
                {selectedBed.rollNumber ? selectedBed.rollNumber : "N/A"}
              </Typography>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() => handleConfirm(selectedBed)}
              >
                Book
              </Button> */}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
