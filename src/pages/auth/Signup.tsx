import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Checkbox, Form, Input, Upload,message} from 'antd';
import { IRegister } from '../../types/auth';
import { onRegister } from '../../api/user';
const Register = () => {
    const navigate = useNavigate()

    const onFinish = (values:IRegister)=>{
        onRegister(values).then(({ data }: any) => {
          message.success(data.message)
      })
      .then(() => {
          navigate('/auth/login')
      })
      .catch(({response}) => {
        message.error(response.data.message)
      });
    }
  
  return (
    <div>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[
            {required: true,
            message: "Hãy nhập vào tên"},
            {whitespace:true, message:"Không được để khoảng trắng"}
          ]}
        >
          <Input/>
          {}
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true,
              message: "Hãy nhập vào gmail" },
            {
            pattern: new RegExp("@gmail.com"),
            message:'Hãy nhập đúng email!',
            },
            {whitespace:true, message:"Không được để khoảng trắng"}
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true,
              message: "Hãy nhập vào mật khẩu" },
            {whitespace:true, message:"Không được để khoảng trắng"}
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="ConfirmPassword"
          name="confirmPassword"
          rules={[
            { required: true,
              message: "Hãy nhập lại mật khẩu" },
            {whitespace:true, message:"Không được để khoảng trắng"},
            ({getFieldValue}) =>({
                validator(_,value){
                    if(!value || getFieldValue("password") === value){
                        return Promise.resolve()
                    }
                    return Promise.reject("Mật khẩu nhập lại của bạn không trùng khớp với mật khẩu cũ ")
                }
            }),
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='bg-blue-500' type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default Register