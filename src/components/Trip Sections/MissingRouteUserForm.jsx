import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GeoPoint } from 'firebase/firestore';
import {
    addStationDetails,
    addStationToUsersRoutes,
    createStationObject,
} from '../../utils/http';

const initialCrossStation = {
    name: '',
    latitude: '',
    longitude: '',
};

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
    totalFee: Yup.number()
        .typeError('يجب أن يكون رقمًا')
        .min(0, 'يجب أن تكون الأجرة أكبر من أو تساوي صفر')
        .required('هذا الحقل مطلوب'),
});

export default function MissingRouteUserForm({
    fromDefault = '',
    toDefault = '',
}) {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        setError('');

        try {
            // Create cross stations with coordinates
            const crossStations = values.crossStations.map(station => ({
                station: {
                    coords: new GeoPoint(
                        parseFloat(station.latitude || 0),
                        parseFloat(station.longitude || 0)
                    ),
                    name: station.name,
                },
            }));

            // Create the station object with the required structure
            const newStation = createStationObject({
                ...values,
                crossStations,
            });

            // Add the station to the destinations document
            await addStationToUsersRoutes('routes', newStation);
            await addStationDetails('station-details', newStation);

            console.log('Station added successfully:', newStation);
            setSubmitted(true);
            resetForm();
        } catch (err) {
            console.error('Error adding station:', err);
            setError('حدث خطأ أثناء إضافة المسار. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-center mt-6">
                <p className="text-lg font-semibold">شكرًا لمساهمتك!</p>
                <p>تم إضافة المسار الجديد بنجاح إلى قاعدة البيانات.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl w-full mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mt-8 border border-gray-100 rtl text-right animate-fade-in">
                <h2 className="text-2xl font-extrabold text-center mb-6 text-blue-700">
                    لوحة إدارة المسارات - إضافة مسار جديد
                </h2>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                        <p className="font-semibold">خطأ:</p>
                        <p>{error}</p>
                    </div>
                )}

                <Formik
                    initialValues={{
                        from: fromDefault,
                        to: toDefault,
                        crossStations: [{ ...initialCrossStation }],
                        distance: '',
                        duration: '',
                        totalFee: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, isSubmitting: formikSubmitting }) => (
                        <Form className="space-y-6" dir="rtl">
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
                                        <div className="space-y-4">
                                            {values.crossStations.map(
                                                (station, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="bg-gray-50 rounded-lg p-4"
                                                    >
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h4 className="font-semibold text-gray-700">
                                                                محطة رقم{' '}
                                                                {idx + 1}
                                                            </h4>
                                                            {values
                                                                .crossStations
                                                                .length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        remove(
                                                                            idx
                                                                        )
                                                                    }
                                                                    className="text-red-600 hover:text-red-800 font-bold px-2 py-1 rounded transition"
                                                                    title="حذف المحطة"
                                                                >
                                                                    حذف
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                            <div>
                                                                <Field
                                                                    name={`crossStations[${idx}].name`}
                                                                    type="text"
                                                                    className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                                    placeholder="اسم المحطة"
                                                                />
                                                                <ErrorMessage
                                                                    name={`crossStations[${idx}].name`}
                                                                >
                                                                    {msg => (
                                                                        <div className="text-red-500 text-xs mt-1">
                                                                            {
                                                                                msg
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </ErrorMessage>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        ...initialCrossStation,
                                                    })
                                                }
                                                className="mt-2 text-blue-600 hover:text-blue-800 font-semibold transition flex items-center gap-1"
                                            >
                                                <span className="text-lg">
                                                    +
                                                </span>{' '}
                                                إضافة محطة
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
                                <div className="md:col-span-2">
                                    <label className="block mb-2 font-semibold text-gray-700">
                                        الأجرة الكلية (جنيه)
                                    </label>
                                    <Field
                                        name="totalFee"
                                        type="number"
                                        className="w-full bg-white border border-gray-300 rounded-xl p-4 text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition placeholder-gray-400 hover:border-blue-400"
                                        placeholder="مثال: 15"
                                    />
                                    <ErrorMessage name="totalFee">
                                        {msg => (
                                            <div className="text-red-500 text-sm mt-1">
                                                {msg}
                                            </div>
                                        )}
                                    </ErrorMessage>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-md mt-2 disabled:opacity-60"
                                disabled={isSubmitting || formikSubmitting}
                            >
                                {isSubmitting
                                    ? 'جاري الإضافة...'
                                    : 'إضافة المسار إلى قاعدة البيانات'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
