import {
    CheckCircle,
    Clock,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
} from 'lucide-react';
import { useFormik } from 'formik';
import MotionFadeIn from '../components/UI/MotionFadeIn';

export default function ContactUs() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validate: values => {
            const errors = {};
            if (!values.name) errors.name = 'الاسم مطلوب';
            if (!values.email) errors.email = 'البريد الإلكتروني مطلوب';
            if (!values.subject) errors.subject = 'الموضوع مطلوب';
            if (!values.message) errors.message = 'الرسالة مطلوبة';
            return errors;
        },
        onSubmit: (values, { resetForm, setSubmitting, setStatus }) => {
            setStatus('submitted');
            setTimeout(() => {
                setStatus(null);
                resetForm();
                setSubmitting(false);
            }, 3000);
        },
    });
    const contactInfo = [
        {
            icon: <Mail className="w-8 h-8 text-white" />,
            title: 'البريد الإلكتروني',
            value: 'support@meshwark.com',
            bgColor: 'from-blue-500 to-blue-600',
        },
        {
            icon: <Phone className="w-8 h-8 text-white" />,
            title: 'رقم الهاتف',
            value: '01234567890',
            bgColor: 'from-green-500 to-green-600',
        },
        {
            icon: <MapPin className="w-8 h-8 text-white" />,
            title: 'الموقع',
            value: 'المنصورة، مصر',
            bgColor: 'from-purple-500 to-purple-600',
        },
        {
            icon: <Clock className="w-8 h-8 text-white" />,
            title: 'ساعات العمل',
            value: 'الأحد - الخميس: 9 صباحاً - 6 مساءً',
            bgColor: 'from-orange-500 to-orange-600',
        },
    ];
    return (
        <div className="bg-gradient-to-tr from-blue-50 via-white to-green-50 min-h-screen">
            <title>تواصل معنا | مشوارك</title>
            <meta
                name="description"
                content="تواصل مع فريق مشوارك للدعم والاستفسارات والاقتراحات. نحن هنا لخدمتك."
            />
            <div className="container mx-auto px-4 py-16">
                <MotionFadeIn className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-4 p-2">
                        تواصل معنا
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        نحن هنا لمساعدتك! تواصل معنا لأي استفسار أو اقتراح حول
                        خدماتنا
                    </p>
                </MotionFadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20 max-w-7xl mx-auto">
                    {contactInfo.map((info, index) => (
                        <MotionFadeIn
                            delay={0.6 + index * 0.2}
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div
                                className={`w-16 h-16 bg-gradient-to-r ${info.bgColor} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                            >
                                {info.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                                {info.title}
                            </h3>
                            <p className="text-gray-600 text-center text-sm leading-relaxed">
                                {info.value}
                            </p>
                        </MotionFadeIn>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    <MotionFadeIn className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                أرسل لنا رسالة
                            </h2>
                        </div>
                        {formik.status === 'submitted' ? (
                            <div className="text-center py-12 animate-fade-in">
                                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    تم الإرسال بنجاح!
                                </h3>
                                <p className="text-gray-600">
                                    شكراً لتواصلك معنا. سنرد عليك في أقرب وقت
                                    ممكن.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={formik.handleSubmit}
                                className="space-y-6"
                                noValidate
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-group">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            الاسم
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="الاسم بالكامل"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                                        />
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {formik.errors.name}
                                                </p>
                                            )}
                                    </div>
                                    <div className="form-group">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            البريد الإلكتروني
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="your.email@example.com"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                                        />
                                        {formik.touched.email &&
                                            formik.errors.email && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {formik.errors.email}
                                                </p>
                                            )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        الموضوع
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formik.values.subject}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="ما هو موضوع الرسالة؟"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                                    />
                                    {formik.touched.subject &&
                                        formik.errors.subject && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {formik.errors.subject}
                                            </p>
                                        )}
                                </div>
                                <div className="form-group">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        الرسالة
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formik.values.message}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="اخبرنا المزيد عن استفسارك..."
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                                    ></textarea>
                                    {formik.touched.message &&
                                        formik.errors.message && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {formik.errors.message}
                                            </p>
                                        )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-3 group"
                                    disabled={formik.isSubmitting}
                                >
                                    <span>إرسال الرسالة</span>
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </form>
                        )}
                    </MotionFadeIn>
                    <div className="space-y-8">
                        <MotionFadeIn className="bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-6">
                                لماذا تتواصل معنا؟
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">
                                            دعم تقني متخصص
                                        </h4>
                                        <p className="text-white/80 text-sm">
                                            فريق من المهندسين المتخصصين لحل
                                            مشاكلك التقنية
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">
                                            استجابة سريعة
                                        </h4>
                                        <p className="text-white/80 text-sm">
                                            نرد على استفساراتك خلال 24 ساعة
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">
                                            تحديثات مستمرة
                                        </h4>
                                        <p className="text-white/80 text-sm">
                                            نحسن خدماتنا باستمرار بناءً على
                                            ملاحظاتك
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </MotionFadeIn>
                        <MotionFadeIn className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">
                                الأسئلة الشائعة
                            </h3>
                            <div className="space-y-4">
                                <details className="group">
                                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <span className="font-medium text-gray-800">
                                            كيف يمكنني تحديث بيانات المسار؟
                                        </span>
                                        <span className="text-gray-500 group-open:rotate-180 transition-transform">
                                            ▼
                                        </span>
                                    </summary>
                                    <div className="mt-3 px-4 text-gray-600 text-sm leading-relaxed">
                                        يمكنك تحديث بيانات المسار من خلال قسم
                                        "المسارات" في التطبيق أو التواصل معنا
                                        مباشرة.
                                    </div>
                                </details>
                                <details className="group">
                                    <summary className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                        <span className="font-medium text-gray-800">
                                            ما هي مواعيد تحديث البيانات؟
                                        </span>
                                        <span className="text-gray-500 group-open:rotate-180 transition-transform">
                                            ▼
                                        </span>
                                    </summary>
                                    <div className="mt-3 px-4 text-gray-600 text-sm leading-relaxed">
                                        نقوم بتحديث البيانات بشكل يومي لضمان دقة
                                        المعلومات المقدمة.
                                    </div>
                                </details>
                            </div>
                        </MotionFadeIn>
                    </div>
                </div>
            </div>
        </div>
    );
}
