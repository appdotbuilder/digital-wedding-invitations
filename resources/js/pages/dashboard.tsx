import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Stats {
    total_orders?: number;
    pending_orders?: number;
    completed_orders?: number;
    total_spent?: number;
}

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
    wedding_details: {
        bride_name: string;
        groom_name: string;
        wedding_date: string;
    };
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
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

export default function Dashboard({ stats, recentOrders }: Props) {
    return (
        <>
            <Head title="Dashboard" />
            
            <AppShell>
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            🎉 Welcome to Your Dashboard
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Track your wedding invitation orders and manage your account
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                    <p className="text-3xl font-bold text-gray-900">
                                        {stats.total_orders || 0}
                                    </p>
                                </div>
                                <div className="text-4xl">📋</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                                    <p className="text-3xl font-bold text-yellow-600">
                                        {stats.pending_orders || 0}
                                    </p>
                                </div>
                                <div className="text-4xl">⏳</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                                    <p className="text-3xl font-bold text-green-600">
                                        {stats.completed_orders || 0}
                                    </p>
                                </div>
                                <div className="text-4xl">✅</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                                    <p className="text-3xl font-bold text-pink-600">
                                        ${stats.total_spent || '0.00'}
                                    </p>
                                </div>
                                <div className="text-4xl">💰</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Link
                            href={route('home')}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 group"
                        >
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Browse Templates</h3>
                                    <p className="text-pink-100">
                                        Discover beautiful wedding invitation designs
                                    </p>
                                </div>
                                <div className="text-4xl group-hover:scale-110 transition-transform">🎨</div>
                            </div>
                        </Link>

                        <Link
                            href={route('orders.index')}
                            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 group"
                        >
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">My Orders</h3>
                                    <p className="text-blue-100">
                                        Track your wedding invitation orders
                                    </p>
                                </div>
                                <div className="text-4xl group-hover:scale-110 transition-transform">📦</div>
                            </div>
                        </Link>

                        <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl">
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Get Support</h3>
                                    <p className="text-green-100">
                                        Need help? Contact our design team
                                    </p>
                                </div>
                                <div className="text-4xl">💬</div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    {recentOrders && recentOrders.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    📋 Recent Orders
                                </h2>
                                <Link
                                    href={route('orders.index')}
                                    className="text-pink-600 hover:text-pink-700 font-medium"
                                >
                                    View All →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="font-medium text-gray-900">
                                                        {order.template.title}
                                                    </h4>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                
                                                <div className="text-sm text-gray-600 space-y-1">
                                                    <p>
                                                        <strong>Order:</strong> {order.order_number}
                                                    </p>
                                                    <p>
                                                        <strong>Couple:</strong> {order.wedding_details.bride_name} & {order.wedding_details.groom_name}
                                                    </p>
                                                    <p>
                                                        <strong>Wedding:</strong> {new Date(order.wedding_details.wedding_date).toLocaleDateString()}
                                                    </p>
                                                    <p>
                                                        <strong>Ordered:</strong> {new Date(order.order_date).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:items-end gap-2">
                                                <div className="text-xl font-bold text-pink-600">
                                                    ${order.total_price}
                                                </div>
                                                <Link
                                                    href={route('orders.show', order.id)}
                                                    className="text-sm bg-pink-600 text-white px-3 py-1 rounded-lg hover:bg-pink-700 transition-colors text-center"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {(!recentOrders || recentOrders.length === 0) && (
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="text-6xl mb-4">💒</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Ready to create your dream wedding invitation?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Browse our beautiful collection of wedding invitation templates and start your order today.
                            </p>
                            <Link
                                href={route('home')}
                                className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                            >
                                🎨 Explore Templates
                            </Link>
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}