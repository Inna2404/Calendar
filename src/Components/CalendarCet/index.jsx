import React from "react";
import styled from "styled-components";

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  // padding-right: 9px;
  background-color: ${(props) => (props.isheader ? "#1e1f21" : "#404040")};
  ${(props) => props.isheader && "border-bottom :1px solid #404040"}
`;

const RowCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifycontent ? props.justifycontent : "flex-start"};
  padding-right: ${(props) => `${props.padr || 0}px`};
`;
const DayWrap = styled.div`
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`;

const CellWrap = styled.div`
  min-width: 140px;
  min-height: ${(props) => (props.isheader ? 24 : 80)}px;
  background-color: ${(props) =>
    props["weekendday"] === "true" ? "#272829" : "#1e1f21"};
  color: ${(props) => (props.selectedMonth ? "#dddcdd" : "#555754")};
`;

const CurrentDay = styled(`div`)`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowDayWrap = styled("div")`
  display: flex;
  justify-content: flex-end;
`;

const EventListWrap = styled("ul")`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`;

const EventItemWrap = styled("button")`
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border: unset;
  background: unset;
  color: #dddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

const CalendarCet = ({ currentDate, events, openForm }) => {
  // console.log(events);
  const currentDay = currentDate.getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const startDayOfWeek = firstDayOfMonth.getDay();

  const daysCet = [...Array(42)].map((_, index) => {
    const day = new Date(
      firstDayOfMonth.getTime() +
        (index - startDayOfWeek + 1) * 24 * 60 * 60 * 1000
    );
    return day;
  });

  const selectedMonth = (date) => date.getUTCMonth();

  return (
    <>
      <GridWrap isheader>
        {[...Array(7)].map((_, index) => (
          <CellWrap isheader key={index} selectedMonth>
            <RowCell justifycontent={"flex-end"} padr={8}>
              {daysCet[index].toLocaleDateString("en-US", { weekday: "short" })}
            </RowCell>
          </CellWrap>
        ))}
      </GridWrap>

      <GridWrap>
        {daysCet.map((dayItem) => (
          <CellWrap
            weekendday={(
              dayItem.getDay() === 6 || dayItem.getDay() === 0
            ).toString()}
            key={dayItem.toISOString()}
            selectedMonth={
              selectedMonth(dayItem) === selectedMonth(currentDate)
            }
          >
            <RowCell justifyContent={"flex-end"}>
              <ShowDayWrap>
                <DayWrap
                  onDoubleClick={() => openForm("Create", null, dayItem)}
                >
                  {dayItem.getMonth() === currentDate.getMonth() &&
                  dayItem.getDate() === currentDay ? (
                    <CurrentDay>{dayItem.getDate()} </CurrentDay>
                  ) : (
                    dayItem.getDate()
                  )}
                </DayWrap>
              </ShowDayWrap>

              <EventListWrap>
                {events.filter((event) => {
                  const eventDate = new Date(+event.date * 1000);
                  return (
                    eventDate.getDate() === dayItem.getDate() &&
                    eventDate.getMonth() === dayItem.getMonth()
                  );
                }).length > 0 && (
                  <li>
                    <EventItemWrap
                      onDoubleClick={() => {
                        const [firstEvent] = events;
                        if (firstEvent) {
                          openForm("Update", firstEvent);
                        }
                      }}
                    ></EventItemWrap>
                  </li>
                )}
              </EventListWrap>
            </RowCell>
          </CellWrap>
        ))}
      </GridWrap>
    </>
  );
};
export default CalendarCet;
