import { useState, useEffect } from "react";
import api from "../../config/axios";
import { confirmAlert } from "react-confirm-alert";
import { myToast } from "../../components/Toast";
import "react-confirm-alert/src/react-confirm-alert.css";

interface ArticleTableProps {
  id: number;
  name: string;
  description: string;
  loadArticles: () => void;
  articles: Article[];
}

export const ArticleTable: React.FC<ArticleTableProps> = ({
  articles,
  loadArticles,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteArticle = async (id: number) => {
    if (isDeleting) return;
    setIsDeleting(true);
    confirmAlert({
      title: "Deseja mesmo excluir esse artigo?",
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            await api
              .delete(`/articles/${id}`)
              .then(() => myToast("success", ''))
              .catch((err) => myToast("error", ''));
            loadArticles();
            setIsDeleting(false);
          },
        },
        {
          label: "Não",
          onClick: () => {
            setIsDeleting(false);
          },
        },
      ],
    });
  };

  return (
    <div className="overflow-x-auto ml-10">
      <div className="py-2 inline-block min-w-full sm:px-2 lg:px-8">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                >
                  Nome
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                >
                  Descrição
                </th>

                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                >
                  Ações
                </th>
              </tr>
            </thead>
            {articles.map((article) => (
              <tbody key={article.id}>
                <tr className="bg-white border-b">
                  <td className="px-2 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {article.id}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                    {article.name}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                    {article.description}
                  </td>

                  <td className="text-sm  font-light px-2 py-4 whitespace-nowrap">
                    <button className="px-1 text-yellow-500 hover:text-yellow-700">
                      <i className="fa-solid fa-folder-open"></i>
                    </button>
                    <button
                      onClick={() => deleteArticle(article.id)}
                      className="px-1 text-red-500 hover:text-red-700"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArticleTable;
