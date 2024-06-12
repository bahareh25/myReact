import React,{useEffect} from 'react'
import { sidServices } from 'src/services/sidService'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
  
} from '@coreui/react'
import { useNavigate,useLocation} from 'react-router-dom';
import CustomBootstrapTable from 'src/custom-components/custom-grid/CustomBootstrapTable'
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import queryString from 'query-string';
import { PageTitle } from 'src/custom-components/Custom-title/PageTitle';
const SIDList = (props) => {
    const [data, setData] = React.useState([]);
    const location = useLocation();
    const params = queryString.parse(location.search);
    let  currentpage  =(params.currentpage!=null?params.currentpage:1) ;
    const [currentPage, setPage] = React.useState(1);
    const [sizePerPage, setSizePerPage] = React.useState(1);
    const [totalSize, setTotalSize] = React.useState(1);
    const navigate = useNavigate();
    useEffect(() => {
         getData(currentpage);     
         
    }, [])
    const getData = async (page = 1, itemCount = 20) => {
        const result = await sidServices.getAll({ page, itemCount });
        setData(result.data);
        setPage(result.page);
        setSizePerPage(result.sizePerPage);
        setTotalSize(result.totalSize);
    }

    const removeItem = async (id) => {

        Swal.fire({
          title: 'در صورت حذف قابل بازیابی نمی باشد',
          showCancelButton: true,
          confirmButtonText: `تایید`,
          cancelButtonText: `انصراف`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            await sidServices.delete(id);
            await getData(currentPage, sizePerPage);
          }
        })
    }
    const handleTableChange = async (type, { page, sizePerPage }) => {
        await getData(page, sizePerPage);
      }
    const columns = React.useMemo(
        () => [
            {
                dataField: '#',
                text: '#',
                formatter: (cell, row, rowIndex) => {
                    let rowNumber = (currentPage - 1) * sizePerPage + (rowIndex + 1);                   
                    return (
                        <div> 
                            {rowNumber}
                        </div>
                    )
            }},
            {
                text: 'ParId',
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
                style:{fontSize:'12px'},
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
            }, {
                text: 'Size',
                dataField: 'pFormatCode',
            },
            //  {
            //   Header: 'PTCode',
            //   accessor: 'ptcode',
            // },
            {
                text: 'Multi',
                dataField: 'multiplicand',
                style:{fontSize:'10px'},
            }, {
                text: 'Sum',
                dataField: 'totalfact',
            }, {
                text: 'Defmode',
                dataField: 'defmode',
            }, {
                text: 'PID',
                dataField: 'pid',
            },
            {
                dataField: 'inStock',
                text: 'In Stock',
                formatter: (cellContent, row) => (
                    <div>
                        <CButton onClick={() => navigate('/SID/edit/' + row.parameterId+'/'+currentPage)} color='light' size="sm" shape="rounded-pill">
                              <CIcon icon="cil-pencil" className="me-2" />  
                            Edit
                        </CButton>
                        <CButton onClick={async () => await removeItem(row.parameterId)} color='danger' size="sm" shape="rounded-pill">
                            <CIcon icon="cil-drop" className="me-2" /> 
                            Delet
                        </CButton>
                    </div>
                )
            },
        ]);
        const rowStyle = { fontSize:'12px' };
    return (
        <div> 
            <PageTitle title="SID List"/>
            <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                    SID LIST 
                    </CCardHeader>                                      
                    <CCardBody>
                        <CButton  className='my-2' color="light" size="sm" onClick={() => navigate('/SID/add')}>
                      ADD SID
                  </CButton>
                 
                        {/* <CustomTable columns={columns}
                      data={data}/> */}
                        <CustomBootstrapTable
                            KeyField="parameterId"
                            columns={columns}
                            rowStyle={rowStyle}
                            data={data}
                            page={currentPage}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            onTableChange={handleTableChange}
                        />
                     
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow></div>
    )

}
export default SIDList