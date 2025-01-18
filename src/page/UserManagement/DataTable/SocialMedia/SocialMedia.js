import React from "react";
import MDataTable from "../MDataTable";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { useNavigate } from "react-router-dom";
import { columns } from "./columns";
import { ToastContainer } from "react-toastify";

function SocialMedia() {
  const [socialMediaId, setSocialMediaId] = React.useState(null);
  let endpoint = `/api/v1/social-medias/all`;
  let postendpoint = `/api/v1/social-medias`;
  let putendpoint = `/api/v1/social-medias`;

  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData(endpoint);
  const navigate = useNavigate();

  const { mutate, isLoading, isError, data, isSuccess } =
    usePostData(postendpoint);
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
  } = usePutData(putendpoint, socialMediaId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: putendpoint,
      Id: row.original.socialMediaId,
      data: values,
    });
    table.setEditingRow(null);
  };
  const handleViewClick = (rowData) => {
    navigate("/dashboard/social/social-detail", { state: { rowData } });
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    socialMediaId
  );

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this Social Media?")) {
      deleteData({ endpoint: endpoint, Id: row.original.socialMediaId });
    }
  };

  return (
    <div>
      <MDataTable
        headerTitle="Social Media"
        add="Social Media"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        title={"Social Media"}
        handleViewClick={handleViewClick}
      />
      <ToastContainer />
    </div>
  );
}
export default SocialMedia;
