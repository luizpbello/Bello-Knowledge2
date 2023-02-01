import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { modules, formats } from "../../config/quillOptions";
import ImageResize from "react-quill";
ReactQuill.Quill.register("modules/imageResize", ImageResize);
import { myToast } from "../../components/Toast";
import { ToastContainer } from "react-toastify";

interface Article {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  userId: number;
  content: string;
  loadArticles: () => void;
}

interface User {
  id: number;
  name: string;
  email: String;
}

interface Category {
  id: number;
  name: string;
  path: string;
}

export const ArticleModal: React.FC<Article> = ({ loadArticles }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [category, setCategory] = useState<Category[]>([]);

  const [article, setArticle] = useState({
    name: "",
    description: "",
    imageUrl: "",
    categoryId: 0,
    userId: 0,
    content: "",
  });

  useEffect(() => {
    const loadUsers = async () => {
      api
        .get("/users")
        .then((res) => setUsers(res.data.data))
        .catch((err) => console.log(err));
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      api
        .get("/categories")
        .then((res) => setCategory(res.data))
        .catch((err) => console.log(err));
    };
    loadCategories();
  }, []);

  const clearForm = () => {
    setArticle({
      name: "",
      description: "",
      imageUrl: "",
      categoryId: 0,
      userId: 0,
      content: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post("/articles", article);
      myToast("success", "Artigo registrado com sucesso!");
    } catch (error: any) {
      myToast("error", "");
    }
    loadArticles();
    clearForm()
  };

  return (
    <form className="mt-5  rounded-lg" onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-stone dark:border-stone-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          placeholder=" "
          required
          value={article.name}
          onChange={(e) => setArticle({ ...article, name: e.target.value })}
        />
        <label className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Nome do artigo
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-stone dark:border-stone-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          placeholder=" "
          required
          value={article.description}
          onChange={(e) =>
            setArticle({ ...article, description: e.target.value })
          }
        />
        <label className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Descrição do artigo
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          onChange={(e) => setArticle({ ...article, imageUrl: e.target.value })}
          value={article.imageUrl}
          type="text"
          name="repeat_password"
          className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-stone dark:border-stone-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          placeholder=" "
        />
        <label className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          URL da imagem
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        {users && (
          <select
            name="userId"
            value={article.userId}
            onChange={(e) =>
              setArticle({ ...article, userId: +e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-stone dark:border-stone-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          >
            <option value="">Selecione o autor</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} - {user.email}
              </option>
            ))}
          </select>
        )}

        <label className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Autor
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        {category && (
          <select
            name="categoryId"
            value={article.categoryId}
            onChange={(e) =>
              setArticle({ ...article, categoryId: +e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-stone-900 bg-transparent border-0 border-b-2 border-stone-300 appearance-none dark:text-stone dark:border-stone-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
          >
            <option value="">Selecione a categoria</option>
            {category.map((categories) => (
              <option key={categories.id} value={categories.id}>
                {categories.path} -
              </option>
            ))}
          </select>
        )}

        <label className="peer-focus:font-medium absolute text-sm text-stone-500 dark:text-stone-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Categorias
        </label>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <ReactQuill
          modules={modules}
          formats={formats}
          value={article.content}
          onChange={(e) => {
            setArticle({ ...article, content: e.valueOf() });
          }}
        />
      </div>

      <div className="flex gap-2 relative z-0 w-full mb-6 group">
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
  );
};

export default ArticleModal;
