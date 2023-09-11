import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate,useParams } from 'react-router-dom'
import { cityServices } from 'src/services/cityService'
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
  CFormCheck,
  CSpinner,

} from '@coreui/react'
import { customerServices } from 'src/services/customerService'
import { CustomToast } from 'src/custom-components/custom-Toast/CustomToast'
const CustomerInfo = () => {
  
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastInfo, setToastInfo] = useState({ title: '', text: '', color: 'light' });
  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [customer, setCustomer] = useState({});
  let { id } = useParams();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: customer,
  });
  useEffect(() => {

    (async () => {
      const result = await cityServices.getProvinces();
      setProvinces(result)
      if (id) {
      
        await getCutomerInfo(id);
      }
    })();

  }, [])

  const getCutomerInfo = async (id) => {
    const customer = await customerServices.get(id);
    await getCitites(customer.provinceId);
    setCustomer(customer);
    reset(customer);
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
      if(data.thumbnail && data.thumbnail[0])
      {
        formData.append("thumbnail", data.thumbnail[0]);
      }
    if (id) {
      //update
      await customerServices.update(formData, id);
      setToastInfo({ title: 'بروزرسانی اطلاعات مشتری', text: 'انجام شد', color: 'success' });
    } else {
      await customerServices.insert(formData);
      setToastInfo({ title: 'افزودن مشتری جدید', text: 'انجام شد', color: 'success' });
    }
    setShowToast(true);
    setShowToast(false);

    navigate("/sale/customers");
  } catch(error)
  {
    setIsLoading(false);
    setToastInfo({ title: 'خطا در انجام عملیات', text: 'عملیات درخواستی با خطا مواجه شد', color: 'danger' });
  }
  }

  const getCitites = async (provinceId) => {
    setCities(await cityServices.getWithProvinceId(provinceId));

  }
  return (
    <>
      {showToast ? <CustomToast {...toastInfo} /> : null}
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
            اطلاعات مشتری {id}             
             <CButton color="light" size="sm" onClick={() => navigate("/sale/customers")}>
                بازگشت به صفحه قبل
              </CButton>
            </CCardHeader>
            <CCardBody>
            {
                customer?.thumbnailBase64 ?
                  <CCol md="12">
                    <img width="100" src={"data:image/png;base64," + customer.thumbnailBase64} />
                  </CCol> : null
              }
              
              <CForm className="row g-3" onSubmit={handleSubmit(save)}>
                <CCol md={4}>
                  <CFormLabel >کد مشتری</CFormLabel>
                  <CFormInput  type="text" {...register('customerCode')} />
                </CCol>
                <CCol md={4}>
                  <CFormLabel >نام</CFormLabel>
                  <CFormInput  {...register('firstName')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >نام خانوادگی</CFormLabel>
                  <CFormInput {...register('lastName')} />
                </CCol>
                <CCol md={4}>
                  <CFormLabel >استان</CFormLabel>
                  <CFormSelect {...register('provinceId')} onChange={e => getCitites(e.target.value)}>
                    <option>انتخاب کنید</option>
                    {
                      provinces.map(item =>
                        <option key={item.id} value={item.id}>{item.title}</option>)
                    }
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel>شهر</CFormLabel>
                  <CFormSelect {...register('cityId')}>
                    <option>انتخاب کنید</option>
                    {
                      cities.map(item =>
                        <option key={item.id} value={item.id}>{item.title}</option>)
                    }
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormLabel >موبایل</CFormLabel>
                  <CFormInput type="text" {...register('mobile')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >ایمیل</CFormLabel>
                  <CFormInput {...register('email')} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel>تصویر پرسنلی</CFormLabel>
                  <CFormInput type="file"  {...register("thumbnail")} />
                </CCol>
                <CCol xs={4}>
                  <CFormLabel >آدرس</CFormLabel>
                  <CFormInput {...register('address')} />
                </CCol>
                <CCol xs={12}>
                  <CButton type="submit" disabled={isLoading}>
                    {isLoading ? <CSpinner className="ml-2" component="span" size="sm" aria-hidden="true" /> : null}ذخیره</CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CustomerInfo


