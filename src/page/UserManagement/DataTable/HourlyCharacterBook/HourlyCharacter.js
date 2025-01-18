import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";

import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import useGetData12 from "../../../../store/hooks/airbook";
import { ToastContainer } from "react-toastify";

function HourlyCharacter() {
  const [hourlyCharterBookId, setHourlyCharterId] = React.useState(null);
  const navigate = useNavigate();

  let endpoint = `/api/v1/hourly-charter-books`;
  const queryParams = {
    page: 1,
    pageSize: 7,
    sortDirection: "ASC",
    // Add other query parameters here
  };
  const getendpoint = `/api/v1/hourly-charter-books?${Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&")}`;

  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData12(getendpoint);

  console.log("object:", response);

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
  } = usePutData(endpoint, hourlyCharterBookId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.hourlyCharterBookId,
      data: values,
    });
    table.setEditingRow(null);
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/book/hourlybook-detail", { state: { rowData } });
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    hourlyCharterBookId
  );

  const openDeleteConfirmModal = (row) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Hourly Character Book?"
      )
    ) {
      deleteData({
        endpoint: endpoint,
        Id: row.original.hourlyCharterBookId,
      });
    }
  };

  return (
    <div>
      <MDataTable
        headerTitle="Hourly Character Booking"
        add="Hourly Character Book"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Hourly Character Book"}
        handleViewClick={handleViewClick}
      />
            <ToastContainer />

    </div>
  );
}
export default HourlyCharacter;
