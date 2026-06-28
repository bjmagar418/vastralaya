import { useGetOrderByIdQuery } from '../../../redux/features/orders/orderApi';
import { useParams } from 'react-router-dom';
import TimelineStep from '../../../components/TimelineStep';

const OrderDetail = () => {
    const { orderId } = useParams();
    const { data, error, isLoading } = useGetOrderByIdQuery(orderId);
    
    const order = data?.order;

    // 1. Keep loading and error states at the top
    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">No orders found</div>;
    
    // 2. CRITICAL GUARD: If the query finished but 'order' is still missing, stop here.
    if (!order) return <div className="text-center py-4">Order details could not be loaded.</div>;

    // 3. Now it is 100% safe to define functions that depend on 'order'
    const isCompleted = (status) => {
        const statuses = ["pending", "processing", "shipped", "completed"];
        // Safe check using optional chaining
        return statuses.indexOf(status) < statuses.indexOf(order?.status);
    };
    
    const isCurrent = (status) => order?.status === status;

  const steps = [
    {
        status: "pending",
        label: "Pending",
        description: "Your order has been created and is awaiting processing.",
        icon: { iconName: "time-line" },
    },
    {
        status: "processing",
        label: "Processing",
        description: "Your order is currently being processed.",
        icon: { iconName: "loader-line" },
    },
    {
        status: "shipped",
        label: "Shipped",
        description: "Your order has been shipped.",
        icon: { iconName: "truck-line" },
    },
    {
        status: "completed",
        label: "Completed",
        description: "Your order has been successfully completed.",
        icon: { iconName: "check-line" },
    },
];

    return (


        <div className="min-h-[60vh] flex flex-col justify-center items-center px-4 py-12 bg-gradient-to-b from-gray-50 to-gray-100/50">
  <section className="w-full max-w-3xl bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-10 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)]">
    
    {/* Decorative Header Block */}
    <div className="relative border-b border-gray-100 pb-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600/80">Live Tracker</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
          Payment {order?.status}
        </h2>
      </div>

      {/* Styled Badge Metadata */}
      <div className="flex flex-col sm:flex-row gap-2 md:text-right">
        <div className="bg-gray-50 border border-gray-200/60 rounded-xl px-4 py-2">
          <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">Order ID</span>
          <span className="font-mono text-sm font-semibold text-gray-700 select-all">{order?.orderId}</span>
        </div>
        <div className="bg-blue-50/60 border border-blue-100 rounded-xl px-4 py-2 flex flex-col justify-center">
          <span className="block text-[10px] uppercase font-bold text-blue-400 tracking-wider">Status</span>
          <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">{order?.status}</span>
        </div>
      </div>
    </div>

    {/* Timeline Component Container */}
    <div className="bg-gray-50/50 rounded-xl p-4 md:p-8 border border-gray-100/80">
      <ol className="sm:flex items-start justify-between w-full relative z-10 overflow-hidden gap-y-8 sm:gap-y-0">
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
    </div>

  </section>
</div>
    );
};

export default OrderDetail;