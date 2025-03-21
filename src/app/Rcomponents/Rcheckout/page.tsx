"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useLogo } from "@/app/LogoContext";
import Image from "next/image";
import axios from "axios";
import ErrorPopup from "@/app/popup.tsx/ErrorPopup";
import SuccessBox from "@/app/popup.tsx/SuccessBox";

export default function Checkout() {
  const [idNo, setIdNo] = useState("");
  const [stayDuration, setStayDuration] = useState(0);
  const [totalBill, setTotalBill] = useState<number | null>(null);
  const [subtotal, setSubtotal] = useState(1000); // Example subtotal, can be dynamic
  const [discountAmount, setDiscountAmount] = useState(0); // User input for fixed discount amount
  const [vatRate] = useState(13); // VAT rate of 13%
  const [total, setTotal] = useState(subtotal);
  const { logoUrl } = useLogo();
  
  const [invoiceNo, setInvoiceNo] = useState(""); // State for invoice number

  const [reservation, setReservation] = useState({
    res_id: "",
    roomNo: "",
    roomType: "",
    roomPrice: "",
    checkInDate: "",
    checkOutDate: "",
    guestName: "",
  });
  const [foodCharge, setFoodCharge] = useState<number | null>(null);
  const token = localStorage.getItem("token");
  const [todayDate, setTodayDate] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setTodayDate(currentDate);
  }, []);

  // Fetch reservation details by ID
  const handleIdNoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredIdNo = e.target.value;
    setIdNo(enteredIdNo);

    if (!enteredIdNo) {
      setReservation({
        res_id: "",
        roomNo: "",
        roomType: "",
        roomPrice: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
      });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/reservations/details`, {
        params: { idNo: enteredIdNo },
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservation({
        res_id: response.data.res_id,
        roomNo: response.data.room_no,
        roomType: response.data.room_type,
        roomPrice: response.data.room_price,
        checkInDate: response.data.check_in_date,
        checkOutDate: response.data.check_out_date,
        guestName: response.data.guest_name,
      });
    } catch (error) {
      console.error("Reservation not found", error);
      setReservation({
        res_id: "",
        roomNo: "",
        roomType: "",
        roomPrice: "",
        checkInDate: "",
        checkOutDate: "",
        guestName: "",
      });
    }
  };

  const handlereset = () => {
    setReservation({
      res_id: "".toString(),  // Ensure it's a string
      guestName: "",
      roomNo: "",
      roomType: "",
      roomPrice: "0",  // Ensure it's a string
      checkInDate: "",
      checkOutDate: "",
    });
    setFoodCharge(null);
    setDiscountAmount(0);
    setSubtotal(0);
    setTotalBill(0);
    setStayDuration(0);
    setInvoiceNo(""); // Reset invoice number
  };

  // Call Billing API
  const handleBillingAPI = async () => {
    console.log("Checkout button clicked");

    // Generate a unique invoice number
    const generatedInvoiceNo = `${Math.floor(1000 + Math.random() * 9000)}`;
    setInvoiceNo(generatedInvoiceNo);

    try {
      const billingData = {
        resId: reservation.res_id,
        roomBill: roomBill,
        foodCharge: foodCharge,
        discountAmount: discountAmount,
        vatRate: vatRate,
        finalTotal: finalTotal,
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
        invoiceNo: generatedInvoiceNo, 
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/billing/generate",
        billingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setSuccessMessage("Checked out successfully");
        handlereset();
      }
    } catch (error) {
      console.error("Error calling billing API:", error);
      alert("Failed to process billing.");
    }
  };

  // Fetch food charge
  useEffect(() => {
    if (reservation.res_id) {
      fetch(`http://localhost:8080/api/v1/food-orders/total-food-charge/${reservation.res_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API Response:", data);
          setFoodCharge(data);
        })
        .catch((error) => {
          console.error('Error fetching food charge:', error);
        });
    }
  }, [reservation.res_id]);

  // Calculate duration
  useEffect(() => {
    if (reservation.checkInDate && reservation.checkOutDate) {
      const checkInDate = new Date(reservation.checkInDate);
      const checkOutDate = new Date(reservation.checkOutDate);
      const duration = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
      setStayDuration(duration);
    }
  }, [reservation.checkInDate, reservation.checkOutDate]);

  // Calculate room bill
  const roomBill = useMemo(() => {
    const roomPrice = parseFloat(reservation.roomPrice) || 0;
    return (stayDuration * roomPrice).toFixed(2);
  }, [stayDuration, reservation.roomPrice]);

  // Calculate subtotal
  const SubtotalBill = useMemo(() => {
    const foodChargeAmount = foodCharge || 0;
    const roomBillAmount = parseFloat(roomBill) || 0;
    return (foodChargeAmount + roomBillAmount).toFixed(2);
  }, [foodCharge, roomBill]);

  // Calculate final total
  const finalTotal = useMemo(() => {
    const subtotalValue = parseFloat(SubtotalBill) || 0;
    const discountedAmount = subtotalValue - discountAmount;
    const vatAmount = (discountedAmount * vatRate) / 100;
    return (discountedAmount + vatAmount).toFixed(2);
  }, [SubtotalBill, discountAmount, vatRate]);

  // Handle print
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
          value={idNo}
          placeholder="1234"
          maxLength={20}
          onChange={handleIdNoChange}
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />
        <label className="block text-sm font-semibold">Guest Name</label>
        <input
          type="text"
          value={reservation.guestName}
          placeholder="Robert Wilson"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          readOnly
        />
        <label className="block text-sm font-semibold">Room Type</label>
        <input
          name="room_type"
          value={reservation.roomType}
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          readOnly
        />
        <label className="block text-sm font-semibold">Room No</label>
        <input
          name="Room No"
          value={reservation.roomNo}
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          readOnly
        />
        <label className="block text-sm font-semibold">Check In</label>
        <input
          type="text"
          value={reservation.checkInDate}
          placeholder="10/08/2024 06:36 PM"
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          readOnly
        />
        <label className="block text-sm font-semibold">Check Out</label>
        <input
          type="text"
          placeholder="10/12/2024"
          value={reservation.checkOutDate}
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          readOnly
        />
        <label className="block text-sm font-semibold">No. of Days</label>
        <input
          type="text"
          placeholder="4"
          value={stayDuration}
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          readOnly
        />
        <label className="block text-sm font-semibold">Room Price</label>
        <input
          type="text"
          placeholder="2000"
          value={reservation.roomPrice}
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          readOnly
        />
        <label className="block text-sm font-semibold">Room Bill</label>
        <input
          type="text"
          placeholder="11000"
          value={roomBill}
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
          readOnly
        />
        <label className="block text-sm font-semibold">Food Bill</label>
        <input
          type="text"
          placeholder="3000"
          value={foodCharge !== null ? foodCharge : ''}
          readOnly
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />
        <label className="block text-sm font-semibold">Total</label>
        <input
          type="text"
          placeholder="11000"
          value={SubtotalBill}
          className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
        />
        <div className="flex justify-end sm:justify-end px-2 py-2">
          <div className="flex space-x-2">
            <button
              type="button"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-600 text-lg"
              onClick={handleBillingAPI}
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
            <h1 className="text-4xl font-bold text-gray-950 font-serif">UniStay</h1>
            <p className="text-base text-black">Gandaki, Nepal</p>
            <p className="text-base text-black">Damauli, Tanahun</p>
            <p className="text-base text-black">33900, Vyas-2</p>
            <p className="text-base text-black"><b>Phone:</b> 065-560000</p>
            <p className="text-base text-black"><b>Email:</b> unistay2024@gmail.com</p>
            <p className="text-base text-black"><b>Website:</b> www.unistay.com</p>
            <p className="text-base text-black"><b>VAT No:</b> 025841333025</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              <label className="block text-sm font-semibold"><b>Date:</b></label>
              <input
                type="date"
                value={todayDate}
                className="border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
              />
            </div>
            <div className="flex-shrink-0 mt-2">
              <Image src={logoUrl} alt="Hotel Logo" width={100} height={100} className="rounded-full"/>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-gray-300 my-4" />

        {/* Invoice Details */}
        <div className="flex justify-between mb-6">
          <div className="space-x-2">
            <label className="font-semibold">Invoice No:</label>
            <input
              type="text"
              name="invoice"
              placeholder="Invoice No"
              value={invoiceNo} // Display the generated invoice number
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              readOnly
            />
          </div>
        </div>

        {/* Billed To Section */}
        <div className="flex justify-between mb-6">
          <div className="space-x-2">
            <label className="font-semibold">Billed To:</label>
            <input
              type="text"
              placeholder="Guest Name"
              value={reservation.guestName}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </div>

                {/* Check In and Check Out */}
                <div className="flex space-x-4 mt-3">
          {/* Check In Section */}
          <div className="flex-1">
            <label className="block text-sm font-semibold">Check In:</label>
            <input
              type="text"
              value={reservation.checkInDate}
              placeholder="10/08/2024 06:36 PM"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              readOnly
            />
          </div>

          {/* Check Out Section */}
          <div className="flex-1">
            <label className="block text-sm font-semibold">Check Out:</label>
            <input
              type="text"
              value={reservation.checkOutDate}
              placeholder="10/12/2024"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              readOnly
            />
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
              <td className="py-3 px-6 border border-gray-300 text-center">Room</td>
              <td className="py-3 px-6 border border-gray-300 text-center"></td>
              <td className="py-3 px-6 border border-gray-300 text-center"></td>
              <td className="py-3 px-6 border border-gray-300 text-center">{reservation.roomPrice}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{roomBill}</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="hover:bg-purple-100">
              <td className="py-3 px-6 border border-gray-300 text-center">Food</td>
              <td className="py-3 px-6 border border-gray-300 text-center"></td>
              <td className="py-3 px-6 border border-gray-300 text-center"></td>
              <td className="py-3 px-6 border border-gray-300 text-center"></td>
              <td className="py-3 px-6 border border-gray-300 text-center">{foodCharge}</td>
            </tr>
          </tbody>
        </table>

        {/* Summary of total bill */}
        <div className="text-right mb-6 mt-3">
          <div className="space-x-2">
            <label>Sub Total:</label>
            <input
              type="text"
              name="subTotal"
              value={SubtotalBill}
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
              value={discountAmount}
              onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
              className="mb-2 p-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="space-x-2">
            <label>VAT (13%):</label>
            <input
              type="text"
              name="vat"
              placeholder="VAT 13%"
              value={(parseFloat(SubtotalBill) - discountAmount) * 0.13 || 0} // VAT calculation
              className="mb-2 p-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              readOnly
            />
          </div>
          <div className="space-x-2">
            <label>Total:</label>
            <input
              type="text"
              name="total"
              placeholder="Total"
              value={finalTotal} // Total calculation
              className="mb-2 p-1 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              readOnly
            />
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-gray-300 my-4" />

        {/* Footer */}
        <div id="footer" className="flex justify-end mb-5">
          <button type="button" onClick={handlePrint}>
            <Image src="/print.png" alt="Hotel Logo" width={50} height={50} className="rounded-full" />
            Print
          </button>
        </div>
      </div>
       {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
      {showSuccessBox && <SuccessBox message="Order confirmed successfully!" onClose={() => setShowSuccessBox(false)} />} 
    </div>
  );
}