import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin, Bell, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'profile', label: 'Profile', icon: User, path: '/account' },
  { id: 'orders', label: 'Orders', icon: Package, path: '/account/orders' },
  { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/wishlist' },
  { id: 'addresses', label: 'Addresses', icon: MapPin, path: '/account/addresses' },
  { id: 'notifications', label: 'Notifications', icon: Bell, path: '/account/notifications' },
];

const mockOrders = [
  { id: 'LX12345678', date: '2024-01-15', status: 'Delivered', total: 1245, items: 3 },
  { id: 'LX12345677', date: '2024-01-10', status: 'Shipped', total: 895, items: 2 },
  { id: 'LX12345676', date: '2024-01-05', status: 'Processing', total: 645, items: 1 },
];

export default function AccountPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

  const currentPath = location.pathname;

  return (
    <MainLayout>
      <div className="pt-32 pb-16">
        <div className="container-luxe">
          <h1 className="font-display text-3xl md:text-4xl mb-8">My Account</h1>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                      currentPath === item.path
                        ? "bg-foreground text-background"
                        : "hover:bg-muted"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">
              {/* Profile Section */}
              {currentPath === '/account' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="bg-secondary/30 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-xl font-medium">Welcome back</h2>
                          <p className="text-muted-foreground">guest@example.com</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-muted-foreground">Full Name</label>
                        <p className="font-medium">Guest User</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Phone</label>
                        <p className="font-medium">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display text-xl">Recent Orders</h3>
                      <Link
                        to="/account/orders"
                        className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                      >
                        View all <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <div className="space-y-3">
                      {mockOrders.slice(0, 3).map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                        >
                          <div>
                            <p className="font-medium">#{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.date} • {order.items} items
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total}</p>
                            <p className={cn(
                              "text-sm",
                              order.status === 'Delivered' && "text-success",
                              order.status === 'Shipped' && "text-primary",
                              order.status === 'Processing' && "text-muted-foreground"
                            )}>
                              {order.status}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders Section */}
              {currentPath === '/account/orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="font-display text-xl mb-6">Order History</h2>
                  <div className="space-y-3">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-6 bg-secondary/30 rounded-lg"
                      >
                        <div>
                          <p className="font-medium mb-1">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            Placed on {order.date}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.items} items
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium mb-1">${order.total}</p>
                          <span className={cn(
                            "inline-block px-3 py-1 rounded-full text-xs font-medium",
                            order.status === 'Delivered' && "bg-success/10 text-success",
                            order.status === 'Shipped' && "bg-primary/10 text-primary",
                            order.status === 'Processing' && "bg-muted text-muted-foreground"
                          )}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Addresses Section */}
              {currentPath === '/account/addresses' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl">Saved Addresses</h2>
                    <Button variant="outline" size="sm">Add New</Button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-secondary/30 rounded-lg border-2 border-foreground">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-foreground text-background px-2 py-0.5 rounded">
                          Default
                        </span>
                      </div>
                      <p className="font-medium mb-1">Home</p>
                      <p className="text-sm text-muted-foreground">
                        123 Main Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                    </div>
                    <div className="p-6 bg-secondary/30 rounded-lg border-2 border-transparent hover:border-border transition-colors">
                      <p className="font-medium mb-1">Work</p>
                      <p className="text-sm text-muted-foreground">
                        456 Business Ave<br />
                        New York, NY 10002<br />
                        United States
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Section */}
              {currentPath === '/account/notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="font-display text-xl mb-6">Notification Preferences</h2>

                  <div className="space-y-4">
                    {[
                      { id: 'orders', label: 'Order Updates', desc: 'Receive updates about your orders' },
                      { id: 'promo', label: 'Promotions', desc: 'Get notified about sales and offers' },
                      { id: 'new', label: 'New Arrivals', desc: 'Be the first to know about new products' },
                    ].map((pref) => (
                      <label
                        key={pref.id}
                        className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">{pref.label}</p>
                          <p className="text-sm text-muted-foreground">{pref.desc}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
