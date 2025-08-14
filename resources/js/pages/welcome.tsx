import React, { useState } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Template {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: {
        id: number;
        name: string;
    };
    owner: {
        id: number;
        name: string;
    };
    order_count: number;
}

interface Category {
    id: number;
    name: string;
}

interface Props {
    templates: {
        data: Template[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            total: number;
        };
    };
    categories: Category[];
    filters: {
        category?: string;
        min_price?: string;
        max_price?: string;
        search?: string;
    };
    [key: string]: unknown;
}

export default function Welcome({ templates, categories, filters }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');

    const handleFilter = () => {
        router.get('/', {
            search: searchTerm,
            category: selectedCategory,
            min_price: minPrice,
            max_price: maxPrice,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        router.get('/', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Digital Wedding Invitations">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    💕 WeddingInvite
                                </h1>
                            </div>
                            <nav className="flex items-center gap-4">
                                {auth.user ? (
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-600">
                                            Welcome, {auth.user.name}
                                        </span>
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={route('orders.index')}
                                            className="text-pink-600 hover:text-pink-700 font-medium"
                                        >
                                            My Orders
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 font-medium"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-16 text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            ✨ Beautiful Digital Wedding Invitations
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Create stunning, personalized wedding invitations with our premium templates. 
                            Easy to customize, perfect for your special day.
                        </p>
                        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🎨</span>
                                <span>Professional Designs</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">⚡</span>
                                <span>Quick Customization</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">💳</span>
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">📱</span>
                                <span>Mobile Optimized</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="py-8 bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap gap-4 items-end">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search Templates
                                </label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by title..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>
                            
                            <div className="min-w-[150px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="min-w-[120px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Min Price ($)
                                </label>
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>

                            <div className="min-w-[120px]">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Price ($)
                                </label>
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="200"
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button onClick={handleFilter} className="bg-pink-600 hover:bg-pink-700">
                                    Filter
                                </Button>
                                <Button onClick={clearFilters} variant="outline">
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Templates Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">
                            Featured Templates ({templates.meta.total} available)
                        </h3>
                        
                        {templates.data.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">😔</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    No templates found
                                </h3>
                                <p className="text-gray-600">
                                    Try adjusting your filters to see more results.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {templates.data.map((template) => (
                                    <div key={template.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                        <div className="relative">
                                            <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                                <div className="text-6xl">💒</div>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold text-pink-600">
                                                ${template.price}
                                            </div>
                                            {template.order_count > 10 && (
                                                <div className="absolute top-4 left-4 bg-pink-600 text-white rounded-full px-2 py-1 text-xs font-semibold">
                                                    Popular
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-6">
                                            <div className="text-sm text-pink-600 font-medium mb-2">
                                                {template.category.name}
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                {template.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                {template.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xs text-gray-500">
                                                    by {template.owner.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {template.order_count} orders
                                                </div>
                                            </div>
                                            
                                            <Link
                                                href={route('templates.show', template.id)}
                                                className="mt-4 block w-full bg-pink-600 text-white text-center py-2 rounded-lg hover:bg-pink-700 transition-colors font-medium"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {templates.links.length > 3 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex gap-2">
                                    {templates.links.map((link, index) => (
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
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">💕 WeddingInvite</h3>
                                <p className="text-gray-400">
                                    Create beautiful digital wedding invitations that capture the essence of your special day.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Services</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Digital Invitations</li>
                                    <li>Custom Designs</li>
                                    <li>RSVP Management</li>
                                    <li>Print Services</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Support</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Help Center</li>
                                    <li>Contact Us</li>
                                    <li>Design Guide</li>
                                    <li>FAQ</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">Connect</h4>
                                <div className="flex gap-4 text-2xl">
                                    <span>📧</span>
                                    <span>📱</span>
                                    <span>💬</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 WeddingInvite. Made with ❤️ for your special day.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}