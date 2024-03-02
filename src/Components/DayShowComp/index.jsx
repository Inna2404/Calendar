import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { FetcHandler } from "../FetchHandler";
import { ButtonWrap } from "../../Container/StyledComponents";
import SizeCheckboxes from "../CheckBox";
import { RemoveHandler } from "../RemoveHandler";
import { FormBody } from "../FormBody";

const DayShowWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;
`;
const EventsListWrapper = styled("div")`
  background-color: #1e1f21;
  color: #dddd;
  flex-grow: 1;
`;

const EventListItemWrapper = styled("li")`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;

const EventItemWrapper = styled("button")`
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

const EventFormWrapper = styled("div")`
  background-color: #27282a;
  color: #ffff;
  width: 300px;
  position: relative;
  border-left: 1px solid #464648;
`;
const NoEventMsg = styled("div")`
  colox: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const TitleText = styled("div")`
  padding-top: 12px;
  text-align: center;
`;

const DayShowComp = ({
  currentDate,
  selectedEvent,
  canselButtonHandler,
  method,
  openFormHandler
}) => {
  const [list, setList] = useState(null);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const url1 = "http://localhost:5001";

    const startDateQueryUnix = Math.floor(
      new Date(currentDate).setHours(0, 0, 0) / 1000
    );

    const endDateQueryUnix = Math.floor(
      new Date(currentDate).setHours(23, 59, 59, 999) / 1000
    );

    fetch(
      `${url1}/lists?date_gte=${startDateQueryUnix}&date_lte=${endDateQueryUnix}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Response", res);
        setLists(res);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [currentDate]);

  useEffect(() => {
    setList(selectedEvent);
  }, [selectedEvent]);

  const eventFetcHandler = () => {
    const url1 = "http://localhost:5001";
    FetcHandler(method, list, setLists, lists, `${url1}/lists`)
      .then(() => canselButtonHandler())
      .catch((error) => {
        console.error("Event Fetch Error:", error);
      });
  };

  const removeEventHandler = () => {
    const url1 = "http://localhost:5001";
    RemoveHandler(`${url1}/lists`, list, setLists)
      .then(() => canselButtonHandler())
      .catch((error) => {
        console.error("Event Fetch Error:", error);
      });
  };

  return (
    <DayShowWrapper>
      <EventsListWrapper>
        {lists
          .filter((list) => {
            const listtDate = new Date(+list.date * 1000);
            return (
              listtDate.getDate() === currentDate.getDate() &&
              listtDate.getMonth() === currentDate.getMonth() &&
              listtDate.getFullYear() === currentDate.getFullYear()
            );
          })

          .map((list) => (
            <EventListItemWrapper key={list.id}>
              <EventItemWrapper
                onDoubleClick={() => openFormHandler("Update", list)}
              >
                <SizeCheckboxes />
                <TitleText>{list.title}</TitleText>
              </EventItemWrapper>
            </EventListItemWrapper>
          ))}
      </EventsListWrapper>
      <EventFormWrapper>
        {list ? (
          <div>
            <FormBody data={list} setItem={setList} />
            <ButtonWrap>
              <button onClick={canselButtonHandler}>Cancel</button>
              <button onClick={eventFetcHandler}>{method}</button>
              {method === "Update" ? (
                <button onClick={removeEventHandler}>Remove</button>
              ) : null}
            </ButtonWrap>
          </div>
        ) : (
          <>
            <div>
              <button
                onClick={() => openFormHandler("Create", null, currentDate)}
              >
                Create new to do list
              </button>
            </div>
            <NoEventMsg>No list selected</NoEventMsg>
          </>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};

export default DayShowComp;
