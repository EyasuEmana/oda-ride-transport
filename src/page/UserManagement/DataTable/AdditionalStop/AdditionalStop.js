import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";

function AddtionalStop() {
  const [additionalStopId, setAdditionalStopId] = React.useState(null);
  const navigate = useNavigate();

  let endpoint = `/api/v1/additional-stops`;

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
  } = usePutData(endpoint, additionalStopId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.additionalStopId,
      data: values,
    });
    table.setEditingRow(null);
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/additionalstop/additional-stop-detail", { state: { rowData } });
  };
  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    additionalStopId
  );

  const openDeleteConfirmModal = (row) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Addtional Stop?"
      )
    ) {
      deleteData({
        endpoint: endpoint,
        Id: row.original.additionalStopId,
      });
    }
  };

  return (
    <div>
      <MDataTable
        headerTitle="Addtional Stop"
        add="Addtional Stop"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Addtional Stop"}
        handleViewClick={handleViewClick}

      />
    </div>
  );
}
export default AddtionalStop;
