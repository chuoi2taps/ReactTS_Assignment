import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { IProduct } from '../../../types/product'
import { Button, Form, Input, Select } from 'antd';
import { ICategory } from '../../../types/category';

interface IProps {
  products: IProduct[],
  onUpdate: (product: IProduct) => void
  categories: ICategory[]
}
const UpdateProductPage = (props: IProps) => {
  const navigate = useNavigate()
  const { id } = useParams<{id:string}>()
  const [product, setProduct] = useState<IProduct>()

  useEffect(() => {
    const currentProduct = props.products.find((item) => item._id === id)
    setProduct(currentProduct)
  }, [props])
  useEffect(() => { setFields() }, [product])

  const [form] = Form.useForm()
  const setFields = () => {
    form.setFieldsValue({
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      image: product?.image,
      categoryId: product?.categoryId
    })
  }


  const onFinish = (values: any) => {
    props.onUpdate(values)
    navigate('/admin/products')
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
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }, { whitespace: true, message: "Không được để khoảng trắng" },]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: 'Please input your password!' },]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[{ required: true, message: 'Please input your description!' }, { whitespace: true, message: "Không được để khoảng trắng" },]}>

          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input your image!' }, { whitespace: true, message: "Không được để khoảng trắng" },]}>
          <Input />
          {/* <Upload {...image.fileList}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload> */}
        </Form.Item>

        <Form.Item label="Danh mục" name="categoryId">
          <Select>
            {props.categories.map((category) => {
              return (
                <Select.Option value={category._id} key={category._id}>
                  {category.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className='bg-green-500' type="primary" htmlType="submit">
            Update this Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateProductPage