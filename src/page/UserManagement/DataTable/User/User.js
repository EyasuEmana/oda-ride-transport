import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { useNavigate } from "react-router-dom";
import { columns } from "./columns";
import { ToastContainer } from "react-toastify";

function Users() {
  const [userId, setUserId] = React.useState(null);
  let postendpoint = `/api/v1/users`;
  let getendpoint = `/api/v1/users?role=user`;
  let putendpoint = `/api/v1/users`;
  let deleteendpoint = `/api/v1/users`;


  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData(getendpoint);
  const navigate = useNavigate();

  const { mutate, isLoading, isError, data, isSuccess } = usePostData(postendpoint);
  const handleNewAdd = async ({ values, table }) => {
    mutate(values);

    table.setCreatingRow(null);
  };

  const {
    mutate: update,
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    isSuccess: setSuccessUpdate,
    error: errorupdate,
  } = usePutData(putendpoint,userId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: putendpoint,
      Id: row.original.userId,
      data: values,
    });
    table.setEditingRow(null);
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/user/user-detail", { state: { rowData } });
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(deleteendpoint, userId);

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this User?")) {
      deleteData({ endpoint: deleteendpoint, Id: row.original.userId });
    }
  };

  return (
    <div>
      <MDataTable
        headerTitle="Users"
        add="User"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"User"}
        handleViewClick={handleViewClick}
      />
            <ToastContainer/>

    </div>
  );
}
export default Users;
