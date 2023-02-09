import { useState, useEffect } from "react";
import ArticleModal from "./ArticleModal";
import ArticleTable from "./ArticleTable";
import api from "../../config/axios";
import Pagination from "react-paginate";

interface ArticleAdmin {
  loadArticles: () => void;
}

type Articles = {
  id: number;
  name: string;
  description: string;
};

interface ArticleTableProps {
  id: number;
  name: string;
  description: string;
  articles: Articles[];
  loadArticles: () => void;
}

export const ArticleAdmin: React.FC<ArticleAdmin> = () => {
  const [showModal, setShowModal] = useState(false);
  const [articles, setArticles] = useState<ArticleTableProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [isEdit, setIsEdit] = useState(false)


  const handleEdit = () => {
    setIsEdit(true)
  }

  const loadArticles = async () => {
    api
      .get(`/articles?page=${page}`)
      .then((res) => {
        setArticles(res.data.data);
        setTotalPages(Math.ceil(res.data.count / res.data.limit))
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    loadArticles();
  }, [page]);

  return (
    <div className="">
      <div className="py-2.5 bg-white mt-5 flex flex-col items-center rounded-lg shadow-lg gap-4 ">
        <ArticleTable handleEdit={handleEdit} setShowModal={setShowModal} showModal={showModal} articles={articles} loadArticles={loadArticles} />

        <Pagination
          className="flex gap-2 mt-3 justify-center"
          pageCount={totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={(page) => setPage(page.selected + 1)}
          previousLabel={"<"}
          nextLabel={">"}
          containerClassName={"pagination"}
          activeLinkClassName={"active"}
          breakClassName={"break"}
          nextLinkClassName={"next"}
          previousLinkClassName={"prev"}
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
                  <ArticleModal isEdit={isEdit} loadArticles={loadArticles} />
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
