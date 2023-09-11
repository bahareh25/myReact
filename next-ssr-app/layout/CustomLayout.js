import { Layout, Menu, Breadcrumb } from 'antd';
import Link from 'next/link'
const { Header, Content, Footer } = Layout;

export default function CustomLayout({ children }) {

   return(
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" >
              <Menu.Item key="1"><Link href="/">صفحه اصلی</Link></Menu.Item>
              <Menu.Item key="2"><Link href="/customers">لیست مشتریان</Link></Menu.Item>
              <Menu.Item key="3"><Link href="/login">نمونه فرم ثبت داده</Link></Menu.Item>
            </Menu>
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>نمونه وب سایت با Nextjs</Footer>
        </Layout>
      );
}
