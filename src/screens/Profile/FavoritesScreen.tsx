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
import { Mess } from '../../types';
import { COLORS, FONTS, SPACING } from '../../constants';

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<Mess[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In real implementation, fetch user's favorites from API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const removeFavorite = (messId: string) => {
    setFavorites(prev => prev.filter(mess => mess.id !== messId));
  };

  const renderFavoriteItem = ({ item }: { item: Mess }) => (
    <TouchableOpacity style={styles.favoriteCard}>
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoriteDescription}>{item.description}</Text>
        <View style={styles.favoriteDetails}>
          <Text style={styles.favoriteRating}>⭐ {item.rating}</Text>
          <Text style={styles.favoriteCuisine}>{item.cuisine[0]}</Text>
        </View>
        <Text style={styles.favoriteLocation}>{item.location.area}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFavorite(item.id)}
      >
        <Text style={styles.removeButtonText}>❤️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>Your saved messes</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💔</Text>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>
            Start exploring and add messes to your favorites by tapping the heart icon
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
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
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
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
  favoriteCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    fontSize: FONTS.lg,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  favoriteDescription: {
    fontSize: FONTS.sm,
    color: COLORS.gray600,
    marginBottom: SPACING.sm,
  },
  favoriteDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  favoriteRating: {
    fontSize: FONTS.sm,
    fontWeight: '600',
    color: COLORS.gray900,
  },
  favoriteCuisine: {
    fontSize: FONTS.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  favoriteLocation: {
    fontSize: FONTS.sm,
    color: COLORS.gray500,
  },
  removeButton: {
    padding: SPACING.sm,
  },
  removeButtonText: {
    fontSize: FONTS.xl,
  },
});

export default FavoritesScreen;