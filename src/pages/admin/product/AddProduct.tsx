import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { IProduct } from '../../../types/product'
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Checkbox, Form, Input, Upload, message } from 'antd';


interface IFormInput {
  id: number,
  name: string,
  price: number,
  description: string,
  image: string
}

interface IProps {
  onAdd: (product: IProduct) => void
}

const AddProduct = (props: IProps) => {
  const navigate = useNavigate()
  // const image: UploadProps = {
  //   name: 'image',
  //   action: 'http://localhost:3000/products',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  const onFinish = (values: any) => {
    props.onAdd(values)
    navigate('/admin/products')
  };
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
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Hãy nhập vào input"
            },
            { whitespace: true, message: "Không được để khoảng trắng" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: 'Please input your price!' }, { whitespace: true, message: "Không được để khoảng trắng" },]}>

          <Input />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }
          ,{whitespace:true, message:"Không được để khoảng trắng"},]}>

          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input your image!' },{whitespace:true, message:"Không được để khoảng trắng"},]}>
          <Input />
          {/* <Upload {...image.fileList}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
        </Form.Item>
        <Form.Item
          label="CategoryID"
          name="categoryId"
          rules={[{ required: true, message: 'Please input your categoryId!' },{whitespace:true, message:"Không được để khoảng trắng"},]}>

          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='bg-blue-500' type="primary" htmlType="submit">
            Add New Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddProduct