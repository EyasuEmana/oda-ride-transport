import React from "react";
import MDataTable from "../../MDataTable";
import useDeleteData from "../../../../../store/hooks/useDeleteData";
import useGetData12 from "../../../../../store/hooks/airbook";
import usePostData from "../../../../../store/hooks/usePostData";
import usePutData from "../../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
function AirportBooks() {
  const [airportBookId, setAirportBookId] = React.useState(null);
  const navigate = useNavigate();
  let endpoint = `/api/v1/airport-books`;
  const queryParams = {
    page: 1,
    pageSize: 7,
    paymentStatus: "PAID",
    bookingStatus: "BOOKED",
    sortDirection: "ASC",
    // Add other query parameters here
  };

  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData12(queryParams);

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
  } = usePutData(endpoint, airportBookId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.airportBookId,
      data: values,
    });
    table.setEditingRow(null);
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/book/book-detail", { state: { rowData } });
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    airportBookId
  );
  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete Airport Book?")) {
      deleteData({ endpoint: endpoint, Id: row.original.airportBookId });
    }
  };

  return (
    <div>
      <MDataTable
        headerTitle="AirportBooks"
        add="Airport Book"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Airport Book"}
        handleViewClick={handleViewClick}
      />
    </div>
  );
}
export default AirportBooks;
