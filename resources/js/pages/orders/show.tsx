import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Order {
    id: number;
    order_number: string;
    order_date: string;
    status: string;
    payment_status: string;
    total_price: number;
    notes: string;
    template: {
        id: number;
        title: string;
        price: number;
        category: {
            name: string;
        };
    };
    payments: Array<{
        id: number;
        status: string;
        payment_date: string;
        payment_method: string;
        transaction_id: string;
        amount: number;
    }>;
    wedding_details: {
        bride_name: string;
        groom_name: string;
        wedding_date: string;
        venue: string;
        ceremony_time: string;
        reception_time: string;
        guest_count: number;
        additional_info: string;
    };
}

interface Props {
    order: Order;
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

export default function OrderShow({ order }: Props) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
    const [processing, setProcessing] = useState(false);

    const handlePayment = () => {
        setProcessing(true);
        router.post(route('orders.payments.store', order.id), {
            payment_method: selectedPaymentMethod,
        }, {
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title={`Order ${order.order_number}`} />
            
            <AppShell>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                📋 Order Details
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Order #{order.order_number}
                            </p>
                        </div>
                        <Link
                            href={route('orders.index')}
                            className="text-pink-600 hover:text-pink-700 font-medium"
                        >
                            ← Back to Orders
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Order Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Order Status */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Order Status
                                </h2>
                                
                                <div className="flex items-center gap-4 mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                                        Payment {order.payment_status}
                                    </span>
                                </div>

                                {/* Progress Timeline */}
                                <div className="space-y-4">
                                    <div className={`flex items-center gap-3 ${order.status === 'pending' || order.status === 'process' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                                        <div className={`w-4 h-4 rounded-full ${order.status === 'pending' || order.status === 'process' || order.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'}`} />
                                        <span>Order Placed - {new Date(order.order_date).toLocaleDateString()}</span>
                                    </div>
                                    
                                    <div className={`flex items-center gap-3 ${order.status === 'process' || order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                                        <div className={`w-4 h-4 rounded-full ${order.status === 'process' || order.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'}`} />
                                        <span>Processing Started</span>
                                    </div>
                                    
                                    <div className={`flex items-center gap-3 ${order.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>
                                        <div className={`w-4 h-4 rounded-full ${order.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'}`} />
                                        <span>Order Completed</span>
                                    </div>
                                </div>

                                {order.status === 'completed' && (
                                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-2 text-green-800">
                                            <span className="text-xl">🎉</span>
                                            <span className="font-medium">Your invitation is ready!</span>
                                        </div>
                                        <p className="text-green-700 text-sm mt-1">
                                            Download your customized wedding invitation files.
                                        </p>
                                        <Button className="mt-3 bg-green-600 hover:bg-green-700">
                                            📥 Download Files
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Wedding Details */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    💒 Wedding Details
                                </h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Couple</h3>
                                        <p className="text-gray-600">
                                            {order.wedding_details.bride_name} & {order.wedding_details.groom_name}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Wedding Date</h3>
                                        <p className="text-gray-600">
                                            {new Date(order.wedding_details.wedding_date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-medium text-gray-900 mb-2">Ceremony Time</h3>
                                        <p className="text-gray-600">
                                            {order.wedding_details.ceremony_time}
                                        </p>
                                    </div>
                                    
                                    {order.wedding_details.reception_time && (
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">Reception Time</h3>
                                            <p className="text-gray-600">
                                                {order.wedding_details.reception_time}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {order.wedding_details.guest_count && (
                                        <div>
                                            <h3 className="font-medium text-gray-900 mb-2">Expected Guests</h3>
                                            <p className="text-gray-600">
                                                {order.wedding_details.guest_count}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <h3 className="font-medium text-gray-900 mb-2">Venue</h3>
                                    <p className="text-gray-600">
                                        {order.wedding_details.venue}
                                    </p>
                                </div>

                                {order.wedding_details.additional_info && (
                                    <div className="mt-6">
                                        <h3 className="font-medium text-gray-900 mb-2">Additional Information</h3>
                                        <p className="text-gray-600">
                                            {order.wedding_details.additional_info}
                                        </p>
                                    </div>
                                )}

                                {order.notes && (
                                    <div className="mt-6">
                                        <h3 className="font-medium text-gray-900 mb-2">Order Notes</h3>
                                        <p className="text-gray-600">
                                            {order.notes}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Payment History */}
                            {order.payments.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        💳 Payment History
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        {order.payments.map((payment) => (
                                            <div key={payment.id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(payment.status)}`}>
                                                                {payment.status}
                                                            </span>
                                                            <span className="text-sm text-gray-600">
                                                                via {payment.payment_method.replace('_', ' ')}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">
                                                            Transaction: {payment.transaction_id}
                                                        </p>
                                                        {payment.payment_date && (
                                                            <p className="text-sm text-gray-600">
                                                                {new Date(payment.payment_date).toLocaleString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-lg font-semibold text-gray-900">
                                                        ${payment.amount}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Template Info */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Template
                                </h3>
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">💒</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">
                                            {order.template.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {order.template.category.name}
                                        </p>
                                        <p className="text-lg font-semibold text-pink-600 mt-2">
                                            ${order.template.price}
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href={route('templates.show', order.template.id)}
                                    className="block w-full text-center border border-pink-600 text-pink-600 py-2 rounded-lg hover:bg-pink-50 transition-colors font-medium mt-4"
                                >
                                    View Template
                                </Link>
                            </div>

                            {/* Payment Section */}
                            {order.payment_status === 'pending' && (
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        💳 Complete Payment
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div className="p-4 bg-yellow-50 rounded-lg">
                                            <p className="text-yellow-800 text-sm">
                                                ⚠️ Payment is required to start processing your order.
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Payment Method
                                            </label>
                                            <select
                                                value={selectedPaymentMethod}
                                                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                            >
                                                <option value="credit_card">Credit Card</option>
                                                <option value="bank_transfer">Bank Transfer</option>
                                                <option value="e_wallet">E-Wallet</option>
                                            </select>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center text-lg font-bold">
                                                <span>Total:</span>
                                                <span className="text-pink-600">${order.total_price}</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handlePayment}
                                            disabled={processing}
                                            className="w-full bg-pink-600 hover:bg-pink-700"
                                        >
                                            {processing ? 'Processing...' : '💳 Pay Now'}
                                        </Button>

                                        <p className="text-xs text-gray-500 text-center">
                                            🔒 Secure payment processing
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Order Summary */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Order Summary
                                </h3>
                                
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Number:</span>
                                        <span className="font-medium">{order.order_number}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Date:</span>
                                        <span className="font-medium">
                                            {new Date(order.order_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Payment:</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.payment_status)}`}>
                                            {order.payment_status}
                                        </span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span className="text-pink-600">${order.total_price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppShell>
        </>
    );
}