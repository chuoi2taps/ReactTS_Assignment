import * as Yup from 'yup'


export const signUpSchema = Yup.object({
    name: Yup.string().required("Trường dữ liệu bắt buộc"),
    email: Yup.string().email("Email sai định dạng").required("Trường dữ liệu bắt buộc"),
    password: Yup.string().min(6).required("Trường dữ liệu bắt buộc"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Mật khẩu không khớp"),
})

export type SignUpForm = Yup.InferType<typeof signUpSchema>

export const signInSchema = Yup.object({
    email: Yup.string().email("Email sai định dạng").required("Trường dữ liệu bắt buộc"),
    password: Yup.string().min(6).required("Trường dữ liệu bắt buộc"),
    role: Yup.number()
})

export type SignInForm = Yup.InferType<typeof signInSchema>