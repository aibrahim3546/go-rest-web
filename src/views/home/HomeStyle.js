import styled from 'styled-components';

const FirstContainer = styled.div`
  float: left;
  width: 60%;
  display: inline;
`;

const SecondContainer = styled.div`
  float: left;
  width: 40%;
  display: inline;
  padding-left: 20px;
`;

const InputContainer = styled.div`
  padding-bottom: 10px;
`;

const TitleInput = styled.input`
  outline: none;
  border: 0.5px solid #333;
  border-radius: 1px;
  border-bottom-width: 5px;
  width: 100%;
  padding: 10px;
`;

const CreateBtn = styled.div`
  text-align: center;
  width: 100px;
  padding: 8px 0;
  color: #f9f9f9;
  background-color: #333;
  border-bottom: 4px solid #333;
  border-bottom-color: #000;
  border-radius: 2px;
  font-weight: bold;
  cursor: pointer;
  :active {
    margin-top: 2px;
    border-bottom-width: 2px;
  }
`;

const PostTable = styled.table`
  border: 2px solid #333;
  border-radius: 2px;
  border-collapse: collapse;
  td,
  th {
    padding: 15px 10px;
    border-bottom: 1px solid #333;
  }
`;

export {
  FirstContainer,
  SecondContainer,
  TitleInput,
  InputContainer,
  CreateBtn,
  PostTable
};
