import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function Register() {
 const [storedData, setStoredData] = useState(null);

 const formik = useFormik({
  initialValues: {
   name: "",
   email: "",
   phone: "",
   password: "",
   confirmPassword: "",
  },
  validationSchema: Yup.object({
   name: Yup.string().required("الاسم مطلوب"),
   email: Yup.string().email("الإيميل غير صحيح").required("الإيميل مطلوب"),
   phone: Yup.string()
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, "رقم غير صحيح")
    .required("رقم الهاتف مطلوب"),
   password: Yup.string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .matches(
     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
     "كلمة المرور ضعيفة"
    )
    .required("كلمة المرور مطلوبة"),
   confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
  }),
  onSubmit: (values) => {
   let users = JSON.parse(localStorage.getItem("userRegisterData")) || [];
   users.push(values);
   localStorage.setItem("userRegisterData", JSON.stringify(users));
   setStoredData(values);
   alert("تم التسجيل ");
  },
 });

}