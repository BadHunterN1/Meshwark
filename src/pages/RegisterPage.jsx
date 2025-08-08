import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    doCreateUserWithEmailAndPassword,
    createUserDocumentIfNotExists,
} from '../config/auth';
import { useAuth } from '../Context/authContext';

export default function Register() {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('الاسم مطلوب'),
            email: Yup.string()
                .email('الإيميل غير صحيح')
                .required('الإيميل مطلوب'),
            phone: Yup.string()
                .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'رقم غير صحيح')
                .required('رقم الهاتف مطلوب'),
            password: Yup.string()
                .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    'كلمة المرور ضعيفة'
                )
                .required('كلمة المرور مطلوبة'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'كلمة المرور غير متطابقة')
                .required('تأكيد كلمة المرور مطلوب'),
        }),
        onSubmit: async values => {
            setErrorMsg('');
            setLoading(true);
            try {
                const userCredential = await doCreateUserWithEmailAndPassword(
                    values.email,
                    values.password
                );
                await createUserDocumentIfNotExists(userCredential.user, {
                    displayName: values.name,
                    phone: values.phone,
                });
                navigate('/');
            } catch {
                setErrorMsg(
                    'فشل إنشاء الحساب أو البريد الإلكتروني مستخدم بالفعل'
                );
            } finally {
                setLoading(false);
            }
        },
    });

    if (currentUser) {
        // Check if user is admin
        if (currentUser.email === 'admin@meshwark.com') {
            navigate('/admin');
        } else {
            navigate('/');
        }
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    إنشاء حساب
                </h2>
                {errorMsg && (
                    <p className="text-red-600 text-center font-medium mb-4">
                        {errorMsg}
                    </p>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        الاسم
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                            {formik.errors.name}
                        </p>
                    )}
                </div>
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
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        رقم الهاتف
                    </label>
                    <input
                        id="phone"
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                            {formik.errors.phone}
                        </p>
                    )}
                </div>
                <div className="mb-4">
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
                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        تأكيد كلمة المرور
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                            <p className="text-sm text-red-500 mt-1">
                                {formik.errors.confirmPassword}
                            </p>
                        )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
                    disabled={loading}
                >
                    تسجيل
                </button>
            </form>
        </div>
    );
}
