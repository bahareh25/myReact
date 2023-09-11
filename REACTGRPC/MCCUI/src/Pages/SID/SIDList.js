import React from 'react'
import {SIDClient} from 'src/Repository/Protos/v1/SIDContract_grpc_web_pb'
import {SIDModel,SIdResponse} from 'src/Repository/Protos/v1/SIDContract_pb'
import {
  CCard,
  CCardBody,
  CCardtext,
  CCol,
  CRow,
  CButton,
  CHeaderText,
  CCardHeader,

} from '@coreui/react'
import { CustomTable } from 'src/Custom-Components/Custom-grid/CustomTable'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useEffect } from 'react'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import { json } from 'react-router-dom'
import { rest } from 'lodash'
const SIDList = () => {
  const AspURL = "https://localhost:7016";
  const sidclient=new SIDClient(AspURL);
  const [data, setData] = React.useState([]);
  const [data1, setData1] = React.useState([]);
  // const data = React.useMemo(() => [
  //       { firstName: 'ali', lastName: 'rezaei', age: 20 },
  //       { firstName: 'ali', lastName: 'rezaei', age: 20 },
  //       { firstName: 'ali', lastName: 'rezaei', age: 20 },
  //       { firstName: 'ali', lastName: 'rezaei', age: 20 },
  //   ])
  useEffect( () => {
    (async () => {
      var request=new Empty();
     
      const streamingCall = await sidclient.getSidList(request,{});
      setData([]);
      streamingCall.on('data', function (response) {
      
        
        
       // console.log(response.getParameterid());
      // console.log(response.toObject());
       data.push(response.toObject());
         //setData([data]);
       
       });
   
       streamingCall.on('end', function () {
          // console.log('end');
           // console.log(data);
           setData(data);
           
        });
      
  })();
  

  }, [])
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
            dataField: 'parameterid',
          },
          {
              text: 'SId',
              dataField: 'sid',
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
          dataField: 'minvalue',
      }, 
      {
        text: 'MaxValue',
        dataField: 'maxvalue',
    }, 
    {
      text: 'Type',
      dataField: 'valuetype',
  },     {
      text: 'Size',
      dataField: 'ptformat',
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
                 <BootstrapTable keyField='id' data={ data } columns={ columns } pagination={ paginationFactory(options) } striped />
            </CCardBody>
        </CCard>
    </CCol>
</CRow></div>
  )
}

export default SIDList