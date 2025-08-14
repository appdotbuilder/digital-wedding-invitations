<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Template;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isSuperAdmin()) {
            return $this->superAdminDashboard();
        } elseif ($user->isAdminUser()) {
            return $this->adminUserDashboard($user);
        } else {
            return $this->userDashboard($user);
        }
    }

    /**
     * Super Admin Dashboard.
     */
    protected function superAdminDashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_admin_users' => User::adminUser()->count(),
            'total_templates' => Template::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::where('payment_status', 'paid')->sum('total_price'),
            'pending_orders' => Order::where('status', 'pending')->count(),
        ];

        $recentOrders = Order::with(['user', 'template'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $popularTemplates = Template::with(['category'])
            ->orderBy('order_count', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'popularTemplates' => $popularTemplates,
        ]);
    }

    /**
     * Admin User Dashboard.
     */
    protected function adminUserDashboard(User $user)
    {
        $stats = [
            'my_templates' => $user->templates()->count(),
            'active_templates' => $user->templates()->where('status', 'active')->count(),
            'total_orders' => Order::whereHas('template', function ($q) use ($user) {
                $q->where('owner_id', $user->id);
            })->count(),
            'pending_orders' => Order::whereHas('template', function ($q) use ($user) {
                $q->where('owner_id', $user->id);
            })->where('status', 'pending')->count(),
            'total_revenue' => Order::whereHas('template', function ($q) use ($user) {
                $q->where('owner_id', $user->id);
            })->where('payment_status', 'paid')->sum('total_price'),
        ];

        $recentOrders = Order::with(['user', 'template'])
            ->whereHas('template', function ($q) use ($user) {
                $q->where('owner_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $myTopTemplates = $user->templates()
            ->with(['category'])
            ->orderBy('order_count', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'myTopTemplates' => $myTopTemplates,
        ]);
    }

    /**
     * Regular User Dashboard.
     */
    protected function userDashboard(User $user)
    {
        $stats = [
            'total_orders' => $user->orders()->count(),
            'pending_orders' => $user->orders()->where('status', 'pending')->count(),
            'completed_orders' => $user->orders()->where('status', 'completed')->count(),
            'total_spent' => $user->orders()->where('payment_status', 'paid')->sum('total_price'),
        ];

        $recentOrders = $user->orders()
            ->with(['template.category'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
        ]);
    }
}