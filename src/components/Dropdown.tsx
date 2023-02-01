import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/sliceUser";

const Dropdown: React.FC = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showDropdown = () => {
    setOpen(!open);
    
  };

  const logout = () => {
    localStorage.removeItem("knowledge__user");
    dispatch(setUser(""));
    navigate("/login");
  };

  return (
    <div className="">
      <button
        onClick={showDropdown}
        className={`${
          open ? "one" : "two"
        }  text-stone-500 border-2 rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center`}
        type="button"
      >
        <i className="fa-solid fa-arrow-down"></i>
      </button>

      <div
        className={`w-30 mt-1 right-5 absolute ${
          open ? "block" : "hidden"
        } bg-white text-base  rounded shadow `}
      >
        <ul className="py-1  border-2 rounded-lg">
          <Link to={"/admin"}>
            <li className="flex items-center gap-2 px-6 hover:bg-stone-100">
              <i className="fa-solid fa-gear text-stone-500"></i>
              <button onClick={e => setOpen(!open)} className=" text-sm text-stone-700 block py-2">
                Admin
              </button>
            </li>
          </Link>
          <Link to={"/setting"}>
            <li className="flex items-center gap-2 px-6 hover:bg-stone-100">
              <i className="text-stone-500 fa-solid fa-user-gear"></i>
              <button onClick={e => setOpen(!open)} className="text-sm  text-stone-700 block  py-2">
                Settings
              </button>
            </li>
          </Link>

          <li className="flex items-center gap-2 px-6 hover:bg-stone-100">
            <i className="text-stone-500 fa-solid  fa-arrow-right-from-bracket"></i>
            <button
              onClick={logout}
              className="text-sm  text-stone-700 block  py-2"
            >
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
