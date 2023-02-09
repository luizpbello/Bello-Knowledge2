import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import AppRoutes from "../config/routes";
import Header from "../Layout/Header";
import Sidebar from "../Layout/Sidebar";
import { useUser } from "../redux/sliceUser";



const Content: React.FC<ContentProps> = () => {
  const user = useSelector(useUser);
  const [isOpen, setIsOpen] = useState<ContentProps["isOpen"]>(false);

  const isAuth = localStorage.getItem("knowledge__user");

  

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <Router>
      {isAuth && <Header toggleOpen={toggleOpen} isOpen={isOpen} />}
      <div className={`${isAuth ? "flex" : ""} `}>
        {isAuth && <Sidebar isOpen={isOpen} />}
        <div className={`bg-stone-100 h-screen ${isAuth ? "flex justify-center w-full h-full" : ""}`}>
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
};

export default Content;
