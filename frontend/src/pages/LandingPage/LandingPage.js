import React from "react";
import Header from "./../Sitewide/Header";
import Footer from "./../Sitewide/Footer";
import Bios from "./Bios";

export default function Checkout() {
  return (
    <div className="CheckoutPage page">
      <Header />
      <Bios />
      <Footer />
    </div>
  );
}