import "./Sidebar.css";
import TreeView from "../components/TreeView";
import { useState, useEffect } from "react";
import api from "../config/axios";
import { Nodes } from "../components/TreeView";

interface SideProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SideProps> = (props) => {
  const { isOpen } = props;

  const [categories, setCategories] = useState<Nodes[]>([]);

  useEffect(() => {
    api
      .get("/categories/tree")
      .then((res) => {
        setCategories(res.data);
        
      
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return (
    <aside className={`${isOpen ? 'w-40' : ""}`}>
      <div className={`mt-2 ${isOpen ? "w-52" : "side"} shadow-lg h-full  px-5`}>
        {isOpen && <TreeView categories={categories} />}
      </div>
    </aside>
  );
};

export default Sidebar;
