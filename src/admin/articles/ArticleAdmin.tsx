import { useState,useEffect } from "react";
import ArticleModal from "./ArticleModal";
import ArticleTable from "./ArticleTable";
import api from "../../config/axios";

interface ArticleAdmin{
  loadArticles: () => void;
}

interface ArticleTableProps {
  id: number;
  name: string;
  description: string;
  loadArticles:() =>void;
}

export const ArticleAdmin: React.FC<ArticleAdmin> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState<ArticleTableProps[]>([]);


  const loadArticles = async () => {
    api
      .get("/articles")
      .then((res) => setArticles(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadArticles();
  }, []);


  return (
    <div className="">

      <div className="py-2.5 bg-white mt-5 flex flex-col items-center rounded-lg shadow-lg gap-4 ">
        <ArticleTable articles={articles} loadArticles={loadArticles}/>
      <button
        className="bg-green-700 text-white active:bg-green-800 w-38 text-sm px-6 py-3 rounded shadow hover:bg-green-800 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Adicionar Artigo
      </button>
      </div>

      {showModal ? (
        <>
          <div className="mt-5 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className=" mt-32 flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="">Adicionar Artigos</h3>
                  <div className="absolute right-0 top-28">
                    <button
                      className="text-red-500 px-2  float-right text-2xl hover:text-red-700 "
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <ArticleModal loadArticles={loadArticles} />
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

export default ArticleAdmin;
