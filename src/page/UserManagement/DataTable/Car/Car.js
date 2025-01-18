import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import MyComponent, { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Cars() {
  const [carId, setCarId] = React.useState(null);
  const navigate = useNavigate();

  let endpoint = `/api/v1/cars`;
  let getendpoint = `/api/v1/cars/all`;


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
  } = usePutData(endpoint, carId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.carId,
      data: values,
    });
    table.setEditingRow(null);
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    carId
  );

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this Car?")) {
      deleteData({ endpoint: endpoint, Id: row.original.carId });
    }
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/car/cardetails", { state: { rowData } });
  };
  return (
    <div>
      <MDataTable
        headerTitle="Cars"
        add="Car"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Car"}
        handleViewClick={handleViewClick}
      />
      <ToastContainer />
    </div>
  );
}
export default Cars;
