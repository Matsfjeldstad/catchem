/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import pokeball from 'public/pokeball.svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-unresolved
import { supabase } from 'lib/supabaseClient';

export default function page() {
  const [loading, setLoading] = useState('');
  const formik = useFormik({
    initialValues: {
      password: '',
    },

    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'Password needs to be atleast 8 character ')
        .required('Password is Required'),
    }),
    onSubmit: async (values) => {
      setLoading('loading...');
      const { data, error } = await supabase.auth.updateUser({
        password: values.password,
      });
      if (error) {
        console.log('error', error);
      } else {
        setLoading('success!');
        console.log('data', await data);
      }
    },
  });

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden p-4 text-[#2F2F2F]">
      <Image src={pokeball} width={40} height={50} alt="pokeball" />
      <h1 className="text-center text-5xl font-black">Reset your password</h1>
      <h3 className="max-w-md text-center">
        Please enter your new password bellow.
      </h3>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full max-w-lg flex-col gap-4"
      >
        <label htmlFor="password" className="w-full">
          {formik.touched.password && formik.errors.password ? (
            <span className="font-bold text-red-500 duration-200">
              {formik.errors.password}
            </span>
          ) : (
            'New password'
          )}
          <input
            id="password"
            type="password"
            placeholder="Your New Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border-b border-gray-600 py-3 duration-200 hover:duration-200 hover:placeholder:text-gray-600 focus:border-b-4 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full border-2 border-gray-900 bg-gray-900 px-4 py-2 text-white duration-200 hover:bg-slate-700 disabled:bg-gray-500"
        >
          {loading || 'Update Password'}
        </button>
      </form>
    </main>
  );
}
