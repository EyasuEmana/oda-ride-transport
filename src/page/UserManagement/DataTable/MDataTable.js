import React, { useState } from "react";
import { useMemo } from "react";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { AccountCircle, DeleteForever, Share } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});
const MDataTable = (props) => {
  const navigate = useNavigate();
  const columns = useMemo(() => props.columns, []);
  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(props?.data);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns: columns,
    data: props.data,
    createDisplayMode: props?.createDisplayMode,
    editDisplayMode: props?.editDisplayMode,
    positionActionsColumn: "last",
    enableEditing: props?.editable,
    enableRowActions: props?.enableRowActions,
    enableStickyHeader: false,
    enableTopToolbar: props.enableTopToolbar,
    enableRowSelection: props?.enableRowSelection,
    onCreatingRowSave: props?.handleNewAdd,
    onEditingRowSave: props?.handleEdit,
    getRowId: (row) => row?.id,
    onRowSelectionChange: props?.setRowSelection,
    renderDetailPanel: props?.renderDetailPanel,
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
      autoFocus: false,
      color: "",
    },
    positionPagination: "top",
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "circular",
      variant: "outlined",
    },
    muiTableHeadCellProps: {
      align: "center",
      sx: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: "14px",
        color: "black",
        textAlign: "center",
      },
    },
    muiTableBodyProps: {
      sx: {
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "whiteSmoke",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "13px",
        padding: "2px",
        fontFamily: "Roboto",
        borderRight: "1.5px solid #EDE7E7",
        textAlign: "center",
      },
    },
    muiTablePaperProps: {
      sx: {
        borderRadius: "0",
        border: "none",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      },
    },
    renderCreateRowDialogContent: props?.add
      ? ({ table, row, internalEditComponents }) => {
          console.log("internalEditComponents", internalEditComponents);

          return (
            <>
              <DialogTitle variant="h5">{props?.title}</DialogTitle>
              <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                {internalEditComponents}
              </DialogContent>
              <DialogActions>
                <MRT_EditActionButtons variant="text" table={table} row={row} />
              </DialogActions>
            </>
          );
        }
      : () => {},

    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h5">Edit Created {props?.add}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),

    renderRowActionMenuItems: ({ table, closeMenu, row }) => [
      <MenuItem
        hidden={props?.handleViewClick ? "" : true}
        key={1}
        onClick={() => {
          props.handleViewClick(row.original); // Call the navigation function with the row data
          closeMenu();
        }}
      >
        <AccountCircle /> View
      </MenuItem>,
      //   <MenuItem
      //   hidden={props?.handleManageClick ? "" : true}
      //   key={2}
      //   onClick={() => {
      //     props.handleManageClick(row.original); // Call the navigation function with the row data
      //     closeMenu();
      //   }}
      // >
      //   <ManageAccountsIcon /> Manage
      // </MenuItem>,
      <MenuItem
        hidden={props?.openDeleteConfirmModal ? "" : true}
        key={3}
        onClick={() => props?.openDeleteConfirmModal(row)}
      >
        <DeleteForever /> Delete
      </MenuItem>,
    ],

    renderTopToolbarCustomActions: props?.add
      ? ({ table }) => (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "96px",
                padding: "8px",
                flexWrap: "wrap",
              }}
            >
              {props.title === "Air ports" ? (
                <Button
                  // variant="contained"
                  sx={{
                    color: "black",
                    backgroundColor: "info.main",
                    backgroundColor: "green",
                  }}
                  onClick={() => {
                    navigate("/dashboard/add-airport");
                  }}
                >
                  {`Add NEW AIRPORT`}
                </Button>
              ) : props.title == "Car" ? (
                <Button
                  // variant="contained"
                  sx={{
                    color: "black",
                    backgroundColor: "info.main",
                    backgroundColor: "green",
                  }}
                  onClick={() => {
                    navigate("/dashboard/add-car");
                  }}
                >
                  {`Add NEW CAR`}
                </Button>
              ) : (
                <Button
                  // variant="contained"
                  sx={{
                    color: "black",
                    backgroundColor: "info.main",
                    backgroundColor: "green",
                  }}
                  onClick={() => {
                    table.setCreatingRow(true);
                  }}
                >
                  {`Add NEW ${props?.add}` || "ADD NEW ENTITY"}
                </Button>
              )}

              <Button
                sx={{
                  color: "black",
                  backgroundColor: "info.main",
                  backgroundColor: "green",
                }}
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                style={{ color: "black" }}
              >
                Export All Data
              </Button>

              <Button
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                sx={{
                  color: "black",
                  backgroundColor: "info.main",
                  backgroundColor: "green",
                }}
                onClick={() =>
                  handleExportRows(table.getSelectedRowModel().rows)
                }
                startIcon={<FileDownloadIcon />}
              >
                Export Selected Rows
              </Button>
            </Box>
          </Box>
        )
      : () => {},
    renderBottomToolbar: () => {
      return (
        <Typography
          style={{
            color: "green",
            fontSize: "20px",
            fontFamily: "Roboto",
            padding: "10px",
            textAlign: "right",
          }}
        >
          Oda Transportation.
        </Typography>
      );
    },
    muiSearchTextFieldProps: {
      InputLabelProps: {
        shrink: true,
      },
      label: "",
      size: "small",
      variant: "standard",
    },
    initialState: {
      showGlobalFilter: true,
    },

    state: {
      rowSelection: props.rowSelection || {},
      isLoading: props?.isLoading,
      showProgressBars: props.isRefetching,
      isSaving: props.isSaving,
      showAlertBanner: props.isError,
    },
  });

  return (
    <div>
      <Typography
        style={{
          color: "green",
          fontFamily: "Roboto",
          background: "white",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "530",
          fontStyle: "normal",
          background: "whiteSmoke",
          display: "flex",
          justifyContent: "start",
        }}
      >
        {props.headerTitle}
      </Typography>
      <MaterialReactTable table={table} />
    </div>
  );
};
MDataTable.defaultProps = {};
export default MDataTable;
