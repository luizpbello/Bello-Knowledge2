import knowledge from "../assets/sticker.png";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { myToast } from "../components/Toast";
import api from "../config/axios";
import { setUser } from "../redux/sliceUser";

export function Login() {
  const [register, setRegister] = useState(false);
  const [newuser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearForm = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

 

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/signin", {
        email: newuser.email,
        password: newuser.password,
      });
      const user = response.data;
      dispatch(setUser(user));
      const userKey = JSON.stringify(response.data)
      localStorage.setItem("knowledge__user", userKey);
      navigate("/");
    } catch (error:any) {
      myToast("error", error.response.data);
    }
  };

   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/signup", newuser);
      myToast("success", "Registro realizado com sucesso!");
      clearForm();
    } catch (error:any) {
      myToast("error", error.response.data);
    }
  };

  return (
    <div
      className={`bg flex flex-col items-center justify-center px-20 md:h-screen  `}
    >
      <ToastContainer />
      <div className="w-1/4  bg-white rounded-lg shadow-lg flex flex-col items-center  mt-2 ">
        {!register && <img className="w-30 h-40" src={knowledge} alt="Sticker computador" />}
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          {!register && (
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login
            </h1>
          )}
          {register && (
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Registro
            </h1>
          )}

          <form
            onSubmit={register ? handleRegister : handleSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            {register && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Nome:
                </label>
                <input
                  type="text"
                  name="name"
                  value={newuser.name}
                  onChange={(e) =>
                    setNewUser({ ...newuser, name: e.target.value })
                  }
                  className="text-gray-900 sm:text-sm  block w-full  ouline-none  border-b-2 border-black focus:outline-none focus:border-b-indigo-500"
                  placeholder="Seu Nome"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={newuser.email}
                onChange={(e) =>
                  setNewUser({ ...newuser, email: e.target.value })
                }
                className="text-gray-900 sm:text-sm  block w-full  ouline-none  border-b-2 border-black focus:outline-none focus:border-b-indigo-500"
                placeholder="email@provedor.com"
              />
            </div>
            <div>
          
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Senha:
              </label>
              <input
                type="password"
                name="password"
                value={newuser.password}
                onChange={(e) =>
                  setNewUser({ ...newuser, password: e.target.value })
                }
                id="password"
                placeholder="••••••••"
                className="text-gray-900 sm:text-sm  block w-full px-2.5 ouline-none  border-b-2 border-black focus:outline-none focus:border-b-indigo-500"
              />
            </div>
            {register && (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Repita senha:
                </label>
                <input
                  type="password"
                  name="confirmassword"
                  value={newuser.confirmPassword}
                  onChange={(e) =>
                    setNewUser({ ...newuser, confirmPassword: e.target.value })
                  }
                  id="password"
                  placeholder="••••••••"
                  className="text-gray-900 sm:text-sm  block w-full px-2.5 ouline-none  border-b-2 border-black focus:outline-none focus:border-b-indigo-500"
                />
              </div>
            )}

            {!register && (
              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Entrar
              </button>
            )}
            {register && (
              <button
                type="submit"
                className="w-full text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Registrar
              </button>
            )}
          </form>
          {!register && (
            <p className="text-center text-sm font-light text-stone-500 ">
              Não possui cadastro?{" "}
              <button
                onClick={() => setRegister(true)}
                className="font-medium text-stone-600 hover:underline "
              >
                
                Registre-se
              </button>
            </p>
          )}
          {register && (
            <p className="text-center text-sm font-light text-stone-500 ">
              Já tem cadastro?{" "}
              <button
                onClick={() => setRegister(false)}
                className="font-medium text-stone-600 hover:underline "
              >
               
                Faça o login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
