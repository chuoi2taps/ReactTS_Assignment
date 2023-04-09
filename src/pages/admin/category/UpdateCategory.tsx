import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ICategory } from '../../../types/category'
import { Button, Form, Input } from 'antd';

interface IProps {
  categories: ICategory[],
  onUpdate: (category: ICategory) => void
}
const UpdateCategoryPage = (props: IProps) => {
  const navigate = useNavigate()
  const { id } = useParams<{id:string}>()

  const [category, setCategory] = useState<ICategory>()

  useEffect(() => {
    const currentCategory = props.categories.find((item) => item._id == id)
    setCategory(currentCategory)
  }, [props, id])
  useEffect(() => { setFields() }, [category])

  const [form] = Form.useForm()
  const setFields = () => {
    form.setFieldsValue({
      _id: category?._id,
      name: category?.name,
    })
  }


  const onFinish = (values: any) => {
    props.onUpdate(values)
    navigate('/admin/categories')

  }

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "0 auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"

      >
        <Form.Item
          label=""
          name="_id"
          style={{ display: 'none' }} // ẩn input này đi
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: 'Please input your Category name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='bg-green-500' type="primary" htmlType="submit">
            Update Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateCategoryPage