import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function ExtraOptions() {
  const [extraOptionId, setExtraOptionId] = React.useState(null);
  const navigate = useNavigate();
  let endpoint = `/api/v1/extra-options`;
  let endpointget = `/api/v1/extra-options/all`;


  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData(endpointget);

  const { mutate, isLoading, isError, data, isSuccess } = usePostData(endpoint);
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
  } = usePutData(endpoint, extraOptionId, data);
  const handleViewClick = (rowData) => {
    navigate("/dashboard/extra/extra-detail", { state: { rowData } });
  };
  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.extraOptionId,
      data: values,
    });
    table.setEditingRow(null);
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    extraOptionId
  );

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this Extra_option?")) {
      deleteData({ endpoint: endpoint, Id: row.original.extraOptionId });
    }
  };

  return (
    <div>
      <MDataTable
        headerTitle="Extra Options"
        add="Extra Option"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Extra Option"}
        handleViewClick={handleViewClick}
      />
      <ToastContainer />
    </div>
  );
}
export default ExtraOptions;
