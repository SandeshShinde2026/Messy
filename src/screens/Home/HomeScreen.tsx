import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../contexts/AuthContext';
import { MainTabParamList, RootStackParamList } from '../../types';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');

// Enhanced mock data for messes with details
const messesData = [
  {
    id: '1',
    name: 'Shree Mess',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop',
    rating: 4.5,
    price: '₹150/day',
    distance: '0.5 km',
    type: 'Veg',
    meals: 'Lunch & Dinner',
    speciality: 'Gujarati Thali',
  },
  {
    id: '2',
    name: 'Annapurna Mess',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=300&fit=crop',
    rating: 4.2,
    price: '₹180/day',
    distance: '1.2 km',
    type: 'Non-Veg',
    meals: 'All Meals',
    speciality: 'North Indian',
  },
  {
    id: '3',
    name: 'Sai Mess',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop',
    rating: 4.0,
    price: '₹120/day',
    distance: '0.8 km',
    type: 'Veg',
    meals: 'Lunch & Dinner',
    speciality: 'Maharashtrian',
  },
  {
    id: '4',
    name: 'Ganesh Mess',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop',
    rating: 4.3,
    price: '₹160/day',
    distance: '1.5 km',
    type: 'Non-Veg',
    meals: 'Lunch & Dinner',
    speciality: 'South Indian',
  },
  {
    id: '5',
    name: 'Omkar Mess',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=300&fit=crop',
    rating: 4.1,
    price: '₹140/day',
    distance: '0.9 km',
    type: 'Veg',
    meals: 'All Meals',
    speciality: 'Punjabi',
  },
  {
    id: '6',
    name: 'Shankar Mess',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop',
    rating: 4.4,
    price: '₹170/day',
    distance: '1.8 km',
    type: 'Non-Veg',
    meals: 'Lunch & Dinner',
    speciality: 'Bengali',
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const MessCard = ({ mess }: { mess: typeof messesData[0] }) => (
    <TouchableOpacity 
      style={styles.messCard}
      onPress={() => navigation.navigate('MessDetails', { messId: mess.id })}
    >
      <Image source={{ uri: mess.image }} style={styles.messImage} />
      
      {/* Veg/Non-Veg Badge */}
      <View style={[styles.typeBadge, mess.type === 'Veg' ? styles.vegBadge : styles.nonVegBadge]}>
        <View style={[styles.typeIndicator, mess.type === 'Veg' ? styles.vegIndicator : styles.nonVegIndicator]} />
        <Text style={[styles.typeText, mess.type === 'Veg' ? styles.vegText : styles.nonVegText]}>
          {mess.type}
        </Text>
      </View>

      <View style={styles.messInfo}>
        <Text style={styles.messName}>{mess.name}</Text>
        
        {/* Rating and Distance */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>{mess.rating}</Text>
          </View>
          <Text style={styles.distanceText}>{mess.distance}</Text>
        </View>

        {/* Price and Meals */}
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>{mess.price}</Text>
          <Text style={styles.mealsText}>{mess.meals}</Text>
        </View>

        {/* Speciality */}
        <Text style={styles.specialityText}>{mess.speciality}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header with Location and Profile */}
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>Pune</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop'
            }}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Best Deals in Town</Text>
            <Text style={styles.bannerSubtitle}>Get up to 50% off</Text>
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Messes in Pune</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Within 2km</Text>
              <Text style={styles.filterArrow}>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Veg/Non-Veg</Text>
              <Text style={styles.filterArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messes Grid */}
        <View style={styles.messesGrid}>
          {messesData.map((mess, index) => (
            <MessCard key={mess.id} mess={mess} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  bannerContainer: {
    margin: 16,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    color: '#374151',
    marginRight: 4,
  },
  filterArrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  messesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  messCard: {
    width: (width - 48) / 2,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  messImage: {
    width: '100%',
    height: 120,
  },
  typeBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  vegBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.9)',
  },
  nonVegBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
  },
  typeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  vegIndicator: {
    backgroundColor: '#fff',
  },
  nonVegIndicator: {
    backgroundColor: '#fff',
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  vegText: {
    color: '#fff',
  },
  nonVegText: {
    color: '#fff',
  },
  messInfo: {
    padding: 12,
  },
  messName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  distanceText: {
    fontSize: 12,
    color: '#6b7280',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#137fec',
  },
  mealsText: {
    fontSize: 11,
    color: '#6b7280',
  },
  specialityText: {
    fontSize: 12,
    color: '#374151',
    fontStyle: 'italic',
  },
});

export default HomeScreen;