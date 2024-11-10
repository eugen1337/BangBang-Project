import styled from "styled-components";
import { FC } from "react";

const Container = styled.div`
  padding: 15px 40px;
  background-color: transparent;
  border-radius: 100px;

  border: 1px solid #a2dd62;
  &:hover {
    background-color: #2b3915;
    cursor: pointer;
    color: #ffffff;
  }
  transition: background-color 0.3s ease;
`;

type Props = {
  onClick: () => void;
  children?: React.ReactNode;
};

const Button: FC<Props> = ({ children, onClick }) => {
  return <Container onClick={onClick}>{children}</Container>;
};

export { Button };
