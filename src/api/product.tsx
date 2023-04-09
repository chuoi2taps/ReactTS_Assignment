import { IProduct } from "../types/product"
import instance from "./instance"

const addProduct = (product:IProduct)=>{
    return instance.post("/products",product)
}
const deleteProduct = (id:string)=>{
    return instance.delete("/products/"+id)
}
const updateProduct = (product: IProduct) => {
    return instance.put("/products/" + product._id, product)
}
const getAll = ()=>{
    return instance.get("/products")
}
const getOne = (id:string)=>{
    return instance.get("/products/"+id)
}
export {addProduct,deleteProduct,updateProduct,getAll,getOne}