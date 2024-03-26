import React from "react";

import { EventTitle, EventBody } from "./FormBody.styled-components";

export const FormBody = ({ data, setItem }) => {
  const changeEvent = (text, field) => {
    setItem((prevState) => ({
      ...prevState,
      [field]: text
    }));
  };
  return (
    <>
      <EventTitle
        value={data.title}
        onChange={(e) => {
          changeEvent(e.target.value, "title");
        }}
        placeholder="Title"
      />
      <EventBody
        value={data.description}
        onChange={(e) => {
          changeEvent(e.target.value, "description");
        }}
        placeholder="Description"
      />
    </>
  );
};
