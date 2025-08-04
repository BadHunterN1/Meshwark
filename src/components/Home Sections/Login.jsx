import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {
 let formik = useFormik({
  initialValues: {
   email: "",
   password: "",
  },
  validationSchema: Yup.object({
   email: Yup.string()
    .email("الإيميل غير صحيح")
    .required("الإيميل مطلوب"),
   password: Yup.string().required("كلمة المرور مطلوبة"),
  }),
  onSubmit: (values) => {
   let stored = localStorage.getItem("userRegisterData");

   if (stored) {
    let users = JSON.parse(stored);
    let foundUser = users.find(
     (user) => user.email === values.email && user.password === values.password
    );

    if (foundUser) {
     alert("تم تسجيل الدخول بنجاح");
    }
    else {
     alert("الإيميل أو كلمة المرور غير صحيحة");
    }
   }
   else {
    alert("لا يوجد أي حسابات مسجلة");
   }
  }

 })
}