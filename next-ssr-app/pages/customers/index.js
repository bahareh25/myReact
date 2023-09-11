import Head from 'next/head'
import axios from 'axios'
import { Card, Row, Col, Divider} from 'antd';
import Link from 'next/link'

const style = { background: '#0092ff', padding: '8px 0' };
const { Meta } = Card;

export default function CustomerList({ customrs }) {
    return (
        <div>
            <Head>
                <title>لیست مشتریان</title>
            </Head>
            <Divider orientation="center">لیست مشتریان</Divider>
            <Row gutter={16}>
                {customrs.map(item =>
                    <Col className="gutter-row" span={6}>
                        <Link href={`/customers/${item.id}`}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" src={`data:image/png;base64,${item.thumbnailBase64}`} />}
                            >

                                <Meta title={item.firstName + ' ' + item.lastName} description={item.provinceName + ' ' + item.cityName} />
                            </Card>
                        </Link>
                    </Col>
                )}
            </Row>

        </div>
    )
}

// export async function getStaticProps() {
//     const url = 'https://localhost:5001/customers';
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//     var result = await axios.get(url);

//     return {
//         props: {
//             customrs: result.data.data,
//         },
//         revalidate:30,
//     }
// }


export async function getServerSideProps(context) {
    const url = 'https://localhost:5001/customers';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    var result = await axios.get(url);

    return {
        props: {
            customrs: result.data.data,
        }
    }
  }