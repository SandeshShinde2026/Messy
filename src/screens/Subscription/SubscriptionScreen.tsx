import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { SubscriptionPlan, Mess } from '../../types';
import { COLORS, FONTS, SPACING } from '../../constants';
import { RootStackParamList } from '../../types';

type SubscriptionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Subscription'>;
type SubscriptionScreenRouteProp = RouteProp<RootStackParamList, 'Subscription'>;

interface SubscriptionScreenProps {
  navigation: SubscriptionScreenNavigationProp;
  route: SubscriptionScreenRouteProp;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ navigation, route }) => {
  const { messId, planId } = route.params;
  const [mess, setMess] = useState<Mess | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [availablePlans, setAvailablePlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(planId || '');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In real implementation, fetch mess and subscription plans from API
    const mockMess: Mess = {
      id: messId,
      name: 'Pune Home Kitchen',
      description: 'Authentic Maharashtrian homestyle cooking',
      // ...other mess properties (shortened for brevity)
    } as Mess;

    const mockPlans: SubscriptionPlan[] = [
      {
        id: '1',
        messId: messId,
        name: 'Monthly Plan',
        description: 'Perfect for regular customers - 30 days of fresh, homestyle meals',
        duration: 30,
        price: 3000,
        mealsPerDay: 2,
        includes: ['Lunch', 'Dinner', 'Free delivery', 'Weekend specials', 'Customer support'],
        isActive: true,
      },
      {
        id: '2',
        messId: messId,
        name: 'Weekly Plan',
        description: 'Try our service - 7 days trial plan',
        duration: 7,
        price: 800,
        mealsPerDay: 2,
        includes: ['Lunch', 'Dinner', 'Customer support'],
        isActive: true,
      },
      {
        id: '3',
        messId: messId,
        name: 'Lunch Only - Monthly',
        description: 'For office goers - lunch delivery only',
        duration: 30,
        price: 1800,
        mealsPerDay: 1,
        includes: ['Lunch', 'Free delivery', 'Timely delivery guarantee'],
        isActive: true,
      },
    ];

    setTimeout(() => {
      setMess(mockMess);
      setAvailablePlans(mockPlans);
      
      if (planId) {
        const plan = mockPlans.find(p => p.id === planId);
        if (plan) {
          setSelectedPlan(plan);
          setSelectedPlanId(planId);
        }
      } else {
        // Default to first plan
        setSelectedPlan(mockPlans[0]);
        setSelectedPlanId(mockPlans[0].id);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [messId, planId]);

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setSelectedPlanId(plan.id);
  };

  const handleSubscribe = () => {
    if (!selectedPlan) return;

    Alert.alert(
      'Confirm Subscription',
      `Subscribe to ${selectedPlan.name} for ₹${selectedPlan.price}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: () => {
            // In real implementation, process subscription
            Alert.alert(
              'Success!',
              'Your subscription has been activated. You will receive a confirmation shortly.',
              [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]
            );
          }
        }
      ]
    );
  };

  const calculateDailyRate = (price: number, duration: number) => {
    return Math.round(price / duration);
  };

  const calculateMealRate = (price: number, duration: number, mealsPerDay: number) => {
    return Math.round(price / (duration * mealsPerDay));
  };

  if (isLoading || !mess || !selectedPlan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading subscription details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Subscribe to {mess.name}</Text>
        </View>

        {/* Available Plans */}
        <View style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choose Your Plan</Text>
          {availablePlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlanId === plan.id && styles.selectedPlanCard
              ]}
              onPress={() => handlePlanSelect(plan)}
            >
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planDescription}>{plan.description}</Text>
                </View>
                <View style={styles.planPricing}>
                  <Text style={styles.planPrice}>₹{plan.price}</Text>
                  <Text style={styles.planDuration}>for {plan.duration} days</Text>
                </View>
              </View>

              <View style={styles.planDetails}>
                <Text style={styles.planDetailText}>
                  ₹{calculateDailyRate(plan.price, plan.duration)}/day • 
                  ₹{calculateMealRate(plan.price, plan.duration, plan.mealsPerDay)}/meal
                </Text>
                <Text style={styles.mealsPerDay}>{plan.mealsPerDay} meals per day</Text>
              </View>

              <View style={styles.planIncludes}>
                <Text style={styles.includesTitle}>Includes:</Text>
                {plan.includes.map((item, index) => (
                  <Text key={index} style={styles.includeItem}>• {item}</Text>
                ))}
              </View>

              {selectedPlanId === plan.id && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.selectedText}>✓ Selected</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscription Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Subscription Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Mess:</Text>
              <Text style={styles.summaryValue}>{mess.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Plan:</Text>
              <Text style={styles.summaryValue}>{selectedPlan.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration:</Text>
              <Text style={styles.summaryValue}>{selectedPlan.duration} days</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Meals per day:</Text>
              <Text style={styles.summaryValue}>{selectedPlan.mealsPerDay}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total Amount:</Text>
              <Text style={styles.summaryTotalValue}>₹{selectedPlan.price}</Text>
            </View>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          <Text style={styles.termsText}>
            • Subscription starts from the next day of payment confirmation{'\n'}
            • Meals are prepared fresh daily with quality ingredients{'\n'}
            • Delivery timings: Lunch 12:00-2:00 PM, Dinner 7:00-9:00 PM{'\n'}
            • Cancel anytime with 24-hour notice{'\n'}
            • Refund policy applies for unused days{'\n'}
            • Contact support for meal customizations
          </Text>
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View style={styles.subscribeContainer}>
        <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
          <Text style={styles.subscribeButtonText}>
            Subscribe for ₹{selectedPlan.price}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  backButton: {
    marginBottom: SPACING.md,
  },
  backButtonText: {
    fontSize: FONTS.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: FONTS.xl,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  plansSection: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.lg,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.md,
  },
  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.gray200,
  },
  selectedPlanCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight + '10',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: FONTS.lg,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  planDescription: {
    fontSize: FONTS.sm,
    color: COLORS.gray600,
  },
  planPricing: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: FONTS.xl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  planDuration: {
    fontSize: FONTS.sm,
    color: COLORS.gray500,
  },
  planDetails: {
    marginBottom: SPACING.md,
  },
  planDetailText: {
    fontSize: FONTS.sm,
    color: COLORS.gray700,
    marginBottom: SPACING.xs,
  },
  mealsPerDay: {
    fontSize: FONTS.sm,
    color: COLORS.gray600,
  },
  planIncludes: {
    marginBottom: SPACING.sm,
  },
  includesTitle: {
    fontSize: FONTS.sm,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  includeItem: {
    fontSize: FONTS.sm,
    color: COLORS.gray600,
    marginBottom: 2,
  },
  selectedIndicator: {
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  selectedText: {
    fontSize: FONTS.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  summarySection: {
    padding: SPACING.lg,
  },
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
  },
  summaryValue: {
    fontSize: FONTS.md,
    color: COLORS.gray900,
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: SPACING.sm,
  },
  summaryTotalLabel: {
    fontSize: FONTS.md,
    color: COLORS.gray900,
    fontWeight: 'bold',
  },
  summaryTotalValue: {
    fontSize: FONTS.lg,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  termsSection: {
    padding: SPACING.lg,
  },
  termsTitle: {
    fontSize: FONTS.md,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.sm,
  },
  termsText: {
    fontSize: FONTS.sm,
    color: COLORS.gray600,
    lineHeight: 20,
  },
  subscribeContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  subscribeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: COLORS.white,
    fontSize: FONTS.lg,
    fontWeight: 'bold',
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
});

export default SubscriptionScreen;