import { FC, useState } from "react";
import styled from "styled-components";
import { Button } from "../components/Button";
import { TextField } from "@mui/material";
import { useBuildingsStore } from "../state/store";

const Container = styled.div`
  height: 100vh;
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url("back2.png");
  background-size: cover;

  gap: 30px;
`;

const MainText = styled.span<{ size: number; color: string }>`
  font-family: Gilroy-ExtraBold;
  font-size: ${(props) => props.size + "px"};
  font-style: normal;
  color: ${(props) => props.color};
  text-align: center;
`;

const SearchPage: FC = () => {
  const [address, setAddress] = useState("");

  const { getBuildingData } = useBuildingsStore();
  return (
    <Container>
      <MainText size={24} color="#ffffff">
        Поиск по адресу
      </MainText>
      <TextField
        sx={{
          background: "linear-gradient(90deg, #16361F 0%, #323714 100%)",
          borderRadius: "6px",
          border: "2.43px solid #88D163",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: 6,
              borderWidth: 0, // default
            },
            "&.Mui-focused fieldset": {
              border: "none", // focus
            },
          },
        }}
        slotProps={{
          htmlInput: {
            sx: {
              fontSize: "16px",
              color: "#ffffff",
              marginLeft: "5px",
              fontFamily: "Gilroy-Light",
            },
          },
        }}
        size="small"
        value={address}
        placeholder="Введите адрес"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        fullWidth
      />
      <Button
        onClick={() => {
          getBuildingData({ lat: "55.358471", lon: "86.084554" });
        }}
      >
        <MainText size={24} color="#A2DD62">
          Найти
        </MainText>
      </Button>
    </Container>
  );
};

export { SearchPage };
