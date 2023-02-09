import artimg from "../../assets/article.jpeg";

interface ArticleById {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  
}

export const ArticleById: React.FC<ArticleById> = (article) => {
  return (
    <div className="flex w-96 items-center px-2.5 py-2.5 rounded-lg shadow-lg bg-white hover:scale-105 transition-transform cursor-pointer">
      <div className="w-1/2 h-24">
        {!article.articles.imageUrl && (
          <img className="w-full h-24" src={artimg} alt="" />
        )}
        {article.articles.imageUrl && (
          <img className="w-full h-24" src={article.articles.imageUrl} alt="" />
        )}
      </div>
      <div className="flex text-stone-600 items-center  flex-col w-full tex-stone-700">
        <h2 className="">
          <strong>Artigo: </strong>
          {article.articles.name}
        </h2>
        <h3 className="">
          <strong>Descrição: </strong>
          {article.articles.description}
        </h3>
        <span>
          <strong>Autor: </strong>
          {article.articles.author}
        </span>
      </div>
    </div>
  );
};

export default ArticleById;
