/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function MessageModal({ status, open, setOpen }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (status) {
      setMessage("Your booked request have been received!");
    } else {
      setMessage("Failed to send booked request");
    }
  }, []);
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>
          <p style={{ color: status ? "green" : "red" }}>
            {status ? "Booked Success" : "Booked Failed"}
          </p>
        </DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Link to={"/student/bookedhistory"} sx={{ textAlign: "center" }}>
            Check your booking request
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
