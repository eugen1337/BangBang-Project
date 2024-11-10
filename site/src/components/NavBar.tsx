import styled from "styled-components";
import { HandySvg } from "handy-svg";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeImage from "../assets/Home.svg";
import SearchImage from "../assets/Search.svg";
import MapImage from "../assets/Map.svg";
import ColoredHomeImage from "../assets/ColoredHome.svg";
import ColoredSearchImage from "../assets/ColoredSearch.svg";
import ColoredMapImage from "../assets/ColoredMap.svg";

const Container = styled.div`
  position: absolute;
  bottom: 52px;
  left: 5vw;

  border-radius: 50px;

  width: 90vw;
  height: 52px;
  background-color: transparent;

  justify-self: center;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  border: 3px solid #a2dd62;
`;

const OptionContainer = styled.div<{ isActive?: boolean }>`
  padding: 8px 40px;
  height: 80%;

  width: 116px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50px;

  background-color: ${(props) => (props.isActive ? "#a2dd62" : "transparent")};
  cursor: pointer;

  &:hover {
  }
`;

const options = [
  { name: "Главная", id: 0, link: "main", isActive: true },
  { name: "Поиск", id: 1, link: "search", isActive: false },
  { name: "Карта", id: 2, link: "map", isActive: false },
];

const NavBar: FC = () => {
  const navigator = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const onChange = (index: number) => {
    options[activeIndex].isActive = false;
    options[index].isActive = true;
    setActiveIndex(index);

    navigator(options[index].link);
  };

  return (
    <Container>
      {options.map((option) => (
        <OptionContainer
          onClick={() => onChange(option.id)}
          isActive={option.isActive}
        >
          <HandySvg
            src={
              option.id === 0
                ? !option.isActive
                  ? ColoredHomeImage
                  : HomeImage
                : option.id === 1
                ? !option.isActive
                  ? ColoredSearchImage
                  : SearchImage
                : !option.isActive
                ? ColoredMapImage
                : MapImage
            }
            width="20"
            height="20"
          />
        </OptionContainer>
      ))}
    </Container>
  );
};

export { NavBar };
