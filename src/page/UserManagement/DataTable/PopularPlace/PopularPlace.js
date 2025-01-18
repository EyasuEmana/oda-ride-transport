import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { columns } from "./Columns";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function PopularPlaces() {
  const [popularPlaceId, setPopularPlaceId] = React.useState(null);
  const navigate = useNavigate();

  let endpoint = `/api/v1/popular-places`;
  let getendpoint = `/api/v1/popular-places/all`;


  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData(getendpoint);

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
  } = usePutData(endpoint, popularPlaceId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.popularPlaceId,
      data: values,
    });
    table.setEditingRow(null);
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    popularPlaceId
  );

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this popular place?")) {
      deleteData({ endpoint: endpoint, Id: row.original.popularPlaceId });
    }
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/popular-places", { state: { rowData } });
  };
  return (
    <div>
      <MDataTable
        headerTitle="Popular Places"
        add="Popular Places"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Popular Places"}
        handleViewClick={handleViewClick}
      />
      <ToastContainer />
    </div>
  );
}
export default PopularPlaces;
