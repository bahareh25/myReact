import React from 'react'
import {
    useGridApiContext,
   
  } from '@mui/x-data-grid';
  import Select from '@mui/material/Select';
 const CustomTypeEditComponent = (params) => {
    const { id, value, field, hasFocus } = params;
    const apiRef = useGridApiContext();
    const ref = React.useRef();
  
    /* React.useLayoutEffect(() => {
      if (hasFocus) {
        ref.current.focus();
      }
    }, [hasFocus]); */
    const handleChange = async (event) => {
      await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
      apiRef.current.stopCellEditMode({ id, field });
    };
    const handleValueChange = (event) => {
        
        const newValue = event.target.value; // The new value entered by the user
        apiRef.current.setEditCellValue({ id, field, value: newValue });
      
      };
      //console.log(params.row)
    if(params.row.DefaultValue.length===0){ 
      
    return (
        <input ref={ref} type="number" value={value}  onChange={handleValueChange} />
    )}
  else
  {
  
    return(
      <Select
      value={value}
      onChange={handleChange}
      size="small"
  
      sx={{ display: "flex" ,my:1}}//{ height: 1 }
      native
      autoFocus
    >
       <option value="0"><em>None</em></option>
      {params.row.DefaultValue.map((opt) =>(
      <option value={opt.code}>{opt.valuename}</option>
    ))}
    </Select>
    )
  }
}

export default CustomTypeEditComponent;