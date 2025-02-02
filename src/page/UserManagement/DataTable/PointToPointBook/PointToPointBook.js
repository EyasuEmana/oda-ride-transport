import React, { useState, useEffect } from "react";
import MDataTable1 from "../MDataTable1";
import useDeleteData from "../../../../store/hooks/useDeleteData";
import useGetData from "../../../../store/hooks/useGetData";
import usePostData from "../../../../store/hooks/usePostData";
import usePutData from "../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { useNavigate } from "react-router-dom";
import useGetData12 from "../../../../store/hooks/airbook";
import { ToastContainer } from "react-toastify";
function PointToPointBooks() {
  const [pointToPointBookId, setPointToPointBookId] = React.useState(null);
  const navigate = useNavigate();
  let endpoint = `/api/v1/point-to-point-books`;

    // Add pagination state
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
    });

    const [isRefetching, setIsRefetching] = useState(false);
    const [columnFilters, setColumnFilters] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState([]);

    const queryParams = {
      page: pagination.pageIndex + 1, // API expects 1-based index
      pageSize: pagination.pageSize,
      sortDirection: "DESC",
      filters: JSON.stringify(columnFilters),
      search: globalFilter,
      sort: sorting.length ? JSON.stringify(sorting) : undefined
    };

  const getendpoint = `/api/v1/point-to-point-books?${Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join("&")}`;

  const {
    data: response,
    isLoading: isLoadingGet,
    isError: isErrorGet,
    isFetching: isFetchingTax,
    error: errorGet,
  } = useGetData12(getendpoint);

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
  } = usePutData(endpoint, pointToPointBookId, data);

  const handleEdit = async ({ row, values, table }) => {
    update({
      endpoint: endpoint,
      Id: row.original.pointToPointBookId,
      data: values,
    });
    table.setEditingRow(null);
  };

  const handleViewClick = (rowData) => {
    navigate("/dashboard/book/p2pbook-detail", { state: { rowData } });
  };

  const { mutateAsync: deleteData, isPending: isDeleting } = useDeleteData(
    endpoint,
    pointToPointBookId
  );

  const openDeleteConfirmModal = (row) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Point to Point Book?"
      )
    ) {
      deleteData({
        endpoint: endpoint,
        Id: row.original.pointToPointBookId,
      });
    }
  };

  return (
    <div>
      <MDataTable1
        headerTitle="Point to Point Books"
        add="Point to Point Books"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response?.data || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        isRefetching={isRefetching}
        title={"Point to Point Book"}
        handleViewClick={handleViewClick}
        // Pagination props
        enablePagination={true}
        rowCount={response?.totalElements || 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        // Filtering props
        enableFiltering={true}
        enableColumnFilters={true}
        enableGlobalFilter={true}
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        // Sorting props
        enableSorting={true}
        onSortingChange={setSorting}
        manualSorting={true}
        state={{
          pagination,
          columnFilters,
          globalFilter,
          sorting,
          isLoading: isLoadingGet,
          showProgressBars: isRefetching,
          showAlertBanner: isErrorGet,
        }}
      />
            <ToastContainer />

    </div>
  );
}
export default PointToPointBooks;
