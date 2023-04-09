import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { addProduct, deleteProduct, getAll, updateProduct } from './api/product'
import AddProductPage from './pages/admin/product/AddProduct'
import UpdateProductPage from './pages/admin/product/UpdateProduct'
import HomePage from './pages/website/HomePage'
import ProductPage from './pages/website/ProductPage'
import ProductDetailPage from './pages/website/ProductDetail'
import { IProduct } from './types/product'
import ProductManagementPage from './pages/admin/product/ProductManagement'
import AdminLayout from './pages/layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import CategoryManagement from './pages/admin/category/CategoryManagement'
import AddCategory from './pages/admin/category/AddCategory'
import UpdateCategoryPage from './pages/admin/category/UpdateCategory'
import { addCategory,deleteCategory,updateCategory,getAllCategory,getOneCategory } from './api/category'
import { ICategory } from './types/category'
import WebsiteLayout from './pages/layouts/WebsiteLayout'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import { addUsers, deleteUser, getAllUser } from './api/user'
import { IAccount } from './types/createaccount'
import UserManagement from './pages/admin/user/UserManagement'

function App() {
  const [products, setProduct] = useState<IProduct[]>([])
  useEffect(() => {
    getAll().then(({ data }) => setProduct(data))
  }, [])

  const [users, setUser] = useState<IAccount[]>([])
  useEffect(() => {
    getAllUser().then(({ data }) => setUser(data))
  }, [])

  const onHandleAddUser = (user:IAccount) => {
    addUsers(user).then(() => setUser([...users, user]))
  }

  const [categories, setCategory] = useState<ICategory[]>([]);
  useEffect(()=>{
    getAllCategory().then(({data})=>setCategory(data))
  },[])

  const onHandleRemove = (id: string) => {
    const confirm = window.confirm("Bạn có chắc không ?")
    if(confirm){
      deleteProduct(id).then(() => setProduct(products.filter((item: IProduct) => item._id !== id)))
    }
  }
  const onHandleRemoveUser = (id: string) => {
    const confirm = window.confirm("Bạn có chắc không ?")
    if(confirm){
      deleteUser(id).then(() => setUser(users.filter((item: IAccount) => item._id !== id)))
    }
  }

  const onHandleRemoveCate = (id: string) => {
    const confirm = window.confirm("Bạn có chắc không ?")
    if(confirm){
      deleteCategory(id).then(() => setCategory(categories.filter((item: ICategory) => item._id !== id)))
    }
  }

  const onHandleAdd = (product:IProduct) => {
    addProduct(product).then(() => setProduct([...products, product]))
  }

  const onHandleAddCate = (category:ICategory) => {
    addCategory(category).then(() => setCategory([...categories, category]))
  }

  const onHandleUpdate = (product:IProduct) => {
    updateProduct(product).then(() => setProduct(products.map((item) => item._id == product._id ? product : item)))
  }

  const onHandleUpdateCate = (category:ICategory) => {
    updateCategory(category).then(()=>setCategory(categories.map(item=>item._id == category._id ? category:item)))
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<WebsiteLayout/>}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<Login users={users}/>}/>
          <Route path='/signup' element={<Signup onAdd={onHandleAddUser}/>}/>
          <Route path='products'  >
            <Route index element={<ProductPage products={products} />} />
            <Route path=':id' element={<ProductDetailPage products={products} />} />
          </Route>

        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
        <Route index element={<Dashboard/>}/>
          <Route path='products'>
          <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove}/>}/>
            <Route path='add' element={<AddProductPage onAdd={onHandleAdd} />} />
            <Route path=':id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} categories={categories}/>} />
          </Route>
          <Route path='categories'>
          <Route index element={<CategoryManagement categories={categories} onRemove={onHandleRemoveCate}/>}/>
          <Route path='add' element={<AddCategory onAdd={onHandleAddCate}/>}/>
          <Route path=':id/update' element={<UpdateCategoryPage onUpdate={onHandleUpdateCate} categories={categories}/>}/>
        </Route>
        <Route path='users'>
        <Route index element={<UserManagement users={users} onRemove={onHandleRemoveUser}/>}/>
        </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App