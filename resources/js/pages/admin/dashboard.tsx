import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { type SharedData } from '@/types';

interface Stats {
    total_users?: number;
    total_admin_users?: number;
    total_templates?: number;
    my_templates?: number;
    active_templates?: number;
    total_orders?: number;
    pending_orders?: number;
    total_revenue?: number;
}

interface Order {
    id: number;
    order_number: string;
    order_date: string;
    status: string;
    payment_status: string;
    total_price: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    template: {
        id: number;
        title: string;
        category: {
            name: string;
        };
    };
}

interface Template {
    id: number;
    title: string;
    price: number;
    order_count: number;
    category: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    recentOrders?: Order[];
    popularTemplates?: Template[];
    myTopTemplates?: Template[];
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

export default function AdminDashboard({ stats, recentOrders, popularTemplates, myTopTemplates }: Props) {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user && typeof auth.user === 'object' && 'role' in auth.user ? (auth.user.role as string) : null;
    const isSuperAdmin = userRole === 'super_admin';

    return (
        <>
            <Head title="Admin Dashboard" />
            
            <AppShell>
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isSuperAdmin ? '👑 Super Admin Dashboard' : '🏢 Admin Dashboard'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isSuperAdmin 
                                ? 'Manage the entire wedding invitation platform'
                                : 'Manage your templates and orders'
                            }
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {isSuperAdmin ? (
                            <>
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                                            <p className="text-3xl font-bold text-gray-900">
                                                {stats.total_users || 0}
                                            </p>
                                        </div>
                                        <div className="text-4xl">👥</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Admin Users</p>
                                            <p className="text-3xl font-bold text-blue-600">
                                                {stats.total_admin_users || 0}
                                            </p>
                                        </div>
                                        <div className="text-4xl">🏢</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Total Templates</p>
                                            <p className="text-3xl font-bold text-purple-600">
                                                {stats.total_templates || 0}
                                            </p>
                                        </div>
                                        <div className="text-4xl">🎨</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Platform Revenue</p>
                                            <p className="text-3xl font-bold text-green-600">
                                                ${stats.total_revenue || '0.00'}
                                            </p>
                                        </div>
                                        <div className="text-4xl">💰</div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">My Templates</p>
                                            <p className="text-3xl font-bold text-gray-900">
                                                {stats.my_templates || 0}
                                            </p>
                                        </div>
                                        <div className="text-4xl">🎨</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Active Templates</p>
                                            <p className="text-3xl font-bold text-green-600">
                                                {stats.active_templates || 0}
                                            </p>
                                        </div>
                                        <div className="text-4xl">✅</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Template Orders</p>
                                            <p className="text-3xl font-bold text-blue-600">
                                                {stats.total_orders || 0}
                                            </p>
                                        </div>
                                        <div className="text-4xl">📦</div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">Revenue</p>
                                            <p className="text-3xl font-bold text-purple-600">
                                                ${stats.total_revenue || '0.00'}
                                            </p>
                                        </div>
                                        <div className="text-4xl">💰</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Link
                            href={route('admin.templates.create')}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 group"
                        >
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Create Template</h3>
                                    <p className="text-pink-100">
                                        Add a new wedding invitation design
                                    </p>
                                </div>
                                <div className="text-4xl group-hover:scale-110 transition-transform">➕</div>
                            </div>
                        </Link>

                        <Link
                            href={route('admin.templates.index')}
                            className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 group"
                        >
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Manage Templates</h3>
                                    <p className="text-blue-100">
                                        View and edit your templates
                                    </p>
                                </div>
                                <div className="text-4xl group-hover:scale-110 transition-transform">🎨</div>
                            </div>
                        </Link>

                        <Link
                            href={route('admin.orders.index')}
                            className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 group"
                        >
                            <div className="flex items-center">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2">Manage Orders</h3>
                                    <p className="text-green-100">
                                        Process customer orders
                                    </p>
                                </div>
                                <div className="text-4xl group-hover:scale-110 transition-transform">📋</div>
                            </div>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Orders */}
                        {recentOrders && recentOrders.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        📋 Recent Orders
                                    </h2>
                                    <Link
                                        href={route('admin.orders.index')}
                                        className="text-pink-600 hover:text-pink-700 font-medium"
                                    >
                                        View All →
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {recentOrders.slice(0, 5).map((order) => (
                                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-medium text-gray-900">
                                                            {order.template.title}
                                                        </h4>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="text-sm text-gray-600">
                                                        <p><strong>Customer:</strong> {order.user.name}</p>
                                                        <p><strong>Order:</strong> {order.order_number}</p>
                                                        <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-pink-600 mb-2">
                                                        ${order.total_price}
                                                    </div>
                                                    <Link
                                                        href={route('admin.orders.show', order.id)}
                                                        className="text-xs bg-pink-600 text-white px-2 py-1 rounded hover:bg-pink-700 transition-colors"
                                                    >
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Popular/Top Templates */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {isSuperAdmin ? '🏆 Popular Templates' : '🎨 My Top Templates'}
                                </h2>
                                <Link
                                    href={route('admin.templates.index')}
                                    className="text-pink-600 hover:text-pink-700 font-medium"
                                >
                                    View All →
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {(isSuperAdmin ? popularTemplates : myTopTemplates)?.slice(0, 5).map((template) => (
                                    <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 mb-1">
                                                    {template.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    {template.category.name}
                                                </p>
                                                <div className="text-sm text-gray-500">
                                                    {template.order_count} orders
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-lg font-bold text-pink-600">
                                                    ${template.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pending Orders Alert */}
                    {stats.pending_orders && stats.pending_orders > 0 && (
                        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">⚠️</div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-yellow-800">
                                        {stats.pending_orders} Pending Orders
                                    </h3>
                                    <p className="text-yellow-700">
                                        You have orders waiting for payment or processing. Review them to keep customers happy.
                                    </p>
                                </div>
                                <Link
                                    href={route('admin.orders.index', { status: 'pending' })}
                                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                                >
                                    Review Orders
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </AppShell>
        </>
    );
}