'use client';

import React, { useState } from 'react';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import pokeball from 'public/pokeball.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';

export default function FourOhFour() {
  const [loading, setLoading] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email is not valid')
        .required('Email is Required'),
    }),
    onSubmit: async (values) => {
      setLoading('loading...');
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        values.email,
      );
      if (error) {
        setErrorMessage(error.message);
        setLoading('');
        console.log('error', error);
      } else {
        setLoading('success!');
        setErrorMessage('');
        console.log('data', await data);
      }
    },
  });

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden p-4 text-[#2F2F2F]">
      <Image src={pokeball} width={40} height={50} alt="pokeball" />
      <h1 className="text-center text-5xl font-black">Forgot your Password?</h1>
      <h3 className="max-w-md text-center">
        {errorMessage ? (
          <span className="font-bold text-red-800"> {errorMessage} </span>
        ) : (
          'Please insert your email connected to your user. You will recive a link to reset the password.'
        )}
      </h3>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full max-w-lg flex-col gap-4"
      >
        <label htmlFor="email" className="w-full">
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
            className="w-full border-b border-gray-600 py-3 duration-200 hover:duration-200 hover:placeholder:text-gray-600 focus:border-b-4 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full border-2 border-gray-900 bg-gray-900 px-4 py-2 text-white duration-200 hover:bg-slate-700 disabled:bg-gray-500"
        >
          {loading || 'send reset link'}
        </button>
      </form>
    </main>
  );
}
