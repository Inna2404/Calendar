import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function SizeCheckbox() {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    // Зберігаємо значення чекбокса в локальне сховище
    localStorage.setItem("checkbox", JSON.stringify(newChecked));
  };

  useEffect(() => {
    // витягуємо значення  з локального сховища
    const storedValue = localStorage.getItem("checkbox");
    if (storedValue !== null) {
      setChecked(JSON.parse(storedValue));
    }
  }, []);

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={handleCheck}
        size="small"
        inputProps={{ "aria-label": "Checkbox demo" }}
        color="default"
      />
    </div>
  );
}