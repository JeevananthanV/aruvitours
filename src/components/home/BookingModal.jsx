import React from "react";

export default function BookingModal({ open, onClose, initialDest }) {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>Book a Trip</h2>
          <button style={styles.close} onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>
         <div style={styles.body}>
          <p style={{ color: "var(--gold-light)", fontStyle: "italic", marginBottom: "10px" }}>Destination: {initialDest || "Not selected"}</p>
          <form style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <input type="text" id="name" name="name" required style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email Address</label>
              <input type="email" id="email" name="email" required style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
              <label htmlFor="date" style={styles.label}>Travel Dates</label>
              <input type="text" id="date" name="date" placeholder="DD/MM/YYYY - DD/MM/YYYY" style={styles.input} />
            </div>
            <button type="submit" style={styles.submit}>Submit Booking Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    opacity: 1,
    transition: "opacity 0.3s ease",
  },
  modal: {
    backgroundColor: "#111111",
    border: "1px solid rgba(201, 168, 76, 0.3)",
    borderRadius: "16px",
    padding: "30px",
    width: "90%",
    maxWidth: "500px",
    color: "#FFFFFF",
    boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(201,168,76,0.15)",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  close: {
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#C9A84C",
    transition: "color 0.3s",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  form: {
    display: "grid",
    gap: "20px",
    marginTop: "10px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#E8D08A",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  input: {
    backgroundColor: "#1A1A1A",
    border: "1px solid rgba(201, 168, 76, 0.25)",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "#FFFFFF",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  submit: {
    background: "linear-gradient(135deg, #C9A84C, #8B6914)",
    color: "#0A0A0A",
    border: "none",
    padding: "14px",
    borderRadius: "8px",
    fontWeight: "600",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 8px 24px rgba(201,168,76,0.25)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
};