import React, { useState } from "react";
import MDataTable1 from "../MDataTable1";
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


  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isRefetching, setIsRefetching] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  let endpoint = `/api/v1/hourly-charter-books`;
  const queryParams = {
    page: pagination.pageIndex + 1, // API expects 1-based index
    pageSize: pagination.pageSize,
    sortDirection: "DESC",
    filters: JSON.stringify(columnFilters),
    search: globalFilter,
    sort: sorting.length ? JSON.stringify(sorting) : undefined
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
      <MDataTable1
        headerTitle="Hourly Charter Booking"
        add="Hourly Charter Book"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={response?.data || []}
        isLoading={isLoadingGet}
        isError={isErrorGet}
        isRefetching={isRefetching}
        title={"Hourly Charter Book"}
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
export default HourlyCharacter;
