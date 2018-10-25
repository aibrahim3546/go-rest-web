import styled from 'styled-components';

const TextArea = styled.textarea`
  margin-bottom: 10;
  letter-spacing: 1;
  font-size: 18;
  width: 100%;
  height: ${props => props.height}px;
  resize: none;
  border: none;
  outline: none;
`;

export { TextArea };
