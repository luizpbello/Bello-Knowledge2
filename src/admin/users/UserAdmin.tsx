import { useState, useEffect } from "react";
import api from "../../config/axios";
import UserModal from "./UserModal";
import UserTable from "./UserTable";
import Pagination from "react-paginate";

interface UserAdminProps {
  id: number;
  name: string;
  email: string;
  admin: boolean;
}

export const UserAdmin: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<UserAdminProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadUsers = async () => {
    api.get(`/users?page=${page}`).then((res) => {
      setUsers(res.data.data);
      setTotalPages(Math.ceil(res.data.count / res.data.limit));
    });
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  return (
    <div className="">
      <div className="py-2.5 bg-white mt-5 flex flex-col items-center rounded-lg shadow-lg gap-4 ">
        <UserTable users={users} loadUsers={loadUsers} />
        <div className="flex ">
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
          />
        </div>
        <button
          className=" text-white bg-indigo-700 w-38 text-sm px-6 py-3 rounded-lg shadow-lg outline-none hover:bg-indigo-600  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Adicionar Usuário
        </button>
      </div>

      {showModal ? (
        <>
          <div className="mt-5 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl">
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="  flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="">Adicionar Usuários</h3>
                  <div className="absolute right-0 top-28">
                    <button
                      className="text-red-500 mr-1 -mt-28 float-right text-2xl hover:text-red-700 "
                      onClick={() => setShowModal(false)}
                    >
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <UserModal loadUsers={loadUsers} />
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

export default UserAdmin;
