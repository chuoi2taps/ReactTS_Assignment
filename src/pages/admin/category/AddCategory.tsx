import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ICategory } from '../../../types/category'
import { Button, Checkbox, Form, Input } from 'antd';

interface IProps {
  onAdd: (categories: ICategory) => void

}

const AddCategory = (props: IProps) => {
  const navigate = useNavigate()
  const onFinish = (values: any) => {
    props.onAdd(values)
    navigate('/admin/categories')
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
          label="Category"
          name="name"
          rules={[
            { required: true,
              message: "Hãy nhập vào tên category" },
            {whitespace:true, message:"Không được để khoảng trắng"},
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='bg-blue-500' type="primary" htmlType="submit">
            Add New Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddCategory