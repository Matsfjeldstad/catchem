import './globals.css';
import React from 'react';
import NavBar from './components/NavBar';

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  // eslint-disable-next-line no-unused-vars
  const data = 'res';
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
