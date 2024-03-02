import styled from "styled-components";

const EventTitle = styled("input")`
  padding: 8px 14px;
  font-size: 0.85rem;
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddd;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const EventBody = styled("textarea")`
  padding: 8px 14px;
  font-size: 0.85rem;
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

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
