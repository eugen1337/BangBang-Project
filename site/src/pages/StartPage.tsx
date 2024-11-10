import { FC } from "react";
import styled from "styled-components";
import LogoImage from "../assets/Logo.svg";
import LogoText from "../assets/LogoText.svg";
import StartImageBack from "../assets/StartImageBack.svg";
import { HandySvg } from "handy-svg";

const Container = styled.div`
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url("back.png");
  background-size: cover;

  gap: 20px;
`;

const MainText = styled.span<{ size: number; color: string }>`
  font-family: Gilroy-ExtraBold;
  font-size: ${(props) => props.size + "px"};
  font-style: normal;
  color: ${(props) => props.color};
  text-align: center;
`;

const SecondText = styled.span<{ size: number; color: string }>`
  font-family: Gilroy-Light;
  font-size: ${(props) => props.size + "px"};
  font-style: normal;
  color: ${(props) => props.color};
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomesImage = styled.img`
  position: absolute;
  top: 26px;
  left: 12px;
  width: 340px;
  height: 190px;
`;

const StartPage: FC = () => {
  return (
    <Container>
      <HandySvg src={LogoImage} className="icon" width="80" height="70" />
      <HandySvg src={LogoText} className="icon" width="165" height="43" />
      <MainText size={16} color="#ffffff">
        Погружайтесь в историю вашего города!
      </MainText>
      <SecondText size={16} color="#ffffff">
        Узнавайте о культовых зданиях, их архитекторах и интересных фактах,
        используя всего пару кликов.
      </SecondText>
      <ImageContainer>
        <HandySvg
          src={StartImageBack}
          className="icon"
          width="366"
          height="240"
        />
        <HomesImage src="homes.png" />
      </ImageContainer>
    </Container>
  );
};

export { StartPage };
