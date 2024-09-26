/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    pickupAddress: "",
    pickupPincode: "",
    email: "",
    mobile: "",
    dname: "",
    dropAddress: "",
    dropPincode: "",
    demail: "",
    dmobile: "",
    deliveryType: "",
    weight: "",
    date: "",
    time: "",
    payment: "",
  });

  const [shipping, setShipping] = useState(0);
  const [insurance] = useState(15);

  useEffect(() => {
    fetch("/api/v1/userProfile")
      .then((res) => res.json())
      .then((data) =>
        setFormData((prev) => ({ ...prev, name: data.user.name }))
      )
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    calculateShipping();
  }, [formData.deliveryType, formData.weight]);

  const calculateShipping = () => {
    const { deliveryType, weight } = formData;
    let cost = 0;

    if (deliveryType === "Within City") {
      cost =
        weight === "Upto 1Kg"
          ? 70
          : weight === "Upto 5Kg"
          ? 130
          : weight === "Upto 10kg"
          ? 210
          : weight === "Upto 15Kg"
          ? 280
          : weight === "Upto 20Kg"
          ? 380
          : 500;
    } else if (deliveryType === "Intercity") {
      cost =
        weight === "Upto 1Kg"
          ? 100
          : weight === "Upto 5Kg"
          ? 180
          : weight === "Upto 10kg"
          ? 270
          : weight === "Upto 15Kg"
          ? 350
          : weight === "Upto 20Kg"
          ? 500
          : 700;
    }

    setShipping(cost);
  };

  const gst = shipping * 0.18;
  const total = shipping + gst + insurance;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/createDelivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deliveryMode: formData.deliveryType,
          packageWeight: formData.weight,
          pickupLocation: `${formData.pickupAddress} Pincode: ${formData.pickupPincode}`,
          dropLocation: `${formData.dropAddress} Pincode: ${formData.dropPincode}`,
          totalPrice: total,
          deliveryPrice: shipping,
          gst,
          insurance,
          paymentMode: formData.payment,
          pickupMob: formData.mobile,
          dateTime: `${formData.date} ${formData.time}`,
          receiverName: formData.dname,
          receiverMob: formData.dmobile,
        }),
      });

      if (response.ok) {
        alert("Delivery order created successfully!");
        // Reset form or redirect user
      } else {
        alert("Failed to create delivery order. Please try again.");
      }
    } catch (error) {
      console.error("Error creating delivery:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl xl:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-indigo-500 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono">
                S
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Create Delivery Order</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Enter the delivery details below
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h3 className="font-bold text-lg">Pickup Details</h3>
                <div className="flex flex-col">
                  <label className="leading-loose">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-[500px] sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Your full name"
                    readOnly
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Pickup Address</label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleInputChange}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-[500px] sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Enter pickup address"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Pickup Pincode</label>
                  <input
                    type="text"
                    name="pickupPincode"
                    value={formData.pickupPincode}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Enter pickup pincode"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Your email address"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Your mobile number"
                  />
                </div>

                <h3 className="font-bold text-lg mt-6">Delivery Details</h3>
                <div className="flex flex-col">
                  <label className="leading-loose">Receiver's Full Name</label>
                  <input
                    type="text"
                    name="dname"
                    value={formData.dname}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Receiver's full name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Drop Address</label>
                  <input
                    type="text"
                    name="dropAddress"
                    value={formData.dropAddress}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Enter drop address"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Drop Pincode</label>
                  <input
                    type="text"
                    name="dropPincode"
                    value={formData.dropPincode}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Enter drop pincode"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">
                    Receiver's Email Address
                  </label>
                  <input
                    type="email"
                    name="demail"
                    value={formData.demail}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Receiver's email address"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">
                    Receiver's Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="dmobile"
                    value={formData.dmobile}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Receiver's mobile number"
                  />
                </div>

                <h3 className="font-bold text-lg mt-6">Order Details</h3>
                <div className="flex flex-col">
                  <label className="leading-loose">Delivery Type</label>
                  <select
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  >
                    <option value="">Select delivery type</option>
                    <option value="Within City">Within City</option>
                    <option value="Intercity">Intercity</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Package Weight</label>
                  <select
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  >
                    <option value="">Select package weight</option>
                    <option value="Upto 1Kg">Upto 1Kg</option>
                    <option value="Upto 5Kg">Upto 5Kg</option>
                    <option value="Upto 10kg">Upto 10kg</option>
                    <option value="Upto 15Kg">Upto 15Kg</option>
                    <option value="Upto 20Kg">Upto 20Kg</option>
                    <option value="More than 20Kg">More than 20Kg</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Schedule Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Schedule Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  />
                </div>

                <h3 className="font-bold text-lg mt-6">Payment Details</h3>
                <div className="flex flex-col">
                  <label className="leading-loose">Payment Mode</label>
                  <select
                    name="payment"
                    value={formData.payment}
                    onChange={handleInputChange}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  >
                    <option value="">Select payment mode</option>
                    <option value="UPI">UPI</option>
                    <option value="COD">Cash on Delivery</option>
                    <option value="Debit/Credit Card">Bank Card</option>
                    <option value="COP">Cash on Pickup</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping Cost</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Insurance</span>
                  <span>₹{insurance}</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-indigo-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-indigo-600 transition-colors duration-300"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryForm;
