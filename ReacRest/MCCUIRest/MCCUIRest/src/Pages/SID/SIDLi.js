import React, { useEffect } from 'react'
import { sidServices } from 'src/services/sidService'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
const SIDList = () => {
  const [data, setData] = React.useState([]);
  const [currentPage, setPage] = React.useState(1);
  const [sizePerPage, setSizePerPage] = React.useState(1);
  const [totalSize, setTotalSize] = React.useState(1);
  const navigate = useNavigate();
  const options = {
    // pageStartIndex: 0,
    //sizePerPage: 20,
    // hideSizePerPage: true,
     hidePageListOnlyOnePage: true,

     sizePerPageList: [{
      text: '25', value: 25
    }, {
      text: '50', value: 50
    }, {
      text: 'All', value: data.length
    }] 
  };
  const columns = React.useMemo(
    () => [
      
        {
         text : 'ParId',
          dataField: 'parameterId',
        },
        {
            text: 'SId',
            dataField: 'sId',
        },
        {
            text: 'Sidname',
            dataField: 'sidname',
        },
        {
          text: 'Name',
          dataField: 'name',
      },
      
      {
        text: 'MinValue',
        dataField: 'minValue',
    }, 
    {
      text: 'MaxValue',
      dataField: 'maxValue',
  }, 
  {
    text: 'Type',
    dataField: 'valueType',
},     {
    text: 'Size',
    dataField: 'pFormatCode',
},   
//  {
//   Header: 'PTCode',
//   accessor: 'ptcode',
// },
{
text: 'Multiplicand',
dataField: 'multiplicand',
},{
text: 'totalfact',
dataField: 'totalfact',
},{
text: 'Defmode',
dataField: 'defmode',
},{
text: 'PID',
dataField: 'pid',
},
])
   
  useEffect(() => {
    (async () => {
      const result = await sidServices.getAll();
      //console.log(result.data);
      setData(result);
      // await getData();
    })();

  }, [])

  return (

    <div> <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            SID LIST
          </CCardHeader>
          <CCardBody>
            {/* <CButton color="light" size="sm" onClick={() => navigate("/sale/customers/add")}>
                    افزودن آیتم جدید
                </CButton> */}
            {/* <CustomTable columns={columns}
                    data={data}/> */}
            <BootstrapTable keyField='id' data={data} columns={columns} pagination={paginationFactory(options)} striped />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow></div>


  )
}

export default SIDList