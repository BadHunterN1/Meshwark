import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

export default function Login() {
    let token = crypto.randomUUID();
    const navigate = useNavigate();
    const { setUserLogin, setToken } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('الإيميل غير صحيح')
                .required('الإيميل مطلوب'),
            password: Yup.string().required('كلمة المرور مطلوبة'),
        }),
        onSubmit: values => {
            let stored = localStorage.getItem('userRegisterData');

            if (stored) {
                let users = JSON.parse(stored);
                let foundUser = users.find(
                    user =>
                        user.email === values.email &&
                        user.password === values.password
                );

                if (foundUser) {
                    setUserLogin(foundUser.name);
                    localStorage.setItem('token', `${token}`);
                    localStorage.setItem('name', `${foundUser.name}`);
                    setToken(`${token}`);
                    // if (user.role === "admin") {
                    //     navigate('/ManageRoutes');
                    // } else {
                    //     navigate('/');
                    // }
                    navigate('/');
                } else {
                    alert('الإيميل أو كلمة المرور غير صحيحة');
                }
            } else {
                alert('لا يوجد أي حسابات مسجلة');
            }
        },
    });

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    تسجيل الدخول
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        الإيميل
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                            {formik.errors.email}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        كلمة المرور
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                            {formik.errors.password}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    دخول
                </button>

                <p className="text-sm text-center mt-4">
                    ليس لديك حساب ؟{' '}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline p-2"
                    >
                        سجل من هنا
                    </Link>
                </p>
            </form>
        </div>
    );
}
