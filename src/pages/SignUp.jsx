import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, "Must be at least 3 characters")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Form Data:", values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md shadow-md w-1/3 mx-auto">
          <div>
            <h2>Sign Up</h2>
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" className="border p-2 w-full" />
            <ErrorMessage name="username" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="border p-2 w-full" />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" className="border p-2 w-full" />
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>

          <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white py-2 rounded-md">
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
