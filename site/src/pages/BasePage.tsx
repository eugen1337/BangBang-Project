import { FC,  } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const BasePage: FC = () => {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};

export { BasePage };
