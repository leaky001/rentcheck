import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-sm py-4 bg-white shadow-inner mt-10">
      &copy; {new Date().getFullYear()} RentCheck. All rights reserved for 30days30apps.
    </footer>
  );
};

export default Footer;
