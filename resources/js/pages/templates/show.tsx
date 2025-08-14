import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
// import { Button } from '@/components/ui/button';

interface Template {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    preview_images_array: string[];
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

interface Props {
    template: Template;
    relatedTemplates: Template[];
    [key: string]: unknown;
}

export default function TemplateShow({ template, relatedTemplates }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title={`${template.title} - Wedding Invitation Template`} />
            
            <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-4">
                                <Link href={route('home')} className="text-2xl font-bold text-gray-900">
                                    💕 WeddingInvite
                                </Link>
                                <nav className="text-sm text-gray-500">
                                    <Link href={route('home')} className="hover:text-gray-700">Home</Link>
                                    <span className="mx-2">/</span>
                                    <span className="text-pink-600">{template.title}</span>
                                </nav>
                            </div>
                            <nav className="flex items-center gap-4">
                                {auth.user ? (
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={route('dashboard')}
                                            className="text-pink-600 hover:text-pink-700 font-medium"
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

                {/* Template Details */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Preview Images */}
                            <div>
                                <div className="sticky top-8">
                                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                        <div className="w-full h-96 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-8xl mb-4">💒</div>
                                                <p className="text-gray-600">Template Preview</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Additional preview images */}
                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                        {[1, 2, 3].map((index) => (
                                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                                <div className="w-full h-24 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
                                                    <div className="text-2xl">💝</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Template Info */}
                            <div>
                                <div className="mb-6">
                                    <div className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                        {template.category.name}
                                    </div>
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                        {template.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                                        <span>by {template.owner.name}</span>
                                        <span>•</span>
                                        <span>{template.order_count} orders</span>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <span>⭐</span>
                                            <span>4.8 (124 reviews)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <div className="text-3xl font-bold text-gray-900">
                                                ${template.price}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                One-time purchase
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-600 font-semibold">✓ Instant Download</div>
                                            <div className="text-gray-600 text-sm">✓ Lifetime Updates</div>
                                        </div>
                                    </div>

                                    {auth.user ? (
                                        <Link
                                            href={route('orders.create', { template: template.id })}
                                            className="block w-full bg-pink-600 text-white text-center py-4 rounded-xl hover:bg-pink-700 transition-colors font-semibold text-lg"
                                        >
                                            🛒 Order This Template
                                        </Link>
                                    ) : (
                                        <div className="space-y-3">
                                            <Link
                                                href={route('login')}
                                                className="block w-full bg-pink-600 text-white text-center py-4 rounded-xl hover:bg-pink-700 transition-colors font-semibold text-lg"
                                            >
                                                Sign In to Order
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="block w-full border-2 border-pink-600 text-pink-600 text-center py-3 rounded-xl hover:bg-pink-50 transition-colors font-semibold"
                                            >
                                                Create Account
                                            </Link>
                                        </div>
                                    )}

                                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <span>🎨</span>
                                            <span>Fully customizable design</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>📱</span>
                                            <span>Mobile-responsive layout</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>✉️</span>
                                            <span>Digital & print-ready formats</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>🎉</span>
                                            <span>RSVP management included</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-white rounded-xl shadow-lg p-8">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        About This Template
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {template.description}
                                    </p>
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Main invitation design</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>RSVP card template</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Details card (venue, schedule)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Thank you card design</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <span className="text-green-600">✓</span>
                                                <span>Digital sharing formats</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Templates */}
                {relatedTemplates.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                More Templates in {template.category.name}
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedTemplates.map((relatedTemplate) => (
                                    <Link
                                        key={relatedTemplate.id}
                                        href={route('templates.show', relatedTemplate.id)}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 block"
                                    >
                                        <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                                            <div className="text-4xl">💒</div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <div className="text-sm text-pink-600 font-medium mb-2">
                                                {relatedTemplate.category.name}
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                {relatedTemplate.title}
                                            </h4>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xl font-bold text-pink-600">
                                                    ${relatedTemplate.price}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {relatedTemplate.order_count} orders
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}