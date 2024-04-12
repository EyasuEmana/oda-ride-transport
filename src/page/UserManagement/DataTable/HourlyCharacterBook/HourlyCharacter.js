import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";

function HourlyCharacter() {
  const [hourlyCharacterId, setHourlyCharacterId] = React.useState(null);
  const navigate = useNavigate();

  let endpoint = `/api/v1/hourly-charter-books`;
  

  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData(endpoint);

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
  } = usePutData(endpoint, hourlyCharacterId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.hourlyCharacterId,
      data: values,
    });
    table.setEditingRow(null);
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/book/hourlybook-detail", { state: { rowData } });
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(endpoint,hourlyCharacterId);

  const openDeleteConfirmModal = (row) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Hourly Character Book?"
      )
    ) {
      deleteData({
        endpoint: endpoint,
        Id: row.original.hourlyCharacterId,
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
    </div>
  );
}
export default HourlyCharacter;
