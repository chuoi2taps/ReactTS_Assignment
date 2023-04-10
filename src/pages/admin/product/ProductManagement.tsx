import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IProduct } from '../../../types/product'
import { Space, Table, Button,Input, Image,Typography,Switch } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';

const { Search } = Input;
const { Paragraph,Text } = Typography;


interface IProps{
    products:IProduct[],
    onRemove: (id:string)=>void
}
const ProductManagementPage = (props:IProps) => {

    const navigate = useNavigate()
    const data = props.products.map(item => {
        return {
            key: item?._id,
            name: item?.name,
            price: item?.price,
            description: item?.description,
            image: item?.image,
            categoryId: item?.categoryId
        }
    })
    
    const removeProduct = (id:string) => {
        props.onRemove(id)
    }
    const updateProduct = (id:string)=>{
        navigate('/admin/products/'+ id + "/update")
    }
    const[searchedText,setSearchedText] = useState("")
    

    const columns: ColumnsType<IProduct> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue:[searchedText],
            onFilter(value, record) {
                return String(record.name).toLowerCase().includes(String(value).toLowerCase()) || String(record.categoryId).toLowerCase().includes(String(value).toLowerCase())
            },
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Product Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text)=><Paragraph className='w-[50px] h-[50px]'>{text}</Paragraph>
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text)=><Image src={text} className='w-[50px] h-[50px]' width='50px' height='50px'/>
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button danger type='primary' onClick={() => removeProduct(record.key)}>Remove</Button>
                    <Button className='bg-green-500' type='primary' onClick={()=> updateProduct(record.key)}>Update</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Search placeholder="Nhập vào để tìm kiếm" enterButton="Search" size="large" style={{margin:'0 0 10px 0'}} onSearch={(value)=>{setSearchedText(value)}} />
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 4, showQuickJumper: true }} />
            <Button type='primary' className='bg-blue-500' ><Link to={'/admin/products/add'} >Add New Product</Link></Button>
            
            {/* <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index) => {
                            return <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <button onClick={()=>{updateProduct(item.id)}}>Update</button>
                                    <button onClick={() =>{removeProduct(item.id)}}>Remove</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table> */}
        </div>
    )
}

export default ProductManagementPage