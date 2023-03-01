'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LogInForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is Required'),
      password: Yup.string()
        .min(8, 'Password needs to be atleast 8 character ')
        .required('Password is Required'),
    }),
    onSubmit: async (values) => {
      setLoading('loading');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (data && !error) {
        setErrorMessage('');
        console.log(data);
        setLoading('Success!');
        router.push('/app');
      } else {
        console.error(error.message);
        setLoading('');
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex h-full max-h-[400px] w-full max-w-md flex-col items-center justify-between lg:w-2/5 lg:items-start"
    >
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold">Login</h1>
        <p>Lets catch em all</p>
      </div>
      <div className="flex w-full flex-col gap-3">
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
          {loading || 'login'}
        </button>
        <div className="mt-4 flex w-full justify-center gap-2  text-center lg:justify-start lg:text-left">
          Dont have a user?
          <Link
            href="/signup"
            className=" font-medium underline underline-offset-2"
          >
            Sign up here
          </Link>
        </div>
        <div className="mt-4 flex w-full justify-center gap-2 text-center  lg:justify-start lg:text-left">
          Forgot password?
          <Link
            href="/forgot-password"
            className=" font-medium underline underline-offset-2"
          >
            Request new password
          </Link>
        </div>
      </div>
    </form>
  );
}
