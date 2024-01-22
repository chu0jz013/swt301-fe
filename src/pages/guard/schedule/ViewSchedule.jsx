import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "react-bootstrap";

const events = [
  {
    title: "TRỰC DOM A",
    start: "2023-10-13T08:00:00",
    end: "2023-10-13T16:00:00",
  },
  {
    title: "TRỰC DOM B",
    start: "2023-10-13T24:00:00",
    end: "2023-10-14T08:00:00",
  },
  // Add more events here
];

function ViewSchedule() {
  return (
    <Container style={{ marginBottom: "20px", marginTop: "20px" }}>
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
          Your Schedule
        </h1>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "timeGridWeek",
        }}
        height="90vh"
        slotDuration="08:00:00"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        allDaySlot={false}
        slotLabelContent={(arg) => {
          // Modifie labels here
          if (arg.text === "08:00") {
            return <div style={{ height: "25vh" }}>Shift 2: 08h00 - 16h00</div>;
          } else if (arg.text === "16:00") {
            return <div style={{ height: "25vh" }}>Shift 3: 16h00 - 00h00</div>;
          } else if (arg.text === "24:00") {
            return <div style={{ height: "25vh" }}>Shift 1: 00h00 - 08h00</div>;
          } else {
            return "";
          }
        }}
        events={events} // Put events list into here
        eventDisplay="auto"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        eventContent={(eventInfo) => {
          return (
            <div>
              <b>{eventInfo.timeText}</b>
              <p>{eventInfo.event.title}</p>
              <p>{eventInfo.event.extendedProps.description}</p>
            </div>
          );
        }}
      />
    </Container>
  );
}

export default ViewSchedule;
