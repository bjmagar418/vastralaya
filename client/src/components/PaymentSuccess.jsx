import React from 'react'
import { useEffect, useState } from 'react';
import { getBaseUrl } from '../utils/baseURL';
import TimelineStep from './TimelineStep';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');
    if (sessionId) {
      fetch(`${getBaseUrl()}/api/orders/confirm-payment`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ session_id: sessionId })
      })
      .then((res) => res.json())
      .then((data) => setOrder(data.order))
      .catch((err) => console.error("Error confirming payment", err))
    }
  }, [])

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-3">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">Confirming payment...</p>
      </div>
    );
  }

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  }
  const isCurrent = (status) => order.status === status;

  // Icons and matching modern Tailwind configurations
  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
      icon: { iconName: "time-line", bgColor: "bg-amber-500", textColor: "text-amber-500", ringColor: "ring-amber-100" },
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: { iconName: "loader-line", bgColor: "bg-blue-500", textColor: "text-blue-500", ringColor: "ring-blue-100" },
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
      icon: { iconName: "truck-line", bgColor: "bg-indigo-500", textColor: "text-indigo-500", ringColor: "ring-indigo-100" },
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: { iconName: "check-line", bgColor: "bg-emerald-500", textColor: "text-emerald-500", ringColor: "ring-emerald-100" },
    },
  ];

  return (
    <section className="max-w-4xl mx-auto my-8 p-8 bg-white border border-gray-100 shadow-xl shadow-gray-100/50 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-gray-100">
      {/* Decorative Top Success Header */}
      <div className="flex flex-col items-center text-center mb-8 pb-6 border-b border-gray-100">
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-3 text-emerald-500 animate-bounce">
          <i className="ri-checkbox-circle-fill text-4xl"></i>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent uppercase">
          Payment {order?.status}
        </h2>
      </div>

      {/* Meta Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm">
        <div className="flex items-center space-x-2 text-gray-600">
          <i className="ri-file-list-3-line text-lg text-gray-400"></i>
          <span>Order ID: <strong className="text-gray-900 font-mono">{order?.orderId}</strong></span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 sm:justify-end">
          <i className="ri-shield-check-line text-lg text-gray-400"></i>
          <span>Status: <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 capitalize">{order?.status}</span></span>
        </div>
      </div>
      
      {/* Timeline Wrapper */}
      <ol className="flex flex-col sm:flex-row items-start sm:items-center relative w-full gap-6 sm:gap-0">
        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            icon={step.icon}
            description={step.description}
          />
        ))}
      </ol>
    </section>
  )
}

export default PaymentSuccess;