import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Gratuity() {
  const [gratuityId, setGratuityId] = React.useState(null);
  const navigate = useNavigate();

  let endpoint = `/api/v1/gratuities`;
  let endpointget = `/api/v1/gratuities/all`;


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
  } = usePutData(endpoint, gratuityId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.gratuityId,
      data: values,
    });
    table.setEditingRow(null);
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    gratuityId
  );

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this Gratuity?")) {
      deleteData({ endpoint: endpoint, Id: row.original.gratuityId });
    }
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/gratuity/gratuity-details", { state: { rowData } });
  };
  return (
    <div>
      <MDataTable
        headerTitle="Gratuities"
        add="Gratuity"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Gratuity"}
        handleViewClick={handleViewClick}
      />
      <ToastContainer />
    </div>
  );
}
export default Gratuity;
