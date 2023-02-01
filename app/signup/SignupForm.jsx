import React from 'react';

export default function SignupForm() {
  return (
    <form
      onSubmit
      className="flex flex-col justify-between h-full max-h-[400px] items-center lg:items-start w-full max-w-lg lg:w-2/5"
    >
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold">Sign up</h1>
        <p>Start you next adventure</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className=" duration-200 py-3 border-b border-gray-600 w-full focus:outline-none hover:placeholder:text-gray-600 hover:duration-200 focus:border-b-4"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="duration-200 py-3 border-b border-gray-600 w-full focus:outline-none hover:placeholder:text-gray-600 hover:duration-200 focus:border-b-4"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className=" duration-200 py-3 border-b border-gray-600 w-full focus:outline-none hover:placeholder:text-gray-600 hover:duration-200 focus:border-b-4"
          />
        </label>
      </div>
      <div className="w-full">
        <button
          type="button"
          className="w-full border-gray-900 bg-gray-900 disabled:bg-gray-500 hover:bg-slate-700 duration-200 text-white border-2 px-6 py-2 rounded-full"
        >
          Test Test
        </button>
        <div className="mt-4 flex gap-1 text-center lg:text-left">
          Already have a user?
          <a href="/login" className=" underline underline-offset-2 font-medium">
            Go to Login
          </a>
        </div>
      </div>
    </form>
  );
}
