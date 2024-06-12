import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import CustomTypeEditComponent from "./CustomTypeEditComponent";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {

  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { useEffect } from "react";



const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};
/* const StyledBox = styled('div')(({ theme }) => ({
  // height: 300,
 
  width: '100%',
  '& .MuiDataGrid-cell--editing': {
    backgroundColor: 'rgb(255,215,115, 0.19)',
    color: '#1a3e72',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
    color: theme.palette.error.main,
  },
})); */

/* const initialRows = [
  {
    id: 1,
    paramname: 'p1',
    paramval: '',
    minvalue:0,
    maxvalue:10,

  },
  {
    id: 2,
    paramname: 'p2',
    paramval: '',
    minvalue:0,
    maxvalue:10,
  },

]; */

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  /* return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  ); */
}

const MUITable = ({ telparmlist, selectedindex,changedata}) => {

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  useEffect(() => {
    

  }, []);
  useEffect(() => {
    if (typeof telparmlist[selectedindex] != "undefined" && telparmlist[selectedindex].parameters.length != 0) {
      var t=telparmlist[selectedindex].parameters;
      setRows(t);
     // console.log(t);
    }
    else{
      setRows([]);
      
    }
  }, [selectedindex]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    
    
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    const index=rows.findIndex(q=>q.id==newRow.id);
    telparmlist[selectedindex].parameters[index].paramval=newRow.paramval;
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  

  const columns = [
    {
      field: "#",
      headerName: "number",
      filterable: false,
      width: 15,
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,      //(index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: "paramname",
      headerName: "Name",
      width: 100, editable: false
    },
    {
      field: "paramval",
      headerName: "paramval",
      //type: "number",
      width: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = (params.props.value<params.row.minvalue ||  params.props.value> params.row.maxvalue);
        if(hasError)
          {
            let message=`value must be between ${params.row.minvalue} and ${params.row.maxvalue}`;
           Swal.fire({
            position: "top-end",
              //icon: "error",
              background: "#ccf",
              title: "errors",
              text: message,
           
            })}
        return { ...params.props, error: hasError };
      },
      valueFormatter: (params,row) => {

      
         if(row.DefaultValue.length!=0){
         
        return row.DefaultValue.find((option) => option.code == row.paramval)?.valuename; }
      },
      /* renderCell:(params) =>{ if(params.row.DefaultValue.length!=0){
                              //return<CustomTypeEditComponent {...params} />
                              return params.row.DefaultValue.find((option) => option.code == params.row.paramval)?.valuename;} }, */
      renderEditCell: (params) => <CustomTypeEditComponent {...params} />,
    },
/* 
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }, */
  ];

  return (
    
    <Box
      sx={{ display: "flex" }}
    /*  sx={{
       height: 500,
       width: "100%",
       "& .actions": {
         color: "text.secondary",
       },
       "& .textPrimary": {
         color: "text.primary",
       },
     }} */
    >
      {/* <StyledBox sx={{ display: "flex" }}> */}
      <DataGrid
        rows={rows}
        columns={columns}
         editMode="row"
         rowModesModel={rowModesModel}
         onRowModesModelChange={handleRowModesModelChange}
         onRowEditStop={handleRowEditStop}
         processRowUpdate={processRowUpdate}
        hideFooter
        autoHeight
        slots={{
          // toolbar: EditToolbar,
          columnHeaders: () => null,

        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      {/* </StyledBox> */}
    </Box>
  );
}
export default MUITable;