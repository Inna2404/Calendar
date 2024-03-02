import React from "react";
import styled from "styled-components";

const DivWrapp = styled("div")`
  display: flex;
  justify-content: space-between;
  background-color: #1e1f21;
  color: #dcdddd;
  padding: 16px;
  position: relative;
`;

const TextWrapp = styled("span")`
  font-size: 32px;
`;

const TitleWrap = styled(TextWrapp)`
  font-weight: bolt;
  margin-right: 8px;
  margin-left: 8px;
`;

const ButtonsWrap = styled(`div`)`
  display: flex;
  align-items: center;
`;

const ButtonsCenterWrapp = styled(ButtonsWrap)`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const ButtonWrap = styled(`button`)`
  border: unset;
  background-color: ${(props) => (props.unPressed ? "#27282a" : "#565759")};
  height: 20px;
  border-radius: 4px;
  color: #e6e6e6;
  outline: unset;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 2px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonToday = styled(ButtonWrap)`
  font-weight: bold;
`;

const CalendarDate = ({
  currentMonth,
  currentYear,
  prevHandler,
  todayHandler,
  nextHandler,
  setDisplayMode,
  displayMode,
  currentDay
}) => {
  return (
    <DivWrapp>
      <div>
        {displayMode === "day" ? <TitleWrap>{currentDay}</TitleWrap> : null}
        <TitleWrap>{currentMonth}</TitleWrap>
        <TextWrapp>{currentYear}</TextWrapp>
      </div>

      <ButtonsCenterWrapp>
        <ButtonWrap
          unPressed={displayMode === "month"}
          onClick={() => setDisplayMode("month")}
        >
          Month
        </ButtonWrap>
        <ButtonWrap
          unPressed={displayMode === "day"}
          onClick={() => setDisplayMode("day")}
        >
          Day
        </ButtonWrap>
      </ButtonsCenterWrapp>
      <ButtonsWrap>
        <ButtonWrap onClick={prevHandler}> &lt; </ButtonWrap>
        <ButtonToday onClick={todayHandler}>Today</ButtonToday>
        <ButtonWrap onClick={nextHandler}> &gt; </ButtonWrap>
      </ButtonsWrap>
    </DivWrapp>
  );
};

export default CalendarDate;
