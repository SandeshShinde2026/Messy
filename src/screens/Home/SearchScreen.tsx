import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Mess, CuisineType, ServiceType, PriceRange } from '../../types';
import { COLORS, FONTS, SPACING, PUNE_AREAS } from '../../constants';

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    cuisine: [] as CuisineType[],
    priceRange: [] as PriceRange[],
    serviceType: [] as ServiceType[],
    isVegOnly: false,
    area: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<Mess[]>([]);

  const cuisineTypes = Object.values(CuisineType);
  const priceRanges = Object.values(PriceRange);
  const serviceTypes = Object.values(ServiceType);

  const toggleFilter = (filterType: string, value: any) => {
    setSelectedFilters(prev => {
      if (filterType === 'cuisine') {
        const newCuisine = prev.cuisine.includes(value)
          ? prev.cuisine.filter(c => c !== value)
          : [...prev.cuisine, value];
        return { ...prev, cuisine: newCuisine };
      }
      if (filterType === 'priceRange') {
        const newPriceRange = prev.priceRange.includes(value)
          ? prev.priceRange.filter(p => p !== value)
          : [...prev.priceRange, value];
        return { ...prev, priceRange: newPriceRange };
      }
      if (filterType === 'serviceType') {
        const newServiceType = prev.serviceType.includes(value)
          ? prev.serviceType.filter(s => s !== value)
          : [...prev.serviceType, value];
        return { ...prev, serviceType: newServiceType };
      }
      if (filterType === 'isVegOnly') {
        return { ...prev, isVegOnly: !prev.isVegOnly };
      }
      if (filterType === 'area') {
        return { ...prev, area: value };
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      cuisine: [],
      priceRange: [],
      serviceType: [],
      isVegOnly: false,
      area: '',
    });
  };

  const handleSearch = () => {
    // In real implementation, make API call with filters
    console.log('Searching with:', { searchQuery, selectedFilters });
    setShowFilters(false);
  };

  const FilterButton = ({ title, isSelected, onPress }: any) => (
    <TouchableOpacity
      style={[styles.filterButton, isSelected && styles.filterButtonSelected]}
      onPress={onPress}
    >
      <Text style={[styles.filterButtonText, isSelected && styles.filterButtonTextSelected]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search messes, cuisine, area..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.filtersToggle}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Text style={styles.filtersToggleText}>
            {showFilters ? 'Hide Filters' : 'Filters'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <ScrollView style={styles.filtersPanel}>
          {/* Cuisine Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Cuisine Type</Text>
            <View style={styles.filterButtonsContainer}>
              {cuisineTypes.map((cuisine) => (
                <FilterButton
                  key={cuisine}
                  title={cuisine.replace('_', ' ')}
                  isSelected={selectedFilters.cuisine.includes(cuisine)}
                  onPress={() => toggleFilter('cuisine', cuisine)}
                />
              ))}
            </View>
          </View>

          {/* Price Range Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Price Range</Text>
            <View style={styles.filterButtonsContainer}>
              {priceRanges.map((price) => (
                <FilterButton
                  key={price}
                  title={price.charAt(0).toUpperCase() + price.slice(1)}
                  isSelected={selectedFilters.priceRange.includes(price)}
                  onPress={() => toggleFilter('priceRange', price)}
                />
              ))}
            </View>
          </View>

          {/* Service Type Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Service Type</Text>
            <View style={styles.filterButtonsContainer}>
              {serviceTypes.map((service) => (
                <FilterButton
                  key={service}
                  title={service.replace('_', ' ')}
                  isSelected={selectedFilters.serviceType.includes(service)}
                  onPress={() => toggleFilter('serviceType', service)}
                />
              ))}
            </View>
          </View>

          {/* Area Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Area</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterButtonsContainer}>
                {PUNE_AREAS.map((area) => (
                  <FilterButton
                    key={area}
                    title={area}
                    isSelected={selectedFilters.area === area}
                    onPress={() => toggleFilter('area', area)}
                  />
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Veg Only Filter */}
          <View style={styles.filterSection}>
            <TouchableOpacity
              style={styles.vegOnlyFilter}
              onPress={() => toggleFilter('isVegOnly', null)}
            >
              <View style={[styles.checkbox, selectedFilters.isVegOnly && styles.checkboxSelected]}>
                {selectedFilters.isVegOnly && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.vegOnlyText}>Vegetarian Only</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Actions */}
          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyFiltersButton} onPress={handleSearch}>
              <Text style={styles.applyFiltersText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Search Results */}
      <View style={styles.resultsContainer}>
        {searchResults.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔍</Text>
            <Text style={styles.emptyStateTitle}>Start your search</Text>
            <Text style={styles.emptyStateText}>
              Search for messes by name, cuisine type, or area to find your perfect meal
            </Text>
          </View>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultCard}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultDescription}>{item.description}</Text>
                <Text style={styles.resultLocation}>{item.location.area}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchHeader: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  searchInputContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.gray100,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONTS.md,
    marginRight: SPACING.sm,
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: FONTS.lg,
  },
  filtersToggle: {
    alignSelf: 'flex-start',
  },
  filtersToggleText: {
    color: COLORS.primary,
    fontSize: FONTS.md,
    fontWeight: '600',
  },
  filtersPanel: {
    backgroundColor: COLORS.white,
    maxHeight: 400,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  filterSection: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  filterSectionTitle: {
    fontSize: FONTS.md,
    fontWeight: '600',
    color: COLORS.gray900,
    marginBottom: SPACING.sm,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  filterButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
  },
  filterButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: FONTS.sm,
    color: COLORS.gray700,
  },
  filterButtonTextSelected: {
    color: COLORS.white,
  },
  vegOnlyFilter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 4,
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: FONTS.xs,
    fontWeight: 'bold',
  },
  vegOnlyText: {
    fontSize: FONTS.md,
    color: COLORS.gray700,
  },
  filterActions: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  clearFiltersButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    alignItems: 'center',
  },
  clearFiltersText: {
    color: COLORS.gray700,
    fontSize: FONTS.md,
    fontWeight: '600',
  },
  applyFiltersButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  applyFiltersText: {
    color: COLORS.white,
    fontSize: FONTS.md,
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
  },
  emptyStateTitle: {
    fontSize: FONTS.xl,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
    textAlign: 'center',
    lineHeight: 22,
  },
  resultCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultName: {
    fontSize: FONTS.lg,
    fontWeight: 'bold',
    color: COLORS.gray900,
    marginBottom: SPACING.xs,
  },
  resultDescription: {
    fontSize: FONTS.md,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  resultLocation: {
    fontSize: FONTS.sm,
    color: COLORS.gray500,
  },
});

export default SearchScreen;