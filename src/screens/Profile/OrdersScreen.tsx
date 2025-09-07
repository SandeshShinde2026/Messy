import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Order, OrderStatus } from '../../types';
import { COLORS, FONTS, SPACING } from '../../constants';

const OrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In real implementation, fetch user's orders from API
    const mockOrders: Order[] = [
      {
        id: '1',
        userId: '1',
        messId: '1',
        items: [
          {
            menuItemId: '1',
            quantity: 1,
            price: 120,
            specialInstructions: 'Less spicy',
          },
        ],
        totalAmount: 120,
        orderType: 'delivery' as any,
        status: OrderStatus.PREPARING,
        deliveryAddress: {
          latitude: 18.5204,
          longitude: 73.8567,
          address: 'FC Road, Pune',
          city: 'Pune',
          area: 'FC Road',
          pincode: '411004',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        userId: '1',
        messId: '2',
        items: [
          {
            menuItemId: '2',
            quantity: 2,
            price: 80,
          },
        ],
        totalAmount: 160,
        orderType: 'pickup' as any,
        status: OrderStatus.DELIVERED,
        createdAt: new Date(Date.now() - 86400000), // Yesterday
        updatedAt: new Date(Date.now() - 86400000),
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PLACED:
        return COLORS.warning;
      case OrderStatus.CONFIRMED:
      case OrderStatus.PREPARING:
        return COLORS.info;
      case OrderStatus.READY:
      case OrderStatus.OUT_FOR_DELIVERY:
        return COLORS.primary;
      case OrderStatus.DELIVERED:
        return COLORS.success;
      case OrderStatus.CANCELLED:
        return COLORS.error;
      default:
        return COLORS.gray500;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    return status.replace('_', ' ').toUpperCase();
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') {
      return ![OrderStatus.DELIVERED, OrderStatus.CANCELLED].includes(order.status);
    }
    return [OrderStatus.DELIVERED, OrderStatus.CANCELLED].includes(order.status);
  });

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.orderAmount}>₹{item.totalAmount}</Text>
        <Text style={styles.orderType}>{item.orderType.replace('_', ' ')}</Text>
      </View>

      <View style={styles.orderItems}>
        <Text style={styles.itemsLabel}>Items:</Text>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.itemText}>
            • {orderItem.quantity}x Item (₹{orderItem.price})
          </Text>
        ))}
      </View>

      <Text style={styles.orderDate}>
        {item.createdAt.toLocaleDateString()} at {item.createdAt.toLocaleTimeString()}
      </Text>

      {activeTab === 'active' && (
        <View style={styles.orderActions}>
          <TouchableOpacity style={styles.trackButton}>
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>
          {item.status === OrderStatus.PLACED && (
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
          >
            <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {filteredOrders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyTitle}>No orders found</Text>
          <Text style={styles.emptyText}>
            {activeTab === 'active'
              ? 'You have no active orders at the moment'
              : 'You have no completed orders yet'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  title: {
    fontSize: FONTS.xxl,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.md,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.gray900,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONTS.xl,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22,
  },
  listContainer: {
    padding: SPACING.md,
  },
  orderCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  orderId: {
    fontSize: FONTS.lg,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  statusText: {
    fontSize: FONTS.xs,
    color: COLORS.white,
    fontWeight: '600',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  orderAmount: {
    fontSize: FONTS.lg,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderType: {
    fontSize: FONTS.sm,
    color: COLORS.gray600,
    textTransform: 'capitalize',
  },
  orderItems: {
    marginBottom: SPACING.sm,
  },
  itemsLabel: {
    fontSize: FONTS.sm,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  itemText: {
    fontSize: FONTS.sm,
    color: COLORS.gray600,
    marginBottom: 2,
  },
  orderDate: {
    fontSize: FONTS.sm,
    color: COLORS.gray500,
    marginBottom: SPACING.md,
  },
  orderActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  trackButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  trackButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sm,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.error,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.white,
    fontSize: FONTS.sm,
    fontWeight: '600',
  },
});

export default OrdersScreen;