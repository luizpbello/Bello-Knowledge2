import { useState, useEffect } from "react";
import { myToast } from "../../components/Toast";
import api from "../../config/axios";
import CategoriesTable from "./CategoriesTable";
import CategoryModal from "./CategoryModal";

interface CategoriesProps {
  id: number;
  name: string;
  path: string;
  loadCategories: () => void;
}

export const CategoryAdmin: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  const loadCategories = async () => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => myToast("error"));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="">
      <div className="py-2.5 bg-white mt-5 flex flex-col items-center rounded-lg shadow-lg gap-4 ">
        <CategoriesTable
          categories={categories}
          loadCategories={loadCategories}
        />
        <button
          className=" text-white bg-indigo-700 w-38 text-sm px-6 py-3 rounded-lg shadow-lg outline-none hover:bg-indigo-600  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Adicionar Artigo
        </button>
      </div>

      {showModal ? (
        <>
          <div className="mt-5 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="  flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="">Adicionar Categorias</h3>
                  <div className="absolute right-0 top-28">
                    <button
                      className="text-red-500 mr-1 -mt-28 float-right text-2xl hover:text-red-700 "
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <CategoryModal loadCategory={loadCategories} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default CategoryAdmin;
