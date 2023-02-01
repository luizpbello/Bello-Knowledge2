import { useState } from "react";
import { UserAdmin } from "../admin/UserAdmin";
import { CategoryAdmin } from "../admin/CategoryAdmin";
import { ArticleAdmin } from "../admin/articles/ArticleAdmin";
import SectionTitle from "../components/SectionTitle";

export const Admin: React.FC = () => {
  const [tab, setTab] = useState("Artigos");
  const [visible, setVisible] = useState({
    Artigos: true,
    Categorias: false,
    Usuários: false,
  });
  const handleTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTab(event.currentTarget.name);
    setVisible({ ...visible, [event.currentTarget.name]: true });
  };
  return (
    <div className="flex flex-col items-center ">
      <SectionTitle title="Admin Page" icon={"user"} />
      <div className="flex flex-col  items-center mt-5">
        <div className="text-sm font-medium text-center text-stone-500  dark:text-stone-400">
          <ul className="flex gap-3 flex-wrap -mb-px">
            <li className="">
              <button
                onClick={handleTab}
                name="Artigos"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-stone-600 hover:border-indigo-300 dark:hover:text-stone-300 ${
                  tab === "Artigos" ? "text-stone-600 border-indigo-300" : ""
                }`}
              >
                Artigos
              </button>
            </li>
            <li className="">
              <button
                onClick={handleTab}
                name="Categorias"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-indigo-300 dark:hover:text-gray-300 ${
                  tab === "Categorias" ? "text-gray-600 border-indigo-300" : ""
                }`}
              >
                Categorias
              </button>
            </li>
            <li className="">
              <button
                onClick={handleTab}
                name="Usuários"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-indigo-300 dark:hover:text-gray-300 ${
                  tab === "Usuários" ? "text-gray-600 border-indigo-300" : ""
                }`}
              >
                Usuários
              </button>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap">
          {tab === "Artigos" && <ArticleAdmin />}
          {tab === "Categorias" && <CategoryAdmin />}
          {tab === "Usuários" && <UserAdmin />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
