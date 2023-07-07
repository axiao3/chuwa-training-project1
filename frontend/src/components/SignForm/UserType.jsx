import React, { useState, useEffect } from "react";

export default function UserType(props) {
  const [customer, setCustomer] = useState(false);
  const [admin, setAdmin] = useState(false);
  const handleToggleType = (e) => {
    if (e.target.id === "customer") {
      setCustomer(!customer);
      setAdmin(false);
    } else if (e.target.id === "admin") {
      setAdmin(!admin);
      setCustomer(false);
    }
  };
  useEffect(() => {
    const type = customer ? customer : admin ? admin : null;
    props.handleUserType(type);
  }, [customer, admin]);

  return (
    <div>
      <input
        type="checkbox"
        id="customer"
        onChange={handleToggleType}
        checked={customer}
      />
      <label htmlFor="customer">Customer</label>
      <input
        type="checkbox"
        id="admin"
        onChange={handleToggleType}
        checked={admin}
      />
      <label htmlFor="admin">Admin</label>
      <p style={{color:"red"}}>{props.warning}</p>
    </div>
  );
}
