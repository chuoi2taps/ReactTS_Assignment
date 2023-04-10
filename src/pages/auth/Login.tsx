import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Checkbox, Form, Input, Upload, message } from 'antd';
import { ILogin } from '../../types/auth';
import { onLogin } from '../../api/user';



const Login = () => {

  const navigate = useNavigate()


  const onFinish = (values: ILogin) => {
    onLogin(values).then(({ data }: any) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userInfo', JSON.stringify(data.user));
      message.error(data.message)
    })
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        error.response.data.message
          ? message.error(error.response.data.message)
          : message.error('Lỗi không xác định')
      });
  }
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto", padding: "50px 0 0 0" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Hãy nhập vào input"
            },
            { whitespace: true, message: "Không được để khoảng trắng" },
          ]}
        >
          <Input />
          { }
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Hãy nhập vào input"
            },{ whitespace: true, message: "Không được để khoảng trắng" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='bg-blue-500' type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>


    </div>
  )
}

export default Login