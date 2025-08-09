import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
    createUserDocumentIfNotExists,
} from '../config/auth';
import { useAuth } from '../Context/authContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import MotionFadeIn from '../components/UI/MotionFadeIn';

export default function Login() {
    const navigate = useNavigate();
    const { currentUser, userLoggedIn, loading } = useAuth();
    const [errorMsg, setErrorMsg] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        if (currentUser && userLoggedIn && !loading) {
            if (currentUser.email === 'admin@meshwark.com') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
    }, [currentUser, userLoggedIn, loading, navigate]);

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
        onSubmit: async values => {
            setErrorMsg('');
            setFormLoading(true);
            try {
                const userCredential = await doSignInWithEmailAndPassword(
                    values.email,
                    values.password
                );
                await createUserDocumentIfNotExists(userCredential.user);
            } catch {
                setErrorMsg(
                    'الإيميل أو كلمة المرور غير صحيحة أو هناك مشكلة في تسجيل الدخول'
                );
            } finally {
                setFormLoading(false);
            }
        },
    });

    const handleGoogleLogin = async () => {
        setErrorMsg('');
        setFormLoading(true);
        try {
            const result = await doSignInWithGoogle();
            await createUserDocumentIfNotExists(result.user);
        } catch {
            setErrorMsg('فشل تسجيل الدخول باستخدام جوجل');
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) return <LoadingSpinner />;

    if (currentUser && userLoggedIn) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <title>تسجيل الدخول | مشوارك</title>
            <meta
                name="description"
                content="سجّل دخولك إلى مشوارك للوصول إلى المفضلة وإدارة المسارات بسهولة."
            />
            <form
                onSubmit={formik.handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <MotionFadeIn>
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        تسجيل الدخول
                    </h2>
                    {errorMsg && (
                        <MotionFadeIn>
                            <p className="text-red-600 text-center font-medium mb-4">
                                {errorMsg}
                            </p>
                        </MotionFadeIn>
                    )}
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
                            placeholder="أدخل بريدك الإلكتروني"
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
                            placeholder="أدخل كلمة المرور"
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
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
                        disabled={formLoading}
                    >
                        دخول
                    </button>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-full cursor-pointer bg-white text-gray-700 py-2 px-4 rounded border border-gray-300 hover:bg-gray-50 mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
                        disabled={formLoading}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        تسجيل الدخول باستخدام جوجل
                    </button>
                    <p className="text-sm text-center mt-4">
                        ليس لديك حساب ؟{' '}
                        <Link
                            to="/register"
                            className="text-blue-600 cursor-pointer hover:underline p-2"
                        >
                            سجل من هنا
                        </Link>
                    </p>
                </MotionFadeIn>
            </form>
        </div>
    );
}
