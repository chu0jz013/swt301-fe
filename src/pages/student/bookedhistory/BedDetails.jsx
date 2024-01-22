/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";

export default function BedDetails({ open, setOpen, bed }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        {" "}
        <div
          style={{
            backgroundColor: "#034EA2",
            borderRadius: "8px",
            padding: "5px",
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Bed Detail
        </div>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            Name:
          </Grid>
          <Grid item xs={9}>
            {bed.bedName}
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            Dorm:
          </Grid>
          <Grid item xs={9}>
            {bed.buildingName}
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            Room:
          </Grid>
          <Grid item xs={9}>
            {bed.roomName}
          </Grid>
          <Grid item xs={3} sx={{ fontWeight: "bolder" }}>
            Room Type:
          </Grid>
          <Grid item xs={9}>
            {bed.roomTypeName}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
