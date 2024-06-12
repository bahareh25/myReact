import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { LastPageTwoTone } from '@mui/icons-material';
import { Divider, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState,useEffect } from 'react'
import { PageTitle } from 'src/custom-components/Custom-title/PageTitle';
import MUITable from 'src/custom-components/custom-grid/MUITable';

import PUSListbox from 'src/custom-components/custom-listbox/PUSListbox';
import TelecommandListBox from 'src/custom-components/custom-listbox/TelecommandListBox';

const getCustomOptions = () => {


  const items = [
    {
      id: 1,
      title: "Some Chart option 1",
      subMenu: [{ id: 1, title: "some subMenu 1",parameters:[{id:1,paramname:"p1",paramval:0,minvalue:0,maxvalue:10,DefaultValue:[{code:1,valuename:"test1"},{code:2,valuename:"test2"}]},{id:2,paramname:"p3",paramval:0,minvalue:0,maxvalue:10,DefaultValue:[{code:1,valuename:"test3"},{code:2,valuename:"test4"}]}] }, { id: 2, title: "some subMenu 2" ,parameters:[]}],
    },
    {
      id: 2,
      title: "Some Chart option 2",
      subMenu: [{ id: 5, title: "some subMenu 5",parameters:[{id:3,paramname:"p2",paramval:0,minvalue:0,maxvalue:10,DefaultValue:[{code:1,valuename:"test5"},{code:2,valuename:"test6"}]}] }],
    },
    {
      id: 3,
      title: "Some Chart option 3",
      subMenu: [{ id: 3, title: "some subMenu 3",parameters:[{id:4,paramname:"p1",paramval:0,minvalue:0,maxvalue:10,DefaultValue:[]}]}],
    },
    {
      id: 4,
      title: "Some Chart option 4",
      subMenu: [{ id: 4, title: "some subMenu 4" ,parameters:[]}],
    },
  ];
  return items;
};
const OnlineCommandContainer = () => {
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedTelecommand, setselectedTelecommand] = useState();
  const [tempTelecommand, settempTelecommand] = useState();
  const [LastTelecommandList, setLastTelecommandList] = useState([]);
  const items = getCustomOptions();
 /* useEffect(() => {
   
      
      
      console.log("2", LastTelecommandList[selectedTelecommand].parameters);
  
    
  }, [selectedTelecommand])  */
  const handleTelClick = (event, index) => {
    setselectedTelecommand(index);
   // console.log(index);
   // console.log("2", LastTelecommandList[selectedTelecommand].parameters)
    
  };

  const handleUp=()=>{
    if(selectedTelecommand!=0)
      {let tempvar=LastTelecommandList[selectedTelecommand-1];
        LastTelecommandList[selectedTelecommand-1]=LastTelecommandList[selectedTelecommand];
        LastTelecommandList[selectedTelecommand]=tempvar;
        setselectedTelecommand(selectedTelecommand-1);
      }

    setLastTelecommandList([...LastTelecommandList]);
    
  }
  const handleDown=()=>{
    if(selectedTelecommand!=LastTelecommandList.length-1)
      {let tempvar=LastTelecommandList[selectedTelecommand+1];
        LastTelecommandList[selectedTelecommand+1]=LastTelecommandList[selectedTelecommand];
        LastTelecommandList[selectedTelecommand]=tempvar;
        setselectedTelecommand(selectedTelecommand+1);
      }
    setLastTelecommandList([...LastTelecommandList]);
    
  }
  const handleDeleteTel=()=>{
    LastTelecommandList.splice(selectedTelecommand,1);
    setLastTelecommandList([...LastTelecommandList]);
    
  }
  const handleClick1 = (event, subitem) => {
    setSelectedIndex(subitem.id);
    settempTelecommand(subitem);
  };
  const handleSentCommandRight = () => {

    setLastTelecommandList([...LastTelecommandList,tempTelecommand]);

  };
  const changedata=(index,value)=>{
    LastTelecommandList[index].parameters.paramval=value;
  };
  return (

    <>
      <PageTitle title="OnLine Command" />
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              Online Command
            </CCardHeader>
            <CCardBody>
              <Grid container spacing={1} justifyContent="left" alignItems="center">
                <Grid item><PUSListbox items={items} handleClick1={handleClick1} selectedIndex={selectedIndex} /></Grid>
                <Grid item>
                   <Grid container direction="column" alignItems="center"> 
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleSentCommandRight}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>

                  </Grid> 
                </Grid>
                <Grid item><TelecommandListBox telList={LastTelecommandList} handleTelClick={handleTelClick} selectedIndex={selectedTelecommand}/> </Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                       onClick={handleUp}
                     // aria-label="move selected right"
                    >
                      &and;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                       onClick={handleDown}
                     // aria-label="move selected down"
                    >
                      &or;
                    </Button>
                    <Button
                      sx={{ my: 0.5 }}
                      variant="outlined"
                      size="small"
                       onClick={handleDeleteTel}
                      //aria-label="move selected "
                    >
                      Delete
                    </Button>
                  </Grid>
                 
                </Grid>
                <Grid item> <MUITable telparmlist={LastTelecommandList} selectedindex={selectedTelecommand} changedata={changedata} /></Grid>
              </Grid>
           
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default OnlineCommandContainer;