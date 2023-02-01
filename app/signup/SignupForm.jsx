import React from "react";

export default function SignupForm() {
  return (
    <form
      onSubmit
      className="flex h-full max-h-[400px] w-full max-w-lg flex-col items-center justify-between lg:w-2/5 lg:items-start"
    >
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold">Sign up</h1>
        <p>Start you next adventure</p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className=" w-full border-b border-gray-600 py-3 duration-200 hover:duration-200 hover:placeholder:text-gray-600 focus:border-b-4 focus:outline-none"
          />
        </label>
        <label htmlFor="email">
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="w-full border-b border-gray-600 py-3 duration-200 hover:duration-200 hover:placeholder:text-gray-600 focus:border-b-4 focus:outline-none"
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className=" w-full border-b border-gray-600 py-3 duration-200 hover:duration-200 hover:placeholder:text-gray-600 focus:border-b-4 focus:outline-none"
          />
        </label>
      </div>
      <div className="w-full">
        <button
          type="button"
          className="w-full rounded-full border-2 border-gray-900 bg-gray-900 px-6 py-2 text-white duration-200 hover:bg-slate-700 disabled:bg-gray-500"
        >
          Sign up
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
