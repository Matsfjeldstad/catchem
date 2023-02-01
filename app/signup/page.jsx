import SignupForm from './SignupForm';

export default function page() {
  return (
    <main className="p-10 md:p-6 flex flex-col lg:flex-row gap-20 items-center h-screen container mx-auto">
      <div className="hidden lg:block w-3/5 bg-gray-800 rounded-3xl overflow-hidden h-full p-8 bg-login bg-cover relative after:bg-black/60 after:absolute after:w-full after:h-full after:top-0 after:left-0">
        <button type="button" className="duration-200 text-white border-2 px-6 py-2 rounded-full relative z-20">
          Login
        </button>
        <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-10">
          <img src="/catchem-logo.svg" className="h-40" alt="catchem-logo" />
        </div>
      </div>
      <img src="/logo-dark.svg" className="h-16 sm:h-28 lg:hidden " alt="catchem-logo" />
      <SignupForm />
    </main>
  );
}
