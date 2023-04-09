import React from 'react'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../types/product'
import { Col, Divider, Row,Button, Image } from 'antd';
import './Detail.css'

interface IProps{
    products:IProduct[]
}
const ProductDetailPage = (props:IProps) => {
    const { id } = useParams()
    const currentProduct = props.products.find((item) => item._id == id)

    return (
        <div style={{background: 'rgb(240,240,240)',borderRadius:"10px",margin:'0 30px 40px 35px',padding:'5px', display:'flex', justifyContent:'center'}} >
            <div key={currentProduct?._id}>
              <a><h3 style={{textAlign:'center'}}>{currentProduct?.name}</h3></a>
              <br/>
              <div style={{display:'flex', justifyContent:'center'}}>
              <Image style={{width:"200px",height:"250px",margin:"0px 20px 10px 40px"}} src={currentProduct?.image}/>
              </div>
              <div style={{display:"flex",textAlign:"center", justifyContent:'center'}}>
                <p style={{fontSize:'15px'}}>Giá: <span style={{color:'red', fontWeight:'bold'}}>{currentProduct?.price}</span> VNĐ</p>
              </div>
              <div style={{textAlign:'center'}}>
                <p>Mô tả: {currentProduct?.description}</p>
              </div>
              <div style={{display:"flex",textAlign:"center", justifyContent:'center', margin:"10px 0 20px 0"}}>
              <Button type='primary' htmlType='button'>Đặt hàng ngay</Button>
              </div>
            </div>
            </div>
    )
}

export default ProductDetailPage