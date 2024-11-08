"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Checkout() {

{/* Printing Invoice*/}
  const handlePrint = () => {
    const printContent = document.getElementById("invoice-section");
    if (!printContent) return;
    const contentClone = printContent.cloneNode(true) as HTMLElement;
    const lastDivider = contentClone.querySelectorAll("hr").item(contentClone.querySelectorAll("hr").length - 1);
    if (lastDivider) {
      let nextElement = lastDivider.nextSibling;
      while (nextElement) {
        const elementToRemove = nextElement;
        nextElement = nextElement.nextSibling;
        elementToRemove?.remove();
      }
    }
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = contentClone.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
  };
  
  return (
    <div className="flex justify-between p-8">

{/* Stay Duration Calculation */}
      <div className="w-1/2 border p-6 bg-gray-100 mr-4 rounded-lg shadow-lg">
        <h2 className="bg-gray-950 text-xl font-bold mb-6 text-white text-center h-12 flex justify-center items-center">Stay Duration Calculation</h2>
      
        <label className="block text-sm font-semibold">ID No.</label>
        <input
          type="text"
          placeholder="1234"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />

        <label className="block text-sm font-semibold">Customer Name</label>
        <input
          type="text"
          placeholder="Robert Wilson"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />

        <label className="block text-sm font-semibold">Room Type</label>
        <select
          name="roomType"
          defaultValue=""
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        >
          <option value="" disabled>
            Select Room Type
          </option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>

        <label className="block text-sm font-semibold">Room No</label>
        <select
          name="Room No"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          defaultValue=""
        >
          <option value="" disabled>
            Select Room No
          </option>
          <option value="101">101</option>
          <option value="102">102</option>
          <option value="103">103</option>
        </select>

        <label className="block text-sm font-semibold">Check In</label>
        <input
          type="text"
          placeholder="10/08/2024 06:36 PM"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />

        <label className="block text-sm font-semibold">Check Out</label>
        <input
          type="text"
          placeholder="10/12/2024"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />

        <label className="block text-sm font-semibold">No. of Days</label>
        <input
          type="text"
          placeholder="4"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />

        <label className="block text-sm font-semibold">Room Price</label>
        <input
          type="text"
          placeholder="2000"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />

        <label className="block text-sm font-semibold">Total</label>
        <input
          type="text"
          placeholder="8000"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />
        <div className="flex justify-end sm:justify-end px-2 py-2">
            <div className="flex space-x-2">
              <button
                type="button"
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-600 text-lg"
              >
                Check Out
              </button>
            </div>
          </div>
      </div>

{/* Invoice Section */}
  <div id="invoice-section" className="w-full max-w-3xl bg-gray-100 p-8 rounded-lg shadow-lg">
  
{/* Invoice Header */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h1 className="text-4xl font-bold text-gray-950 font-serif">Hotel Grace Inn</h1>
      <p className="text-base text-black">Gandaki, Nepal</p>
      <p className="text-base text-black">Damauli, Tanahun</p>
      <p className="text-base text-black">33900, Vyas-2</p>
      <p className="text-base text-black">Phone: 065-560000</p>
      <p className="text-base text-black">Website: www.hotelgraceinn.com</p>
    </div>

{/* Date and Logo */}
    <div className="flex flex-col items-end space-y-2">
      <div className="flex items-center space-x-2">
        <label className="block text-sm font-semibold">Date:</label>
        <input
          type="date"
          className="border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />
      </div>
      <div className="flex-shrink-0 mt-2">
        <Image src="/logo.jpg" alt="Hotel Logo" width={80} height={80} className="rounded-full"/>
      </div>
    </div>
  </div>

{/* Divider Line */}
  <hr className="border-gray-300 my-4" />

{/* Invoice Details */}
        <div className="flex justify-between mb-6">
          <div className="space-x-2">
            <label>Invoice No:</label>
            <input
              type="text"
              name="invoice"
              placeholder="Invoice No"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </div>
    <div className="flex justify-between items-start mb-6">
    
{/* Left Section: Customer Details */}
    <div className="flex-1 mr-4">
      <label className="block text-sm font-semibold">Billed To:</label>
      <input
        type="text"
        placeholder="Customer Name"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 mb-2"
      />
      <input
        type="text"
        placeholder="Customer Address"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
      />
    </div>

{/* Right Section: Check In/Out */}
    <div className="w-1/2 flex flex-col justify-end">
      <div className=" space-x-2 mt-3">
        <label>Check In:</label>
        <input
          type="text"
          placeholder="10/08/2024 06:36 PM"
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
        />
      </div>

      <div className="space-x-2 mt-4">
        <label>Check Out:</label>
        <input
          type="text"
          placeholder="10/12/2024"
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
        />
      </div>
    </div>
  </div>

{/* Divider Line */}
<hr className="border-gray-300 my-4" />

{/* Item Table */}
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-center border border-gray-300">Type</th>
              <th className="py-3 px-6 text-center border border-gray-300">Item/Service</th>
              <th className="py-3 px-6 text-center border border-gray-300">Quantity</th>
              <th className="py-3 px-6 text-center border border-gray-300">Rate</th>
              <th className="py-3 px-6 text-center border border-gray-300">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-purple-100">
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            </tr>
          </tbody>
        </table>

{/* Summary */}
        <div className="text-right mb-6 mt-3 ">
        <div className="space-x-2">
            <label>Sub Total:</label>
            <input
              type="text"
              name="subTotal"
              placeholder="Sub Total"
              className="mb-2 p-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="space-x-2">
            <label>Discount:</label>
            <input
              type="text"
              name="discount"
              placeholder="Discount"
              className="mb-2 p-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="space-x-2">
            <label>VAT (13%):</label>
            <input
              type="text"
              name="vat"
              placeholder="VAT 13%"
              className="mb-2 p-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="space-x-2">
            <label>Total:</label>
            <input
              type="text"
              name="total"
              placeholder="Total"
              className="mb-2 p-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </div>

{/* Divider Line */}
<hr className="border-gray-300 my-4" ></hr>
        
{/* Footer */}
       <div id="footer" className="flex justify-end mb-5">
          <button type="button" onClick={handlePrint}>
           <Image src="/print.png" alt="Hotel Logo" width={50} height={50} className="rounded-full"/>
           Print
          </button>
        </div>
      </div>
    </div>
  );
}
