import React from 'react';

export default function LogInForm() {
  return (
    <form className="flex flex-col justify-between h-full max-h-[400px] items-center lg:items-start w-full max-w-md lg:w-2/5">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold">Login</h1>
        <p>Lets catch em all</p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="duration-200 py-3 border-b border-gray-600 w-full focus:outline-none focus:border-b-4"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className=" duration-200 py-3 border-b border-gray-600 w-full focus:outline-none focus:border-b-4"
          />
        </label>
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full border-gray-900 bg-gray-900 disabled:bg-gray-500 hover:bg-slate-700 duration-200 text-white border-2 px-6 py-2 rounded-full"
        >
          Login
        </button>
        <div className="mt-4 text-center lg:text-left">
          Forgot password?
          <a className=" underline underline-offset-2 font-medium">request new password</a>
        </div>
      </div>
    </form>
  );
}
