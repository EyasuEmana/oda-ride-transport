import React, { useState, useEffect } from "react";
import MDataTable1 from "../../MDataTable1";
import useDeleteData from "../../../../../store/hooks/useDeleteData";
import useGetData12 from "../../../../../store/hooks/airbook";
import usePostData from "../../../../../store/hooks/usePostData";
import usePutData from "../../../../../store/hooks/usePutData";
import { columns } from "./columns";
import { BACKEND_API } from "../../../../../store/utils/API";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Box, IconButton, Tooltip, Typography, CircularProgress } from "@mui/material";
import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";

function AirportBooks() {
  const navigate = useNavigate();
  const [airportBookId, setAirportBookId] = React.useState(null);
  
  // States
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  let endpoint = `/api/v1/airport-books`;

  // Filtering and sorting states
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  // Enhanced fetchData function
  const fetchData = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    try {
      const queryParams = new URLSearchParams({
        page: (pagination.pageIndex + 1).toString(), // Convert to 1-based for API
        pageSize: pagination.pageSize.toString(),
        sortDirection: sorting.length > 0 ? sorting[0].desc ? 'DESC' : 'ASC' : 'DESC',
        ...(sorting.length > 0 && { sortBy: sorting[0].id }),
        ...(globalFilter && { search: globalFilter }),
      });

      columnFilters.forEach(filter => {
        queryParams.append(`filter[${filter.id}]`, filter.value);
      });

      const response = await BACKEND_API.get(
        `/api/v1/airport-books?${queryParams.toString()}`
      );

      if (response.status === 200) {
        const { data: responseData, totalElements, totalPages, pageNumber } = response.data;
        
        // Update state with response data
        setData(responseData);
        setTotalElements(totalElements);
        setTotalPages(totalPages);
        
        // Ensure pagination state matches response
        if (pageNumber !== pagination.pageIndex + 1) {
          setPagination(prev => ({
            ...prev,
            pageIndex: pageNumber - 1 // Convert from 1-based to 0-based
          }));
        }
        
        setIsError(false);
        setErrorMessage("");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error?.response?.data?.message || "Failed to fetch data");
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array for initial load

  // Fetch data when pagination, filters, or sorting change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData();
    }, 300); // Debounce time for better performance

    return () => clearTimeout(debounceTimer);
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    columnFilters,
    globalFilter,
    sorting,
  ]);

  // Reset pagination when filters change
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      pageIndex: 0, // Reset to first page
    }));
  }, [columnFilters, globalFilter]);

  // Enhanced page change handler
  const handlePageChange = (direction) => {
    setPagination((prev) => {
      const newPage = prev.pageIndex + direction;
      
      // Validate new page number
      if (newPage < 0) return prev; // Can't go before first page
      if (newPage >= totalPages) return prev; // Can't go past last page
      
      // Update page index if valid
      return { 
        ...prev, 
        pageIndex: newPage 
      };
    });
  };

  // Enhanced jump to page handler
  const handleJumpToPage = (pageIndex) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: Math.min(Math.max(0, pageIndex), totalPages - 1)
    }));
  };

  // Handle page size change
  const handlePageSizeChange = (newSize) => {
    setPagination({
      pageIndex: 0,
      pageSize: newSize,
    });
  };

  // Custom pagination controls component
  const PaginationControls = () => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2,
      padding: '8px',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {/* Loading overlay */}
      {(isLoading || isRefetching) && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 1
        }}>
          <CircularProgress size={24} />
        </Box>
      )}

      {/* Navigation controls */}
      <Tooltip title="First Page">
        <span>
          <IconButton 
            onClick={() => handleJumpToPage(0)}
            disabled={pagination.pageIndex === 0 || isLoading}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
        </span>
      </Tooltip>
      
      <Tooltip title="Previous Page">
        <span>
          <IconButton 
            onClick={() => handlePageChange(-1)}
            disabled={pagination.pageIndex === 0 || isLoading}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </span>
      </Tooltip>

      <Box sx={{ 
        minWidth: '100px', 
        textAlign: 'center',
        fontWeight: 'medium'
      }}>
        Page {pagination.pageIndex + 1} of {totalPages}
      </Box>

      <Tooltip title="Next Page">
        <span>
          <IconButton 
            onClick={() => handlePageChange(1)}
            disabled={pagination.pageIndex >= totalPages - 1 || isLoading}
          >
            <KeyboardArrowRight />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Last Page">
        <span>
          <IconButton 
            onClick={() => handleJumpToPage(totalPages - 1)}
            disabled={pagination.pageIndex >= totalPages - 1 || isLoading}
          >
            <KeyboardDoubleArrowRight />
          </IconButton>
        </span>
      </Tooltip>

      {/* Page size selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">Items per page:</Typography>
        <select
          value={pagination.pageSize}
          onChange={(e) => {
            setPagination({
              pageIndex: 0,
              pageSize: Number(e.target.value),
            });
          }}
          disabled={isLoading}
          style={{
            padding: '4px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          {[10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </Box>

      <Typography variant="body2" color="textSecondary">
        Total: {totalElements} items
      </Typography>
    </Box>
  );

  const { mutate, isLoading: isLoadingPost, isError: isErrorPost, data: postData, isSuccess: isSuccessPost } = usePostData(endpoint);
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
      <MDataTable1
        headerTitle="Airport Books"
        add="Airport Book"
        openDeleteConfirmModal={openDeleteConfirmModal}
        handleNewAdd={handleNewAdd}
        handleEdit={handleEdit}
        editable={true}
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        isRefetching={isRefetching}
        title={"Airport Book"}
        handleViewClick={handleViewClick}
        // Pagination props
        enablePagination={true}
        rowCount={totalElements}
        pagination={pagination}
        onPaginationChange={setPagination}
        renderCustomPagination={() => <PaginationControls />}
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
          isLoading,
          showProgressBars: isRefetching,
          showAlertBanner: isError,
        }}
      />
      {isError && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          {errorMessage}
        </Typography>
      )}
      <ToastContainer />
    </div>
  );
}

export default AirportBooks;
