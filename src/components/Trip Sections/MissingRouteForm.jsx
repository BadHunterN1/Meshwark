import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialCrossStation = { name: '' };

const validationSchema = Yup.object().shape({
    from: Yup.string().required('هذا الحقل مطلوب'),
    to: Yup.string().required('هذا الحقل مطلوب'),
    crossStations: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required('هذا الحقل مطلوب'),
            })
        )
        .min(1, 'يجب إضافة محطة واحدة على الأقل'),
    distance: Yup.number()
        .typeError('يجب أن يكون رقمًا')
        .min(0, 'يجب أن تكون المسافة أكبر من أو تساوي صفر')
        .required('هذا الحقل مطلوب'),
    duration: Yup.number()
        .typeError('يجب أن يكون رقمًا')
        .min(0, 'يجب أن تكون المدة أكبر من أو تساوي صفر')
        .required('هذا الحقل مطلوب'),
    notes: Yup.string(),
});

export default function MissingRouteForm({ fromDefault = '', toDefault = '' }) {
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-center mt-6">
                <p>شكرًا لمساهمتك! تم إرسال المعلومات بنجاح.</p>
            </div>
        );
    }

    return (
        <Formik
            initialValues={{
                from: fromDefault,
                to: toDefault,
                crossStations: [{ ...initialCrossStation }],
                distance: '',
                duration: '',
                notes: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                // Here you would send the data to your backend or Firestore
                // For now, just log it and show a thank you message
                console.log(values);
                setSubmitted(true);
                resetForm();
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
            }) => (
                <Form
                    className="max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-8 space-y-6 border border-gray-100 rtl text-right animate-fade-in"
                    dir="rtl"
                >
                    <h2 className="text-2xl font-extrabold text-center mb-6 text-blue-700">
                        أخبرنا عن المسار الذي تعرفه
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                من محطة
                            </label>
                            <Field
                                name="from"
                                type="text"
                                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400"
                                placeholder="اسم المحطة البداية"
                            />
                            <ErrorMessage name="from">
                                {msg => (
                                    <div className="text-red-500 text-sm mt-1">
                                        {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                إلى محطة
                            </label>
                            <Field
                                name="to"
                                type="text"
                                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400"
                                placeholder="اسم المحطة النهائية"
                            />
                            <ErrorMessage name="to">
                                {msg => (
                                    <div className="text-red-500 text-sm mt-1">
                                        {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            المحطات في الطريق (يمكنك إضافة أكثر من محطة)
                        </label>
                        <FieldArray name="crossStations">
                            {({ push, remove }) => (
                                <div className="space-y-2">
                                    {values.crossStations.map(
                                        (station, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2"
                                            >
                                                <Field
                                                    name={`crossStations[${idx}].name`}
                                                    type="text"
                                                    className="flex-1 bg-white border border-gray-300 rounded-xl p-4 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400"
                                                    placeholder={`محطة رقم ${idx + 1}`}
                                                />
                                                {values.crossStations.length >
                                                    1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            remove(idx)
                                                        }
                                                        className="text-red-600 hover:text-red-800 font-bold px-2 py-1 rounded transition"
                                                        title="حذف المحطة"
                                                    >
                                                        حذف
                                                    </button>
                                                )}
                                            </div>
                                        )
                                    )}
                                    <ErrorMessage name={`crossStations`}>
                                        {msg => (
                                            <div className="text-red-500 text-sm mt-1">
                                                {typeof msg === 'string'
                                                    ? msg
                                                    : null}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                    {values.crossStations.map((_, idx) => (
                                        <ErrorMessage
                                            key={idx}
                                            name={`crossStations[${idx}].name`}
                                        >
                                            {msg => (
                                                <div className="text-red-500 text-sm mt-1">
                                                    {msg}
                                                </div>
                                            )}
                                        </ErrorMessage>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            push({ ...initialCrossStation })
                                        }
                                        className="mt-2 text-blue-600 hover:text-blue-800 font-semibold transition flex items-center gap-1"
                                    >
                                        <span className="text-lg">+</span> إضافة
                                        محطة
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                المسافة (كم)
                            </label>
                            <Field
                                name="distance"
                                type="number"
                                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400"
                                placeholder="مثال: 10"
                            />
                            <ErrorMessage name="distance">
                                {msg => (
                                    <div className="text-red-500 text-sm mt-1">
                                        {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                المدة (دقيقة)
                            </label>
                            <Field
                                name="duration"
                                type="number"
                                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400"
                                placeholder="مثال: 30"
                            />
                            <ErrorMessage name="duration">
                                {msg => (
                                    <div className="text-red-500 text-sm mt-1">
                                        {msg}
                                    </div>
                                )}
                            </ErrorMessage>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700">
                            ملاحظات إضافية (اختياري)
                        </label>
                        <Field
                            as="textarea"
                            name="notes"
                            className="w-full bg-white border border-gray-300 rounded-xl p-4 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400 resize-none"
                            rows={2}
                            placeholder="أي تفاصيل إضافية عن المسار..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md mt-2 disabled:opacity-60"
                        disabled={isSubmitting}
                    >
                        إرسال المعلومات
                    </button>
                </Form>
            )}
        </Formik>
    );
}
