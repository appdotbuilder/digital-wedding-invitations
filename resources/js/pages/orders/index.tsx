import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Order {
    id: number;
    order_number: string;
    order_date: string;
    status: string;
    payment_status: string;
    total_price: number;
    template: {
        id: number;
        title: string;
        category: {
            name: string;
        };
    };
    payments: Array<{
        id: number;
        status: string;
        payment_date: string;
        payment_method: string;
    }>;
    wedding_details: {
        bride_name: string;
        groom_name: string;
        wedding_date: string;
    };
}

interface Props {
    orders: {
        data: Order[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            total: number;
        };
    };
    [key: string]: unknown;
}

const getStatusColor = (status: string) => {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        process: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const getPaymentStatusColor = (status: string) => {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        paid: 'bg-green-100 text-green-800',
        failed: 'bg-red-100 text-red-800',
        refunded: 'bg-purple-100 text-purple-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default function OrdersIndex({ orders }: Props) {
    return (
        <>
            <Head title="My Orders" />
            
            <AppShell>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                📋 My Orders
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Track your wedding invitation orders
                            </p>
                        </div>
                        <Link
                            href={route('home')}
                            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                        >
                            🛍️ Browse Templates
                        </Link>
                    </div>

                    {orders.data.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No orders yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start by browsing our beautiful wedding invitation templates
                            </p>
                            <Link
                                href={route('home')}
                                className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                            >
                                Explore Templates
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.data.map((order) => (
                                <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {order.template.title}
                                                    </h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                                                        {order.payment_status}
                                                    </span>
                                                </div>
                                                
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p>
                                                        <strong>Order:</strong> {order.order_number}
                                                    </p>
                                                    <p>
                                                        <strong>Category:</strong> {order.template.category.name}
                                                    </p>
                                                    <p>
                                                        <strong>Couple:</strong> {order.wedding_details.bride_name} & {order.wedding_details.groom_name}
                                                    </p>
                                                    <p>
                                                        <strong>Wedding Date:</strong> {new Date(order.wedding_details.wedding_date).toLocaleDateString()}
                                                    </p>
                                                    <p>
                                                        <strong>Ordered:</strong> {new Date(order.order_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-start lg:items-end gap-3">
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-pink-600">
                                                        ${order.total_price}
                                                    </div>
                                                    {order.payments.length > 0 && (
                                                        <div className="text-sm text-gray-600">
                                                            via {order.payments[0].payment_method}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route('orders.show', order.id)}
                                                        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                                                    >
                                                        View Details
                                                    </Link>
                                                    
                                                    {order.status === 'pending' && order.payment_status === 'pending' && (
                                                        <Link
                                                            href={route('orders.show', order.id)}
                                                            className="border border-pink-600 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50 transition-colors font-medium"
                                                        >
                                                            Pay Now
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="bg-gray-50 px-6 py-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className={order.status === 'pending' ? 'text-pink-600 font-medium' : 'text-gray-500'}>
                                                🕐 Pending
                                            </span>
                                            <span className={order.status === 'process' ? 'text-pink-600 font-medium' : 'text-gray-500'}>
                                                🎨 Processing
                                            </span>
                                            <span className={order.status === 'completed' ? 'text-pink-600 font-medium' : 'text-gray-500'}>
                                                ✅ Completed
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all ${
                                                    order.status === 'completed' ? 'bg-green-500 w-full' :
                                                    order.status === 'process' ? 'bg-blue-500 w-2/3' :
                                                    order.status === 'pending' ? 'bg-yellow-500 w-1/3' :
                                                    'bg-red-500 w-0'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Pagination */}
                            {orders.links.length > 3 && (
                                <div className="flex justify-center mt-8">
                                    <div className="flex gap-2">
                                        {orders.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 rounded-lg ${
                                                    link.active
                                                        ? 'bg-pink-600 text-white'
                                                        : link.url
                                                        ? 'bg-white text-pink-600 border border-pink-600 hover:bg-pink-50'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}