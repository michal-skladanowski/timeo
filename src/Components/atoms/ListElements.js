import styled, { keyframes } from "styled-components";

const appears = keyframes`
from {
      opacity: 0%;
    }

    to {
      opacity: 100%;
    }
`;
const ListElement = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 0.5fr 0.3fr;
  opacity: 1;
  animation-duration: 1000ms;
  animation-name: ${appears};
  font-size: 0.9rem;
  padding: 8px 0 8px 75px;
  text-align: start;
  margin-bottom: 3px;
  background-color: white;
  &:last-child {
    margin-bottom: 0;
  }
`;
export default ListElement;
