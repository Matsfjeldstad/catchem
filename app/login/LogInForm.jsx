import React from "react";

export default function LogInForm() {
  return (
    <form className="flex h-full max-h-[400px] w-full max-w-md flex-col items-center justify-between lg:w-2/5 lg:items-start">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold">Login</h1>
        <p>Lets catch em all</p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="w-full border-b border-gray-600 py-3 duration-200 focus:border-b-4 focus:outline-none"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className=" w-full border-b border-gray-600 py-3 duration-200 focus:border-b-4 focus:outline-none"
          />
        </label>
      </div>
      <div className="w-full">
        <button
          type="submit"
          className="w-full rounded-full border-2 border-gray-900 bg-gray-900 px-6 py-2 text-white duration-200 hover:bg-slate-700 disabled:bg-gray-500"
        >
          Login
        </button>
        <div className="mt-4 text-center lg:text-left">
          Forgot password?
          <a className=" font-medium underline underline-offset-2">
            request new password
          </a>
        </div>
      </div>
    </form>
  );
}
