import { ICategory } from "../types/category"
import instance from "./instance"

const addCategory = (category:ICategory)=>{
    return instance.post("/categories",category)
}
const deleteCategory = (id:string)=>{
    return instance.delete("/categories/"+id)
}
const updateCategory = (category:ICategory)=>{
    return instance.put("/categories/"+category._id,category)
}
const getAllCategory = ()=>{
    return instance.get("/categories")
}
const getOneCategory = (id:string)=>{
    return instance.get("/categories/"+id)
}
export {addCategory,deleteCategory,updateCategory,getAllCategory,getOneCategory}