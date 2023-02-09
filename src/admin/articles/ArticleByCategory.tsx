import api from "../../config/axios";
import { useState, useEffect } from "react";
import ArticleById from "./ArticleById";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { useSetCategoryId } from "../../redux/sliceCategoryId";

interface ArticleProps {
  id: number;
  name: string;
  description: string;
}

export const ArticleByCategory: React.FC = () => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [categoryID, setCategoryID] = useState();
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const categoryId = useSelector(useSetCategoryId)

  console.log(categoryId)

  const getCategory = async () => {
    await api.get(`categories/2`).then((res) => console.log(res.data));
  };

  const getArticles = async () => {
    await api.get(`/categories/2/articles?page=${page}`).then((res) => {
      setArticles(articles.concat(res.data));
      res.data.length == 0 ? setLoadMore(false) : setLoadMore(true);
    });
  };

 

  useEffect(() => {
    getCategory();
    getArticles();
  }, [page]);

  return (
    <>
      <div className="flex flex-col items-center mb-5">
        <SectionTitle title="Artigos" />
        {articles.map((article) => (
          <ul className="flex  items-center mt-5  gap-5 ">
            <li>
              <ArticleById articles={article} />
            </li>
          </ul>
        ))}
        {loadMore && (
          <button
            onClick={() => {
              setPage(page + 1);
              getArticles();
            }}
            className="bg-indigo-500 p-1 rounded-lg text-white text-sm mt-4 hover:bg-indigo-700 hover:scale-105 transition-transform"
          >
            Carregar mais
          </button>
        )}
      </div>
    </>
  );
};

export default ArticleByCategory;
