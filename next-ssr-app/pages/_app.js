import '../styles/globals.css'
import 'antd/dist/antd.css'
import { ConfigProvider } from 'antd';
import CustomLayout from '../layout/CustomLayout';
function MyApp({ Component, pageProps }) {
  return (<ConfigProvider direction="rtl">
  <CustomLayout>
    <Component {...pageProps} />
  </CustomLayout>
</ConfigProvider>)
  
}

export default MyApp
