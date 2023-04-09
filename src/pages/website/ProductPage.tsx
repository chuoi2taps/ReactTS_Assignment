import React from 'react'
import { useState, useEffect } from 'react'
import { IProduct } from '../../types/product'
import { Link, useNavigate } from 'react-router-dom'
import { Col, Divider, Row,Button,Image } from 'antd';


interface IProps {
  products: IProduct[],
}

const ProductPage = (props: IProps) => {
  const navigate = useNavigate()
  const goDetail = (id: string) => {
    navigate('/products/' + id)
  }
  const [data, setData] = useState<IProduct[]>([])
  useEffect(() => {
    setData(props.products)
  }, [props])
  return (
    <div>
        <>
      <Divider orientation="left" style={{display:'flex',fontSize:'30px',padding:'0 0 30px 0'}}>Danh sách sản phẩm</Divider>
      <Row gutter={[8,8]} style={{padding:"0 auto", textAlign:'center'} }>
        {data.map((item, index) => {
          return <Col span={5} style={{background: 'rgb(240,240,240)', height:"500px",borderRadius:"10px",margin:'0 30px 40px 35px',padding:'5px'}} >
            <div key={index}>
              <a onClick={() => { goDetail(item._id) }}><h3 >{item.name}</h3></a>
              <br/>
              <div>
              <Image style={{width:"200px",height:"250px",margin:"0px 20px 10px 40px"}} src={item?.image}/>
              </div>
              <div style={{display:"flex",textAlign:"center", justifyContent:'center'}}>
                <p style={{fontSize:'15px'}}>Giá: <span style={{color:'red', fontWeight:'bold'}}>{item.price}</span> VNĐ</p>
              </div>
              <div>

              </div>
              <Button type='primary' onClick={() => { goDetail(item._id) }}>Xem chi tiết</Button>
            </div>
            </Col>
          })}
      </Row>
      </>
    </div>
  )
}

export default ProductPage