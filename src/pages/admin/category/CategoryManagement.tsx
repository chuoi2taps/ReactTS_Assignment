import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Space, Table, Button,Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ICategory } from '../../../types/category';

interface IProps{
    categories:ICategory[],
    onRemove: (id:string)=>void
}

const { Search } = Input;

const CategoryManagement = (props:IProps) => {

    const navigate = useNavigate()
    const data = props.categories.map(item => {
        return {
            key: item?._id,
            name: item?.name,
        }
    })
    
    const removeCate = (id:string) => {
        props.onRemove(id)
    }
    const updateCate = (id:string)=>{
        navigate('/admin/categories/'+ id + "/update")
    }
    const[searchedText,setSearchedText] = useState("")
    const columns: ColumnsType<ICategory> = [
        {
            title: 'Category ID',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
            filteredValue:[searchedText],
            onFilter(value, record) {
                return String(record.name).toLowerCase().includes(String(value).toLowerCase())
            },
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button danger type='primary' onClick={() => removeCate(record.key)}>Remove</Button>
                    <Button className='bg-green-500' type='primary' onClick={()=> updateCate(record.key)}>Update</Button>
                </Space>
            ),
        },
    ];

  return (
    <div><Search placeholder="input search text" enterButton="Search" size="large" style={{margin:'0 0 10px 0'}} onSearch={(value)=>{setSearchedText(value)}}/>
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 4, showQuickJumper: true }} />
    <Button className='bg-blue-500' type='primary' onClick={()=>navigate('/admin/categories/add')}>Add New Category</Button></div>
  )
}

export default CategoryManagement