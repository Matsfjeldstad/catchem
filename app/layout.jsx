import "./globals.css";
import NavBar from "./components/NavBar";

export default function RootLayout({ children }) {
  const data = "res";
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="flex flex-col lg:flex-row">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
