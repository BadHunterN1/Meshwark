import { useFormik } from "formik";
import * as Yup from "yup";

export default function Login() {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
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
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
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
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          دخول
        </button>
      </form>
    </div>
  );
}
