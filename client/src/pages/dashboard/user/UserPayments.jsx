import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi.js";

const UserPayments = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: ordersdata,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading) return <div className="text-center py-12 text-gray-500 font-medium">Loading payments history...</div>;
  if (error) return <div className="text-center py-12 text-red-500 font-medium">No orders found.</div>;

  const rawOrders = ordersdata?.orders || [];
  
  // FIXED: Changed to ascending sort (a - b) so the oldest order (Order #1) is at the top
  const orders = [...rawOrders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  
  const totalPayment = orders
    ?.reduce((acc, order) => acc + order.amount, 0)
    .toFixed(2);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Dynamic Summary Dashboard Card */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-2xl shadow-lg p-6 sm:p-8 mb-8 text-white">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
          <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        </div>
        <div className="relative z-10">
          <p className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-1">Total Lifetime Spend</p>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            NPR {totalPayment ? totalPayment : "0.00"}
          </h3>
          <p className="text-xs text-blue-100/80 mt-2 font-medium">
            Based on {orders.length} processed transaction{orders.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Transaction History Header */}
      <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-100">
        <h4 className="text-lg font-bold text-gray-800 tracking-tight">Payment Logs</h4>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">
          {orders.length} Records
        </span>
      </div>

      {/* Transaction Panels */}
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-400 text-sm">No payment history available.</div>
      ) : (
        <ul className="space-y-4">
          {orders.map((item, index) => {
            const isCompleted = item?.status === 'completed';
            const isPending = item?.status === 'pending';

            return (
              <li 
                key={index} 
                className="group bg-white rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-200 hover:shadow-md hover:border-gray-200"
              >
                {/* Left Side: Order Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {/* FIXED: Changed from (orders.length - index) to (index + 1) to match ascending order */}
                    <h5 className="font-bold text-gray-800">Order #{index + 1}</h5>
                    <span className="text-[11px] font-mono font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                      ID: {item?.orderId?.substring(0, 12)}...
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {new Date(item?.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>

                {/* Right Side: Price Amount and Badges */}
                <div className="flex items-center justify-between sm:justify-end gap-5 border-t border-gray-50 pt-3 sm:pt-0 sm:border-0">
                  <div className="text-right">
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Amount</span>
                    <span className="font-semibold text-gray-900 font-mono text-base">
                      NPR {item?.amount ? item.amount.toFixed(2) : "0.00"}
                    </span>
                  </div>

                  <div className="min-w-[100px] text-right">
                    <span className={`inline-flex items-center justify-center text-center w-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border
                      ${isCompleted 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                        : isPending 
                          ? 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse' 
                          : 'bg-blue-50 text-blue-700 border-blue-100'
                      }`}
                    >
                      {item?.status}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserPayments;