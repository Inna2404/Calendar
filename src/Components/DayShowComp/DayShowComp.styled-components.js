import styled from "styled-components";

export const DayShowWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;
`;
export const EventsListWrapper = styled("div")`
  background-color: #1e1f21;
  color: #dddd;
  flex-grow: 1;
`;

export const EventListItemWrapper = styled("li")`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;

export const EventItemWrapper = styled("button")`
  position: relative;
  display: flex;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;

export const EventFormWrapper = styled("div")`
  background-color: #27282a;
  color: #ffff;
  width: 300px;
  position: relative;
  border-left: 1px solid #464648;
`;
export const NoEventMsg = styled("div")`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

export const TitleText = styled("div")`
  padding-top: 12px;
  text-align: center;
`;
export const WrappButtonList = styled("div")`
  display: flex;
  justify-content: flex-end;
`;
