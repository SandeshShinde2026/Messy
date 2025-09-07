import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>🍽️</Text>
        <Text style={styles.appName}>MessApp</Text>
        <ActivityIndicator 
          size="large" 
          color={COLORS.primary} 
          style={styles.loader}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: SPACING.sm,
  },
  appName: {
    fontSize: FONTS.xxxl,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  loader: {
    marginBottom: SPACING.lg,
  },
  loadingText: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
  },
});

export default LoadingScreen;