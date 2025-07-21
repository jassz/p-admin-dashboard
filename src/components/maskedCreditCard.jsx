import React from "react";

const MaskedCreditCard = ({
  cardNumber = "",
  cardHolder = "CARDHOLDER",
  expiry = "MM/YY",
  brand = "Visa",
}) => {
  const last4 = cardNumber.slice(-4);
  const masked = "**** **** **** " + last4;

  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <span style={styles.brand}>{brand}</span>
      </div>

      <div style={styles.number}>{masked}</div>

      <div style={styles.bottomRow}>
        <div>
          {/* <div style={styles.label}>Card Holder</div> */}
          <div>{cardHolder.toUpperCase()}</div>
        </div>
        <div>
          <div style={styles.label}>Expires</div>
          <div>{expiry}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "320px",
    height: "200px",
    borderRadius: "15px",
    padding: "20px",
    background: "linear-gradient(135deg, #2c3e50, #3498db)",
    color: "#fff",
    fontFamily: "'Courier New', Courier, monospace",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
  topRow: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  brand: {
    background: "#fff",
    color: "#2c3e50",
    borderRadius: "5px",
    padding: "2px 6px",
    fontSize: "0.8rem",
  },
  number: {
    fontSize: "1.4rem",
    letterSpacing: "3px",
    margin: "10px 0",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
  },
  label: {
    fontSize: "0.7rem",
    opacity: 0.8,
  },
};

export default MaskedCreditCard;
