'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';

export default function SignupForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState('');
  const router = useRouter();
  /**
  The configuration object for the SignupForm using the useFormik hook from Formik
  @type {FormikConfig}
  */
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().required('Name is Required'),
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is Required'),
      password: Yup.string()
        .min(8, 'Password needs to be atleast 8 character ')
        .required('Password is Required'),
    }),
    onSubmit: async (values) => {
      setLoading('loading...');
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          },
        },
      });
      if (!error) {
        console.log(data);
        router.push('/signup/confirm-email');
      } else {
        setErrorMessage(error);
        setLoading('signup');
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-full max-h-[500px] w-full max-w-lg flex-col items-center justify-between lg:w-2/5 lg:items-start"
    >
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold">Sign up</h1>
        <p>Start you next adventure</p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <label htmlFor="name">
          {formik.touched.name && formik.errors.name ? (
            <span className="font-bold text-red-500 duration-200">
              {formik.errors.name}
            </span>
          ) : (
            'Name'
          )}
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border-b ${
              formik.touched.name && formik.errors.name
                ? 'border-b-4 border-red-400'
                : 'border-gray-600'
            } py-3 duration-200 hover:duration-200 hover:placeholder:text-gray-600 focus:border-b-4 focus:outline-none`}
          />
        </label>
        <label htmlFor="email">
          {formik.touched.email && formik.errors.email ? (
            <span className="font-bold text-red-500 duration-200">
              {formik.errors.email}
            </span>
          ) : (
            'Email'
          )}
          <input
            id="email"
            type="text"
            placeholder="Your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border-b ${
              formik.touched.email && formik.errors.email
                ? 'border-b-4 border-red-400'
                : 'border-gray-600'
            } py-3 duration-200 hover:duration-200 hover:placeholder:text-gray-600 focus:border-b-4 focus:outline-none`}
          />
        </label>
        <label htmlFor="password">
          {formik.touched.password && formik.errors.password ? (
            <span className="font-bold text-red-500 duration-200">
              {formik.errors.password}
            </span>
          ) : (
            'Password'
          )}
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full border-b ${
              formik.touched.password && formik.errors.password
                ? 'border-b-4 border-red-400'
                : 'border-gray-600'
            } py-3 duration-200 hover:duration-200 hover:placeholder:text-gray-600 focus:border-b-4 focus:outline-none`}
          />
        </label>
      </div>
      <div className="w-full">
        <div>{errorMessage}</div>
        <button
          type="submit"
          className="w-full rounded-full border-2 border-gray-900 bg-gray-900 px-6 py-2 text-white duration-200 hover:bg-slate-700 disabled:bg-gray-500"
        >
          {loading || 'Sign up'}
        </button>
        <div className="mt-4 flex gap-1 text-center lg:text-left">
          Already have a user?
          <a
            href="/login"
            className=" font-medium underline underline-offset-2"
          >
            Go to Login
          </a>
        </div>
      </div>
    </form>
  );
}
