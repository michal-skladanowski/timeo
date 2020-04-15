import styled from "styled-components";

const Input = styled.input`
  display: inline-block;
  height: 38px;
  padding: 0 20px;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 220px;
  box-sizing: border-box;
  vertical-align: middle;
  &:hover {
    border-color: hsl(0, 0%, 70%);
  }
  &:focus {
    box-shadow: 0 0 0 1px #2684ff;
    border-color: #2684ff;
    outline: 0;
  }
`;

export default Input;
