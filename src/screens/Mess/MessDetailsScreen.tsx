import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

type MessDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MessDetails'>;
type MessDetailsScreenRouteProp = RouteProp<RootStackParamList, 'MessDetails'>;

interface MessDetailsScreenProps {
  navigation: MessDetailsScreenNavigationProp;
  route: MessDetailsScreenRouteProp;
}

const { width } = Dimensions.get('window');

const getMessDetails = (messId: string) => {
  const messData = {
    '1': {
      id: '1',
      name: 'Shree Mess',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=250&fit=crop',
      rating: 4.5,
      totalReviews: 128,
      cuisine: 'Gujarati',
      isVeg: true,
      phone: '+91 9876543210',
      address: 'Shop No. 15, FC Road, Near Deccan Gymkhana, Pune - 411004',
      coordinates: { latitude: 18.5204, longitude: 73.8567 },
      ownerName: 'Sunita Joshi',
      description: 'Authentic Gujarati homestyle cooking with fresh ingredients and traditional recipes passed down through generations.',
      weeklyTimings: [
        { day: 'Monday', openTime: '8:00 AM', closeTime: '9:00 PM', isOpen: true },
        { day: 'Tuesday', openTime: '8:00 AM', closeTime: '9:00 PM', isOpen: true },
        { day: 'Wednesday', openTime: '8:00 AM', closeTime: '9:00 PM', isOpen: true },
        { day: 'Thursday', openTime: '8:00 AM', closeTime: '9:00 PM', isOpen: true },
        { day: 'Friday', openTime: '8:00 AM', closeTime: '9:00 PM', isOpen: true },
        { day: 'Saturday', openTime: '8:00 AM', closeTime: '9:00 PM', isOpen: true },
        { day: 'Sunday', openTime: 'Closed', closeTime: 'Closed', isOpen: false },
      ],
      todaysMenu: {
        lunch: [
          'Gujarati Dal', 'Bhindi Sabzi', 'Rotli', 'Rice', 'Pickle', 'Buttermilk', 'Sweet (Kheer)'
        ],
        dinner: [
          'Mixed Dal', 'Aloo Gobi', 'Chapati', 'Rice', 'Raita', 'Papad', 'Dessert'
        ]
      },
      subscriptionPlans: [
        {
          id: 'plan1',
          name: 'Premium Gujarati Thali',
          description: 'Complete traditional Gujarati meals with variety',
          monthlyPrice: 4500,
          dailyPrice: 150,
          includes: [
            '2 Fresh Rotlis/Chapatis',
            'Dal (Different variety daily)',
            '2 Seasonal Vegetables',
            'Rice with Ghee',
            'Pickle & Papad',
            'Buttermilk/Raita',
            'Sweet/Dessert',
            'Free Home Delivery'
          ],
          meals: 'Lunch & Dinner',
          popular: true
        },
        {
          id: 'plan2',
          name: 'Basic Thali',
          description: 'Essential home-cooked meals',
          monthlyPrice: 3000,
          dailyPrice: 100,
          includes: [
            '2 Rotlis/Chapatis',
            'Dal',
            '1 Vegetable',
            'Rice',
            'Pickle',
            'Buttermilk'
          ],
          meals: 'Lunch & Dinner',
          popular: false
        },
        {
          id: 'plan3',
          name: 'Lunch Only Plan',
          description: 'Perfect for office goers',
          monthlyPrice: 2250,
          dailyPrice: 75,
          includes: [
            '2 Fresh Rotlis',
            'Dal',
            '1 Vegetable',
            'Rice',
            'Pickle',
            'Buttermilk'
          ],
          meals: 'Lunch Only',
          popular: false
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Annapurna Mess',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop',
      rating: 4.2,
      totalReviews: 95,
      cuisine: 'North Indian',
      isVeg: false,
      phone: '+91 9876543211',
      address: 'Plot No. 8, Koregaon Park, Near Osho Ashram, Pune - 411001',
      coordinates: { latitude: 18.5362, longitude: 73.8847 },
      ownerName: 'Rajesh Kumar',
      description: 'Delicious North Indian cuisine with both vegetarian and non-vegetarian options.',
      weeklyTimings: [
        { day: 'Monday', openTime: '7:30 AM', closeTime: '10:00 PM', isOpen: true },
        { day: 'Tuesday', openTime: '7:30 AM', closeTime: '10:00 PM', isOpen: true },
        { day: 'Wednesday', openTime: '7:30 AM', closeTime: '10:00 PM', isOpen: true },
        { day: 'Thursday', openTime: '7:30 AM', closeTime: '10:00 PM', isOpen: true },
        { day: 'Friday', openTime: '7:30 AM', closeTime: '10:00 PM', isOpen: true },
        { day: 'Saturday', openTime: '7:30 AM', closeTime: '10:00 PM', isOpen: true },
        { day: 'Sunday', openTime: '8:00 AM', closeTime: '9:00 PM', isOpen: true },
      ],
      todaysMenu: {
        lunch: [
          'Rajma', 'Aloo Jeera', 'Roti', 'Rice', 'Salad', 'Lassi', 'Gulab Jamun'
        ],
        dinner: [
          'Butter Chicken', 'Dal Makhani', 'Naan/Roti', 'Jeera Rice', 'Raita', 'Pickle'
        ]
      },
      subscriptionPlans: [
        {
          id: 'plan1',
          name: 'Royal North Indian Thali',
          description: 'Premium North Indian meals with non-veg options',
          monthlyPrice: 5400,
          dailyPrice: 180,
          includes: [
            '3 Fresh Rotis/Naan',
            'Dal (Premium varieties)',
            '2 Vegetables (1 Non-veg option)',
            'Basmati Rice',
            'Raita & Pickle',
            'Lassi/Buttermilk',
            'Sweet/Dessert',
            'Free Delivery'
          ],
          meals: 'Lunch & Dinner',
          popular: true
        }
      ]
    }
  };
  
  return messData[messId as keyof typeof messData] || messData['1'];
};

const MessDetailsScreen: React.FC<MessDetailsScreenProps> = ({ navigation, route }) => {
  const { messId } = route.params;
  const [activeTab, setActiveTab] = useState<'location' | 'timings' | 'menu' | 'plans'>('location');
  const [messDetails, setMessDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const details = getMessDetails(messId);
      setMessDetails(details);
      setIsLoading(false);
    }, 800);
  }, [messId]);

  const openMaps = () => {
    if (messDetails?.coordinates) {
      const url = `https://maps.google.com/?q=${messDetails.coordinates.latitude},${messDetails.coordinates.longitude}`;
      Linking.openURL(url);
    }
  };

  const callMess = () => {
    if (messDetails?.phone) {
      Linking.openURL(`tel:${messDetails.phone}`);
    }
  };

  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  const renderTabContent = () => {
    if (!messDetails) return null;

    switch (activeTab) {
      case 'location':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>📍 Location Details</Text>
            <View style={styles.locationCard}>
              <Text style={styles.addressText}>{messDetails.address}</Text>
              <View style={styles.locationActions}>
                <TouchableOpacity style={styles.actionButton} onPress={openMaps}>
                  <Text style={styles.actionIcon}>🗺️</Text>
                  <Text style={styles.actionText}>Open in Maps</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={callMess}>
                  <Text style={styles.actionIcon}>📞</Text>
                  <Text style={styles.actionText}>Call Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>👨‍🍳 Owner Information</Text>
            <View style={styles.ownerCard}>
              <Text style={styles.ownerName}>{messDetails.ownerName}</Text>
              <Text style={styles.ownerPhone}>{messDetails.phone}</Text>
            </View>
          </View>
        );
      
      case 'timings':
        const currentDay = getCurrentDay();
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>🕐 Weekly Timings</Text>
            {messDetails.weeklyTimings.map((timing: any, index: number) => (
              <View 
                key={index} 
                style={[
                  styles.timingRow,
                  timing.day === currentDay && styles.currentDayRow
                ]}
              >
                <View style={styles.timingDay}>
                  <Text style={[
                    styles.dayText,
                    timing.day === currentDay && styles.currentDayText
                  ]}>
                    {timing.day}
                    {timing.day === currentDay && ' (Today)'}
                  </Text>
                </View>
                <View style={styles.timingHours}>
                  <Text style={[
                    styles.hoursText,
                    !timing.isOpen && styles.closedText,
                    timing.day === currentDay && styles.currentDayText
                  ]}>
                    {timing.isOpen ? `${timing.openTime} - ${timing.closeTime}` : 'Closed'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );
      
      case 'menu':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>🍽️ Today's Menu</Text>
            
            <View style={styles.menuSection}>
              <Text style={styles.mealTitle}>🌅 Lunch</Text>
              <View style={styles.menuItems}>
                {messDetails.todaysMenu.lunch.map((item: string, index: number) => (
                  <View key={index} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>• {item}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.menuSection}>
              <Text style={styles.mealTitle}>🌙 Dinner</Text>
              <View style={styles.menuItems}>
                {messDetails.todaysMenu.dinner.map((item: string, index: number) => (
                  <View key={index} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>• {item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        );
      
      case 'plans':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>💰 Monthly Subscription Plans</Text>
            {messDetails.subscriptionPlans.map((plan: any) => (
              <View key={plan.id} style={[styles.planCard, plan.popular && styles.popularPlan]}>
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>⭐ POPULAR</Text>
                  </View>
                )}
                
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
                
                <View style={styles.priceContainer}>
                  <Text style={styles.monthlyPrice}>₹{plan.monthlyPrice}/month</Text>
                  <Text style={styles.dailyPrice}>₹{plan.dailyPrice}/day</Text>
                </View>
                
                <Text style={styles.mealsInfo}>📅 {plan.meals}</Text>
                
                <Text style={styles.includesTitle}>What's Included:</Text>
                <View style={styles.includesList}>
                  {plan.includes.map((item: string, index: number) => (
                    <Text key={index} style={styles.includeItem}>✓ {item}</Text>
                  ))}
                </View>
                
                <TouchableOpacity style={styles.subscribeButton}>
                  <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      
      default:
        return null;
    }
  };

  if (isLoading || !messDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading mess details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: messDetails.image }} style={styles.mainImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton}>
              <Text style={styles.favoriteButtonText}>🤍</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.messInfo}>
          <Text style={styles.messName}>{messDetails.name}</Text>
          <View style={styles.messDetails}>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {messDetails.rating}</Text>
              <Text style={styles.reviewCount}>({messDetails.totalReviews} reviews)</Text>
            </View>
            <View style={styles.typeContainer}>
              <Text style={[styles.typeText, messDetails.isVeg ? styles.vegText : styles.nonVegText]}>
                {messDetails.isVeg ? '🟢 Pure Veg' : '🔴 Veg & Non-Veg'}
              </Text>
            </View>
          </View>
          <Text style={styles.cuisine}>🍛 {messDetails.cuisine} Cuisine</Text>
          <Text style={styles.description}>{messDetails.description}</Text>
        </View>

        <View style={styles.tabsContainer}>
          {['location', 'timings', 'menu', 'plans'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 250,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 32,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    color: '#333',
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonText: {
    fontSize: 18,
  },
  messInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  messName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  messDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  vegText: {
    color: '#4CAF50',
  },
  nonVegText: {
    color: '#F44336',
  },
  cuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  tabContent: {
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  locationCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  locationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
  },
  ownerCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ownerPhone: {
    fontSize: 14,
    color: '#666',
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  currentDayRow: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 8,
  },
  timingDay: {
    flex: 1,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
  },
  currentDayText: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  timingHours: {
    flex: 1,
    alignItems: 'flex-end',
  },
  hoursText: {
    fontSize: 14,
    color: '#666',
  },
  closedText: {
    color: '#F44336',
  },
  menuSection: {
    marginBottom: 16,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  menuItems: {
    paddingLeft: 16,
  },
  menuItem: {
    marginBottom: 4,
  },
  menuItemText: {
    fontSize: 14,
    color: '#666',
  },
  planCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  popularPlan: {
    borderColor: '#4CAF50',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  monthlyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  dailyPrice: {
    fontSize: 14,
    color: '#666',
  },
  mealsInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  includesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  includesList: {
    paddingLeft: 16,
  },
  includeItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  subscribeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default MessDetailsScreen;