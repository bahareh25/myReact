
import Head from "next/head";
import axios from "axios";
import {Form,Input,Button,Checkbox} from 'antd';
import { useRouter } from "next/router";
export default function Login(){
    const router = useRouter()
    const onFinish = async (values) => {
        const url = "https://localhost:5001/api/Authenticate";
        const response = await axios.post(url, values);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        //redirect to customer list page
        router.push('/customers');
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div className="login-form">
          <Head>
            <title>فرم ورود</title>
          </Head>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="نام کاربری"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'نام کاربری را وارد کنید',
                },
              ]}
            >
              <Input />
            </Form.Item>
    
            <Form.Item
              label="رمز عبور"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'رمز عبور را وارد کنید',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
    
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>مرا به خاطر بسپار</Checkbox>
            </Form.Item>
    
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                ورود به سامانه
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
}