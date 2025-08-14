import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Template {
    id: number;
    title: string;
    description: string;
    price: number;
    category: {
        id: number;
        name: string;
    };
    owner: {
        id: number;
        name: string;
    };
}

interface WeddingDetails {
    bride_name: string;
    groom_name: string;
    wedding_date: string;
    venue: string;
    ceremony_time: string;
    reception_time: string;
    guest_count: string;
    additional_info: string;
}



interface Props {
    template: Template;
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function CreateOrder({ template, errors }: Props) {
    const { data, setData, post, processing } = useForm({
        template_id: template.id,
        wedding_details: {
            bride_name: '',
            groom_name: '',
            wedding_date: '',
            venue: '',
            ceremony_time: '',
            reception_time: '',
            guest_count: '',
            additional_info: '',
        },
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    const updateWeddingDetails = (field: keyof WeddingDetails, value: string) => {
        setData('wedding_details', {
            ...data.wedding_details,
            [field]: value,
        });
    };

    return (
        <>
            <Head title={`Order ${template.title} - Wedding Invitation`} />
            
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
                                    <Link href={route('templates.show', template.id)} className="hover:text-gray-700">{template.title}</Link>
                                    <span className="mx-2">/</span>
                                    <span className="text-pink-600">Place Order</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="py-12">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                🎉 Place Your Order
                            </h1>
                            <p className="text-gray-600">
                                Fill in your wedding details to customize your invitation
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Order Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-xl shadow-lg p-8">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                        Wedding Details
                                    </h2>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Bride's Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.wedding_details.bride_name}
                                                    onChange={(e) => updateWeddingDetails('bride_name', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                    placeholder="Enter bride's name"
                                                />
                                                {errors && errors['wedding_details.bride_name'] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors['wedding_details.bride_name']}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Groom's Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.wedding_details.groom_name}
                                                    onChange={(e) => updateWeddingDetails('groom_name', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                    placeholder="Enter groom's name"
                                                />
                                                {errors && errors['wedding_details.groom_name'] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors['wedding_details.groom_name']}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Wedding Date *
                                                </label>
                                                <input
                                                    type="date"
                                                    value={data.wedding_details.wedding_date}
                                                    onChange={(e) => updateWeddingDetails('wedding_date', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                />
                                                {errors && errors['wedding_details.wedding_date'] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors['wedding_details.wedding_date']}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Number of Guests
                                                </label>
                                                <input
                                                    type="number"
                                                    value={data.wedding_details.guest_count}
                                                    onChange={(e) => updateWeddingDetails('guest_count', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                    placeholder="e.g., 150"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Wedding Venue *
                                            </label>
                                            <textarea
                                                value={data.wedding_details.venue}
                                                onChange={(e) => updateWeddingDetails('venue', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                placeholder="Enter full venue address"
                                            />
                                            {errors && errors['wedding_details.venue'] && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors['wedding_details.venue']}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Ceremony Time *
                                                </label>
                                                <input
                                                    type="time"
                                                    value={data.wedding_details.ceremony_time}
                                                    onChange={(e) => updateWeddingDetails('ceremony_time', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                />
                                                {errors && errors['wedding_details.ceremony_time'] && (
                                                    <p className="mt-1 text-sm text-red-600">
                                                        {errors['wedding_details.ceremony_time']}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Reception Time
                                                </label>
                                                <input
                                                    type="time"
                                                    value={data.wedding_details.reception_time}
                                                    onChange={(e) => updateWeddingDetails('reception_time', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Additional Information
                                            </label>
                                            <textarea
                                                value={data.wedding_details.additional_info}
                                                onChange={(e) => updateWeddingDetails('additional_info', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                placeholder="Any special instructions, dress code, etc."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Order Notes
                                            </label>
                                            <textarea
                                                value={data.notes}
                                                onChange={(e) => setData('notes', e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                                                placeholder="Any special requests for the designer..."
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-pink-600 hover:bg-pink-700 text-lg py-3"
                                        >
                                            {processing ? 'Creating Order...' : '🎉 Create Order'}
                                        </Button>
                                    </form>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Order Summary
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                                                <span className="text-xl">💒</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">
                                                    {template.title}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {template.category.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    by {template.owner.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Template Price:</span>
                                                <span className="font-semibold">${template.price}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-gray-600">Processing Fee:</span>
                                                <span className="font-semibold">$0.00</span>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between items-center text-lg font-bold">
                                                <span>Total:</span>
                                                <span className="text-pink-600">${template.price}</span>
                                            </div>
                                        </div>

                                        <div className="bg-pink-50 p-4 rounded-lg">
                                            <h5 className="font-medium text-pink-900 mb-2">
                                                What happens next?
                                            </h5>
                                            <ul className="space-y-1 text-sm text-pink-800">
                                                <li>✓ Order confirmation</li>
                                                <li>✓ Payment processing</li>
                                                <li>✓ Template customization</li>
                                                <li>✓ Final delivery</li>
                                            </ul>
                                        </div>

                                        <div className="text-xs text-gray-500 space-y-1">
                                            <p>✓ 30-day money-back guarantee</p>
                                            <p>✓ Unlimited revisions included</p>
                                            <p>✓ Instant download after payment</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}