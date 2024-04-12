import React from "react";
import MDataTable from "../../MDataTable";
import useDeleteData from "../../../../../store/hooks/useDeleteData";
import useGetData from "../../../../../store/hooks/useGetData";
import usePostData from "../../../../../store/hooks/usePostData";
import usePutData from "../../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";

function AirportpickupPreference() {
  const [pickupPreferenceId, setPickupPreferenceId] = React.useState(null);
  const navigate = useNavigate();

  let endpoint = `/api/v1/airport/pickup-preference`;
  

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
  } = usePutData(endpoint,pickupPreferenceId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.pickupPreferenceId,
      data: values,
    });
    table.setEditingRow(null);
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(endpoint, pickupPreferenceId);

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this Airport pickup preference?")) {
      deleteData({ endpoint: endpoint, Id: row.original.pickupPreferenceId });
    }
  };

  const handleViewClick = (rowData) =>{
    navigate('/dashboard/airport/pickup-prference',{state:{rowData}})
  }

  return (
    <div>
      <MDataTable
        headerTitle="Airport pickup preferences"
        add="Airport pickup preference"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Airport pickup preference"}
        handleViewClick={handleViewClick}
      />
    </div>
  );
}
export default AirportpickupPreference;
