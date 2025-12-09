import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronRight, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MapPin,
  Calendar,
  RotateCcw,
  Star,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type OrderStatus = 'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: Exclude<OrderStatus, 'all'>;
  items: OrderItem[];
  total: number;
  deliveryDate?: string;
  trackingNumber?: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001234',
    date: '2024-12-05',
    status: 'shipped',
    items: [
      { id: '1', name: 'Premium Wireless Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', quantity: 1, price: 299.99, color: 'Black' },
      { id: '2', name: 'Leather Phone Case', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200', quantity: 2, price: 49.99, color: 'Brown' }
    ],
    total: 399.97,
    deliveryDate: '2024-12-12',
    trackingNumber: 'TRK9876543210',
    shippingAddress: '123 Main Street, New York, NY 10001'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001189',
    date: '2024-12-01',
    status: 'delivered',
    items: [
      { id: '3', name: 'Smart Fitness Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200', quantity: 1, price: 199.99, size: 'M' }
    ],
    total: 199.99,
    deliveryDate: '2024-12-04',
    shippingAddress: '123 Main Street, New York, NY 10001'
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-001156',
    date: '2024-11-28',
    status: 'processing',
    items: [
      { id: '4', name: 'Designer Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200', quantity: 1, price: 159.99 },
      { id: '5', name: 'Canvas Backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200', quantity: 1, price: 89.99, color: 'Navy' }
    ],
    total: 249.98,
    shippingAddress: '456 Oak Avenue, Los Angeles, CA 90001'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-001098',
    date: '2024-11-20',
    status: 'cancelled',
    items: [
      { id: '6', name: 'Bluetooth Speaker', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200', quantity: 1, price: 129.99 }
    ],
    total: 129.99,
    shippingAddress: '123 Main Street, New York, NY 10001'
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-001045',
    date: '2024-11-15',
    status: 'delivered',
    items: [
      { id: '7', name: 'Minimalist Desk Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200', quantity: 1, price: 79.99 },
      { id: '8', name: 'Wireless Charging Pad', image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=200', quantity: 2, price: 39.99 }
    ],
    total: 159.97,
    deliveryDate: '2024-11-19',
    shippingAddress: '123 Main Street, New York, NY 10001'
  }
];

const statusTabs: { key: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All Orders', icon: <Package className="w-4 h-4" /> },
  { key: 'processing', label: 'Processing', icon: <Clock className="w-4 h-4" /> },
  { key: 'shipped', label: 'Shipped', icon: <Truck className="w-4 h-4" /> },
  { key: 'delivered', label: 'Delivered', icon: <CheckCircle2 className="w-4 h-4" /> },
  { key: 'cancelled', label: 'Cancelled', icon: <XCircle className="w-4 h-4" /> }
];

const getStatusConfig = (status: Order['status']) => {
  switch (status) {
    case 'processing':
      return { 
        color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', 
        icon: <Clock className="w-4 h-4" />,
        label: 'Processing'
      };
    case 'shipped':
      return { 
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', 
        icon: <Truck className="w-4 h-4" />,
        label: 'Shipped'
      };
    case 'delivered':
      return { 
        color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', 
        icon: <CheckCircle2 className="w-4 h-4" />,
        label: 'Delivered'
      };
    case 'cancelled':
      return { 
        color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', 
        icon: <XCircle className="w-4 h-4" />,
        label: 'Cancelled'
      };
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  const statusConfig = getStatusConfig(order.status);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Order Header */}
      <div className="p-4 md:p-6 border-b border-border bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Order</span>
              <span className="font-semibold text-foreground">{order.orderNumber}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(order.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
          
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.color}`}>
            {statusConfig.icon}
            {statusConfig.label}
          </div>
        </div>
        
        {order.status === 'shipped' && order.deliveryDate && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Expected delivery by {new Date(order.deliveryDate).toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        )}
      </div>
      
      {/* Order Items */}
      <div className="p-4 md:p-6 space-y-4">
        {order.items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground line-clamp-2">{item.name}</h4>
              <div className="mt-1 flex flex-wrap gap-2 text-sm text-muted-foreground">
                {item.size && <span>Size: {item.size}</span>}
                {item.color && <span>Color: {item.color}</span>}
                <span>Qty: {item.quantity}</span>
              </div>
              <p className="mt-2 font-semibold text-foreground">${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Order Footer */}
      <div className="p-4 md:p-6 border-t border-border bg-muted/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-xl font-bold text-foreground">${order.total.toFixed(2)}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {order.status === 'delivered' && (
              <>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Star className="w-4 h-4" />
                  Rate & Review
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <RotateCcw className="w-4 h-4" />
                  Return
                </Button>
              </>
            )}
            {order.status === 'shipped' && (
              <Button variant="outline" size="sm" className="gap-1.5">
                <MapPin className="w-4 h-4" />
                Track Order
              </Button>
            )}
            {order.status === 'processing' && (
              <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                <XCircle className="w-4 h-4" />
                Cancel Order
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-1.5">
              <MessageSquare className="w-4 h-4" />
              Help
            </Button>
            <Link to={`/orders/${order.id}`}>
              <Button size="sm" className="gap-1.5">
                View Details
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState = ({ status }: { status: OrderStatus }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
  >
    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
      <Package className="w-10 h-10 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-semibold text-foreground mb-2">
      {status === 'all' ? 'No orders yet' : `No ${status} orders`}
    </h3>
    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
      {status === 'all' 
        ? "Looks like you haven't placed any orders yet. Start shopping to see your orders here!"
        : `You don't have any ${status} orders at the moment.`
      }
    </p>
    <Link to="/products">
      <Button className="gap-2">
        Start Shopping
        <ChevronRight className="w-4 h-4" />
      </Button>
    </Link>
  </motion.div>
);

export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = activeTab === 'all' || order.status === activeTab;
    const matchesSearch = searchQuery === '' || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });
  
  const orderCounts = {
    all: mockOrders.length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="bg-card border-b border-border sticky top-16 z-30">
          <div className="container mx-auto px-4">
            <div className="py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Orders</h1>
                  <p className="text-muted-foreground mt-1">Track and manage your orders</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
              </div>
              
              {/* Status Tabs */}
              <div className="mt-6 -mb-px overflow-x-auto scrollbar-hide">
                <div className="flex gap-1 min-w-max">
                  {statusTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 rounded-t-lg ${
                        activeTab === tab.key
                          ? 'text-primary bg-background border border-border border-b-background -mb-px'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                      {orderCounts[tab.key] > 0 && (
                        <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                          activeTab === tab.key
                            ? 'bg-primary/10 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {orderCounts[tab.key]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Orders List */}
        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {filteredOrders.length > 0 ? (
              <motion.div
                key={activeTab + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <OrderCard order={order} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <EmptyState status={activeTab} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  );
}
