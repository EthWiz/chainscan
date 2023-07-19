import { Outlet } from "react-router-dom";
import { HomeNav } from "../../components/home/HomeNav";
export const HomeLayout = () => {
  return (
    <>
      <HomeNav />
      <Outlet />
    </>
  );
};
