import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { sidServices } from 'src/services/sidService'
import { ptypecodeServices } from 'src/services/PtypecodeServices'
import { ptFormatServices } from 'src/services/PTformatServices'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormLabel,
  CFormControl,
  CFormInput,
  CFormSelect,
  CSpinner,

} from '@coreui/react'
import  {CustomToast } from 'src/custom-components/custom-Toast/CustomToast'
import { PageTitle } from 'src/custom-components/Custom-title/PageTitle'
const SIDInfo = () => {
  const navigate = useNavigate();
  const [valueTypes, setpTypecode] = useState([]);
  const [pFormatCodes, setpFormatCode] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ title: '', text: '', color: 'light' });
  const [isLoading, setIsLoading] = useState(false);
  const [sid, setSid] = useState({});
  let { id,currentpage } = useParams();
  useEffect(() => {
    (async () => {
      const result = await ptypecodeServices.getPtypeCode();
      const result1= await ptFormatServices.getPTFormat();
      
      setpTypecode(result);
      setpFormatCode(result1);
      if (id) {
      
        await getSidInfo(id);
      }
    })();
    }, [])
    const getSidInfo = async (id) => {
      
       const sid = await sidServices.get(id);
       //console.log(sid);
      // //await getCitites(customer.provinceId);
       setSid(sid);
       reset(sid);
    }
    const save = async (data) => {
      setIsLoading(true);
      try {
  
        const formData = new FormData();
        Reflect.ownKeys(data).forEach(key => {
          if (data[key]) {
            formData.append(key, data[key]);
          }
        });
       //console.log(formData);
      if (id) {
        //update
        await sidServices.update(formData);
        setToastInfo({ title: 'بروزرسانی اطلاعات مشتری', text: 'انجام شد', color: 'success' });
      } else {
        await sidServices.insert(formData);
        setToastInfo({ title: 'افزودن مشتری جدید', text: 'انجام شد', color: 'success' });
       }
      setShowToast(true);
      setShowToast(false);
      
      navigate("/controlpanel/sidlist?currentpage="+currentpage);
    
    } catch(error)
    {
      setIsLoading(false);
      setToastInfo({ title: 'خطا در انجام عملیات', text: 'عملیات درخواستی با خطا مواجه شد', color: 'danger' });
    }
    }
    return (
      
      <>
      <PageTitle title="SID INFO"/>
      {showToast ? <CustomToast {...toastInfo} /> : null}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              SID Info
              <CButton className='mx-2' color="light" size="sm" onClick={() => navigate("/controlpanel/sidlist?currentpage="+(currentpage!=null?currentpage:1))}>
                PREV Page
              </CButton>
            </CCardHeader>
            <CCardBody>
              {/* {
              customer?.thumbnailBase64 ?
                <CCol md="12">
                  <img width="100" src={"data:image/png;base64," + customer.thumbnailBase64} />
                </CCol> : null
            }  */}

              <CForm className="row g-3" onSubmit={handleSubmit(save)}>
                <CCol md={4}>
                  <CFormLabel >parameterId</CFormLabel>
                  <CFormInput type="text" {...register('parameterId')} readOnly />
                </CCol>
                <CCol md={4}>
                  <CFormLabel >SId</CFormLabel>
                  <CFormInput  {...register('sId')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel>sidname</CFormLabel>
                  <CFormInput {...register('sidname')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel>Name</CFormLabel>
                  <CFormInput {...register('name')} />
                </CCol>
                <CCol md={4}>
                  <CFormLabel >MinValue</CFormLabel>
                  <CFormInput  {...register('minValue')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >MaxValue</CFormLabel>
                  <CFormInput {...register('maxValue')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel> PTCode</CFormLabel>
                  {/* onChange={e => getCitites(e.target.value)} */}
                  <CFormSelect {...register('ptCode')} >
                    <option>Choose Option</option>
                    {
                      valueTypes.map(item =>
                        <option key={item.ptcode} value={item.ptcode}>{item.ptvalue}</option>)
                    }
                  </CFormSelect>
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >PTFormat</CFormLabel>
                  <CFormSelect {...register('ptFormat')}>
                    <option>Choose Option </option>
                    {
                      pFormatCodes.map(item =>
                        <option key={item.pfCode} value={item.pfCode}>{item.pfValue}</option>)
                    }
                  </CFormSelect>
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >Multiplicand</CFormLabel>
                  <CFormInput {...register('multiplicand')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >Totalfact</CFormLabel>
                  <CFormInput {...register('totalfact')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >Defmode</CFormLabel>
                  <CFormInput {...register('defmode')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >PID</CFormLabel>
                  <CFormInput {...register('pid')} />
                </CCol>
                <CCol xs={12}>
                  <CButton type="submit" disabled={isLoading}>
                  {isLoading ? <CSpinner className="ml-2" component="span" size="sm" aria-hidden="true" /> : null}Save</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow></>
    )
  }

export default SIDInfo