import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const DeliveryTable = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await fetch("/api/v1/myorder");
      const data = await response.json();
      setDeliveries(data.order);
    } catch (error) {
      console.error("Error fetching deliveries:", error);
    }
  };

  const handleDeleteOrder = async () => {
    if (!selectedDeliveryId) return;

    try {
      await fetch(`/api/v1/cancel/${selectedDeliveryId}`, {
        method: "DELETE",
      });
      setDeliveries(
        deliveries.filter((delivery) => delivery._id !== selectedDeliveryId)
      );
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const generateInvoice = (delivery) => {
    const doc = new jsPDF();

    const content = `
      Pickup Date & Time: ${delivery.dateTime}
      Receiver Name: ${delivery.receiverName}
      Pickup Address: ${delivery.pickupLocation}
      Drop Address: ${delivery.dropLocation}
      Package Weight: ${delivery.packageWeight}
      Payment Mode: ${delivery.paymentMode}
      Total Price: $ ${delivery.totalPrice}
    `;

    doc.setFontSize(14);
    doc.text(content, 10, 10);
    doc.save("invoice.pdf");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Date & Time</th>
              <th className="px-6 py-3">Weight</th>
              <th className="px-6 py-3">Pickup</th>
              <th className="px-6 py-3">Receiver</th>
              <th className="px-6 py-3">Drop-off</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Tracking ID</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length > 0 ? (
              deliveries.map((delivery) => (
                <tr key={delivery._id} className="bg-white border-b">
                  <td className="px-6 py-4">{delivery.dateTime}</td>
                  <td className="px-6 py-4">{delivery.packageWeight}</td>
                  <td className="px-6 py-4">{delivery.pickupLocation}</td>
                  <td className="px-6 py-4">{delivery.receiverName}</td>
                  <td className="px-6 py-4">{delivery.dropLocation}</td>
                  <td className="px-6 py-4">{delivery.paymentMode}</td>
                  <td className="px-6 py-4">${delivery.totalPrice}</td>
                  <td className="px-6 py-4">{delivery.status}</td>
                  <td className="px-6 py-4">{delivery.trackingId}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => generateInvoice(delivery)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        📄
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDeliveryId(delivery._id);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="px-6 py-4 text-center">
                  No deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Cancel Order</h3>
            <p className="mb-4">
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOrder}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryTable;
