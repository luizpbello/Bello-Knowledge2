import { useState } from "react";
import api from "../../config/axios";
import { confirmAlert } from "react-confirm-alert";
import { myToast } from "../../components/Toast";
import { ToastContainer } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";

type User = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
};

interface UserTable {
  users: User[];
  loadUsers: () => void;
}

const UserTable: React.FC<UserTable> = ({ users, loadUsers }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteUser = async (id: number) => {
    if (isDeleting) return;
    setIsDeleting(true);
    confirmAlert({
      title: "Deseja mesmo excluir essa categoria?",
      buttons: [
        {
          label: "Sim",
          onClick: async () => {
            await api
              .delete(`/users/${id}`)
              .then(() => myToast("success", ""))
              .catch((err) => myToast("error", err));
            loadUsers();
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
    <>
      <div className="overflow-x-auto ml-10">
        <ToastContainer/>
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
                    Email
                  </th>

                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                  >
                    Admin
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-2 py-4 text-left"
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              {users.map((user) => (
                <tbody key={user.id}>
                  <tr className="bg-white border-b">
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm font-light text-gray-900">
                      {user.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-2 py-4 whitespace-nowrap">
                      {user.admin}
                    </td>

                    <td className="text-sm  font-light px-2 py-4 whitespace-nowrap">
                      <button className="px-1 text-yellow-500 hover:text-yellow-700">
                        <i className="fa-solid fa-folder-open"></i>
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
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
    </>
  );
};

export default UserTable;
