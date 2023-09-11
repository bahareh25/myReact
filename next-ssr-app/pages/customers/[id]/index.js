import Head from 'next/head'
import axios from 'axios'
import { Card, Avatar, Divider, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link'

const { Meta } = Card;

export default function CustomerInfo({ customer }) {
  return (
    <div>
      <Head>
        <title>{customer.firstName + ' ' + customer.lastName}</title>
      </Head>
      <Divider orientation="center">مشخصات مشتری</Divider>
      <Row gutter={16}>
        <Col className="gutter-row" span={4}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt={customer.firstName + ' ' + customer.lastName}
                src={`data:image/png;base64,${customer.thumbnailBase64}`}
              />
            }
            actions={[
              <Link href="/customers" >
                <ArrowRightOutlined key="setting" />
              </Link>
            ]}
          >
            <Meta
              avatar={<Avatar src={`data:image/png;base64,${customer.thumbnailBase64}`} />}
              title={customer.firstName + ' ' + customer.lastName}
              description={customer.provinceName + ' ' + customer.cityName}
            />
          </Card>
        </Col>
      </Row>

    </div>
  )
}

export async function getStaticPaths() {
  const url = 'https://localhost:5001/customers';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  var result = await axios.get(url);
  var customers = result.data.data;

  const paths = customers.map((customer) => ({
    params: { id: customer.id.toString() },
  }))
  return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
  const url = `https://localhost:5001/Customers/` + params.id;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const result = await axios.get(url);
  const customer = result.data;

  return { props: { customer } }
}