import styled from "styled-components";

export const DivWrapp = styled("div")`
  display: flex;
  justify-content: space-between;
  background-color: #1e1f21;
  color: #dcdddd;
  padding: 16px;
  position: relative;
`;

export const TextWrapp = styled("span")`
  font-size: 32px;
`;

export const TitleWrap = styled(TextWrapp)`
  font-weight: bolt;
  margin-right: 8px;
  margin-left: 8px;
`;

export const ButtonsWrap = styled(`div`)`
  display: flex;
  align-items: center;
`;

export const ButtonsCenterWrapp = styled(ButtonsWrap)`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

export const ButtonWrap = styled(`button`)`
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

export const ButtonToday = styled(ButtonWrap)`
  font-weight: bold;
`;
