import React from "react";

export function Input({ value, onChange, placeholder, type = "text" }) {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} />;
}
