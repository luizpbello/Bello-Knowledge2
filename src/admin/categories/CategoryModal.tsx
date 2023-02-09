import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { modules, formats } from "../../config/quillOptions";
import ImageResize from "react-quill";
ReactQuill.Quill.register("modules/imageResize", ImageResize);
import { myToast } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

interface Category {
 
  loadCategory: () => void;
}

interface ParentCategory {
  id: number;
  name: string;
  parendId?: number;
}

const CategoryModal: React.FC<Category> = ({ loadCategory }) => {
  const [parentCategory, setParent] = useState<ParentCategory[]>([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    parentCategory: 0,
  });

  const loadParentCategory = async () => {
    api.get("/categories").then((res) => setParent(res.data));
  };

  useEffect(() => {
    loadParentCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/categories", newCategory);
      myToast("success", "Artigo registrado com sucesso!");
    } catch (error: any) {
      myToast("error", "");
    }
    loadCategory();
  };

 

  return (
    <>
      <form className=" rounded-lg" onSubmit={handleSubmit}>
        <ToastContainer />
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_email"
            className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-stone dark:border-stone-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            placeholder=" "
            required
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <label className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Nome da categoria
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
        {parentCategory && (
          <select
            name="userId"
            value={newCategory.parentCategory}
            onChange={(e) =>
              setNewCategory({ ...newCategory, parentCategory: +e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-stone dark:border-stone-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          >
            <option value="">Categorias...</option>
            {parentCategory.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}

        <label className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Selecione uma categoria
        </label>
      </div>

      <div className="mt-10 flex gap-2 relative z-0 w-full mb-6 group">
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Salvar
        </button>
        <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Excluir
        </button>
      </div>

      </form>
    </>
  );
};

export default CategoryModal;
