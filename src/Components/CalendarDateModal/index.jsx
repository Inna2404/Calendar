import React from "react";
import {
  DivWrapp,
  TitleWrap,
  TextWrapp,
  ButtonsCenterWrapp,
  ButtonWrap,
  ButtonsWrap,
  ButtonToday
} from "./CalendarDateModal.style-components";
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
