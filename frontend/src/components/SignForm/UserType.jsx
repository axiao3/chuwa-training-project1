/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

export default function UserType(props) {
  const [customer, setCustomer] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userTypeTouched, setUserTypeTouched] = useState(false);

  const handleToggleType = (e) => {
    setUserTypeTouched(true);
    if (e.target.id === "customer") {
      setCustomer(!customer);
      setAdmin(false);
    } else if (e.target.id === "admin") {
      setAdmin(!admin);
      setCustomer(false);
    }
  };
  useEffect(() => {
    const type = customer ? "customer" : admin ? "admin" : null;
    props.handleUserType(type);
  }, [customer, admin]);

  const warning = (userTypeTouched && !customer && !admin) ? "User type is required!" : null;

  return (
    <div className="user-type">
      <div>
        <div>
          <input
            type="checkbox"
            id="customer"
            onChange={handleToggleType}
            checked={customer}
          />
          <label htmlFor="customer">Customer</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="admin"
            onChange={handleToggleType}
            checked={admin}
          />
          <label htmlFor="admin">Admin</label>
        </div>
      </div>
      <p style={{ color: "#FC5A44" }}>{warning}</p>
    </div>
  );
}
