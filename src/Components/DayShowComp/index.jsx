import React, { useState, useEffect } from "react";

import { FetcHandler } from "../FetchHandler";
import { ButtonWrap } from "../../Container/StyledComponents";
import SizeCheckboxes from "../CheckBox";
import { RemoveHandler } from "../RemoveHandler";
import { FormBody } from "../FormBody";

import {
  DayShowWrapper,
  EventsListWrapper,
  EventListItemWrapper,
  EventItemWrapper,
  EventFormWrapper,
  NoEventMsg,
  TitleText,
  WrappButtonList
} from "./DayShowComp.styled-components";

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
            <WrappButtonList>
              <button
                onClick={() => openFormHandler("Create", null, currentDate)}
              >
                Create new to do list
              </button>
            </WrappButtonList>
            <NoEventMsg>No list selected</NoEventMsg>
          </>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};

export default DayShowComp;
