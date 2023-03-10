import { useState } from "react";
import {  useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCategoryId } from "../redux/sliceCategoryId";

export interface Nodes {
  id: number;
  name: string;
  parentId: number | null;
  path: string;
  children?: Array<Nodes>;
}

const TreeView: React.FC<{ categories: Nodes[] }> = ({ categories }) => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const dispatch = useDispatch();

 

  const handleClick = (id: number) => {
    const categoryId = id
    dispatch(setCategoryId(categoryId));
    setExpanded((prevState) =>
      prevState.includes(id)
        ? prevState.filter((i) => i !== id)
        : [...prevState, id]
    );
  };

  const buildTree = (
    nodes: Nodes[],
    parentId: number | null
  ): JSX.Element[] => {
    return nodes
      .filter((node) => node.parentId === parentId)
      .map((node) => {
        const children = node.children ? buildTree(node.children, node.id) : [];
        return (
          <div key={node.id} className="">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleClick(node.id)}
            >
              <span
                className={`${
                  expanded.includes(node.id) && children
                    ? "fa-solid fa-folder-open"
                    : "fa-solid fa-folder"
                } mr-2 text-stone-400 `}
              />
              <Link to={`categories/${node.id}/articles`}>
                <span className="text-stone-600 ">
                  {node.name.length > 20
                    ? node.name.substring(0, 20) + "..."
                    : node.name}
                </span>
              </Link>
            </div>
            {children.length > 0 && (
              <div
                className={`text-ellipsis border-l-2  whitespace-nowrap overflow-hidden pl-6 ${
                  expanded.includes(node.id) ? "" : "hidden"
                }`}
              >
                {children}
              </div>
            )}
          </div>
        );
      });
  };
  return <>{buildTree(categories, null)}</>;
};

export default TreeView;
