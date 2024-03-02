import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import CalendarCet from "./Components/CalendarCet";
import styled from "styled-components";
import CalendarDate from "./Components/CalendarDateModal";
import DayShowComp from "./Components/DayShowComp";
import { ButtonWrap } from "./Container/StyledComponents";
import { FetcHandler } from "./Components/FetchHandler";
import { RemoveHandler } from "./Components/RemoveHandler";
import { FormBody } from "./Components/FormBody";

const CalendarWrap = styled.div`
  min-width: 850px;
  height: 609px;
  border-top: 1px solid #757575;
  border-left: 1px solid #757575;
  border-right: 1px solid #757575;
  border-bottom: 2px solid #757575;
  box-shadow: 0 0 0 1px #757575, 0 5px 15px 3px #888;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const FormPositionWrap = styled("div")`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrap = styled(CalendarWrap)`
  width: 320px;
  min-width: 320px;
  height: 250px;
  background-color: #1e1f21;
  color: #dddd;
  box-shadow: unset;
`;

const EventListWrap = styled("ul")`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`;

const EventItemWrap = styled("button")`
  position: relative;
  // overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 113px;
  text-align: left;
  border: unset;
  background: unset;
  color: #dddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

const url = "http://localhost:5000";
const defaultEvent = {
  title: "",
  description: "",
  date: new Date().toLocaleString("en-Us")
};

function App() {
  const [displayMode, setDisplayMode] = useState("month");

  const [event, setEvent] = useState(null);
  const [isShowForm, setIsShowForm] = useState(false);
  const [method, setMethod] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const currentMonth = currentDate.toLocaleString("en-Us", {
    month: "long"
  });

  const currentYear = currentDate.getFullYear();

  const prevHandler = () => {
    const newDate = new Date(currentDate);
    if (displayMode === "month") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (displayMode === "day") {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };
  const todayHandler = () => {
    setCurrentDate(new Date());
  };

  const nextHandler = () => {
    const newDate = new Date(currentDate);
    if (displayMode === "month") {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (displayMode === "day") {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const currentYearsUnix = new Date().getFullYear();
  const startYear = currentYearsUnix - 5;
  const endYear = currentYearsUnix + 5;

  const startDateQuery = new Date(startYear, 0, 1);
  const endDateQuery = new Date(endYear, 11, 31, 23, 59, 59);

  const startDateQueryUnix = Math.floor(startDateQuery.getTime() / 1000);
  const endDateQueryUnix = Math.floor(endDateQuery.getTime() / 1000);
  useEffect(() => {
    // console.log("startDateQueryUnix", startDateQueryUnix);
    // console.log("endDateQueryUnix", endDateQueryUnix);

    fetch(
      `${url}/events?date_gte=${startDateQueryUnix}&date_lte=${endDateQueryUnix}`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Response", res);
        setEvents(res);
      });
  }, [currentDate, startDateQueryUnix, endDateQueryUnix]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setEvent(
      eventForUpdate || {
        ...defaultEvent,
        date: Math.floor(dayItem.getTime() / 1000)
      }
    );
    setMethod(methodName);
    setSelectedDay(dayItem);
  };

  const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
    console.log("openFormHandler :", methodName);
    setIsShowForm(true);

    openFormHandler(methodName, eventForUpdate, dayItem);
  };

  const canselButtonHandler = () => {
    setIsShowForm(false);
    setEvent(null);
  };

  const changeEvent = (text, field) => {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text
    }));
  };

  const eventFetcHandler = () => {
    FetcHandler(method, event, setEvents, events, `${url}/events`)
      .then(() => canselButtonHandler())
      .catch((error) => {
        console.error("Event Fetch Error:", error);
      });
  };

  const removeEventHandler = () => {
    RemoveHandler(`${url}/events`, event, setEvents)
      .then(() => canselButtonHandler())
      .catch((error) => {
        console.error("Event Fetch Error:", error);
      });
  };

  return (
    <>
      {isShowForm ? (
        <FormPositionWrap onClick={canselButtonHandler}>
          <FormWrap onClick={(e) => e.stopPropagation()}>
            <FormBody data={event} setItem={setEvent} />
            <EventListWrap>
              {events
                .filter((event) => {
                  const eventDate = new Date(+event.date * 1000);
                  return (
                    eventDate.getDate() === selectedDay.getDate() &&
                    eventDate.getMonth() === selectedDay.getMonth()
                  );
                })
                .map((event) => (
                  <li key={event.id}>
                    <EventItemWrap
                      onDoubleClick={() =>
                        openFormHandler("Update", event, selectedDay)
                      }
                    >
                      {event.title}
                    </EventItemWrap>
                  </li>
                ))}
            </EventListWrap>
            <ButtonWrap>
              <button onClick={canselButtonHandler}>Cancel</button>
              <button onClick={eventFetcHandler}>{method}</button>
              {method === "Update" ? (
                <button onClick={removeEventHandler}>Remove</button>
              ) : null}
            </ButtonWrap>
          </FormWrap>
        </FormPositionWrap>
      ) : null}

      <CalendarWrap>
        <Header />
        <CalendarDate
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
          currentDay={currentDate.getDate()}
        />
        {displayMode === "month" ? (
          <CalendarCet
            currentDate={currentDate}
            events={events}
            openForm={openModalFormHandler}
          />
        ) : null}

        {displayMode === "day" ? (
          <DayShowComp
            currentDate={currentDate}
            selectedEvent={event}
            canselButtonHandler={canselButtonHandler}
            changeEvent={changeEvent}
            method={method}
            openFormHandler={openFormHandler}
            // setMethod={setMethod}
          />
        ) : null}
      </CalendarWrap>
    </>
  );
}

export default App;
