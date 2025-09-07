import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, FONTS, SPACING } from '../../constants';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: logout
        },
      ]
    );
  };

  const ProfileOption = ({ icon, title, subtitle, onPress, showArrow = true }: any) => (
    <TouchableOpacity style={styles.optionItem} onPress={onPress}>
      <View style={styles.optionLeft}>
        <Text style={styles.optionIcon}>{icon}</Text>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{title}</Text>
          {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && <Text style={styles.optionArrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'guest@example.com'}</Text>
          <Text style={styles.userPhone}>{user?.phone || '+91 XXXXXXXXXX'}</Text>
        </View>

        {/* Profile Options */}
        <View style={styles.optionsContainer}>
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <ProfileOption
              icon="👤"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() => console.log('Edit Profile')}
            />
            <ProfileOption
              icon="📍"
              title="Manage Addresses"
              subtitle="Add or edit delivery addresses"
              onPress={() => console.log('Manage Addresses')}
            />
            <ProfileOption
              icon="💳"
              title="Payment Methods"
              subtitle="Manage your payment options"
              onPress={() => console.log('Payment Methods')}
            />
          </View>

          {/* Subscriptions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Subscriptions</Text>
            <ProfileOption
              icon="📋"
              title="My Subscriptions"
              subtitle="View and manage your mess subscriptions"
              onPress={() => console.log('My Subscriptions')}
            />
            <ProfileOption
              icon="📅"
              title="Meal Plans"
              subtitle="Customize your meal preferences"
              onPress={() => console.log('Meal Plans')}
            />
          </View>

          {/* App Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            <ProfileOption
              icon="🔔"
              title="Notifications"
              subtitle="Manage notification preferences"
              onPress={() => console.log('Notifications')}
            />
            <ProfileOption
              icon="🌙"
              title="Dark Mode"
              subtitle="Switch to dark theme"
              onPress={() => console.log('Dark Mode')}
            />
            <ProfileOption
              icon="🌍"
              title="Language"
              subtitle="Change app language"
              onPress={() => console.log('Language')}
            />
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <ProfileOption
              icon="❓"
              title="Help & FAQ"
              subtitle="Get help and find answers"
              onPress={() => console.log('Help & FAQ')}
            />
            <ProfileOption
              icon="📞"
              title="Contact Support"
              subtitle="Get in touch with our team"
              onPress={() => console.log('Contact Support')}
            />
            <ProfileOption
              icon="⭐"
              title="Rate App"
              subtitle="Rate us on the app store"
              onPress={() => console.log('Rate App')}
            />
            <ProfileOption
              icon="📄"
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              onPress={() => console.log('Privacy Policy')}
            />
          </View>

          {/* Logout */}
          <View style={styles.section}>
            <ProfileOption
              icon="🚪"
              title="Logout"
              subtitle="Sign out of your account"
              onPress={handleLogout}
              showArrow={false}
            />
          </View>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>MessApp v1.0.0</Text>
        </View>
      </ScrollView>
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
  profileHeader: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: FONTS.xxxl,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  userName: {
    fontSize: FONTS.xl,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  userPhone: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
  },
  optionsContainer: {
    paddingTop: SPACING.lg,
  },
  section: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.md,
    fontWeight: 'bold',
    color: COLORS.gray900,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    marginBottom: SPACING.sm,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    fontSize: FONTS.xl,
    marginRight: SPACING.md,
    width: 24,
    textAlign: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: FONTS.md,
    fontWeight: '500',
    color: COLORS.gray900,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: FONTS.sm,
    color: COLORS.gray600,
  },
  optionArrow: {
    fontSize: FONTS.xl,
    color: COLORS.gray400,
    fontWeight: 'bold',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  versionText: {
    fontSize: FONTS.sm,
    color: COLORS.gray500,
  },
});

export default ProfileScreen;