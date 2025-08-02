import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { Search, MapPin, Star, Users, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

interface HikingSpot {
  id: string;
  name: string;
  location: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  rating: number;
  reviewCount: number;
  distance: string;
  image: string;
  featured: boolean;
}

const mockHikingSpots: HikingSpot[] = [
  {
    id: '1',
    name: 'Mount Rainier Summit',
    location: 'Washington, USA',
    difficulty: 'Hard',
    rating: 4.8,
    reviewCount: 234,
    distance: '14.4 mi',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg',
    featured: true,
  },
  {
    id: '2',
    name: 'Angel Falls Trail',
    location: 'Venezuela',
    difficulty: 'Moderate',
    rating: 4.6,
    reviewCount: 156,
    distance: '8.2 mi',
    image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
    featured: true,
  },
  {
    id: '3',
    name: 'Torres del Paine',
    location: 'Chile',
    difficulty: 'Hard',
    rating: 4.9,
    reviewCount: 89,
    distance: '52 mi',
    image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
    featured: false,
  },
  {
    id: '4',
    name: 'Antelope Canyon',
    location: 'Arizona, USA',
    difficulty: 'Easy',
    rating: 4.5,
    reviewCount: 412,
    distance: '1.5 mi',
    image: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg',
    featured: false,
  },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSpots, setFilteredSpots] = useState(mockHikingSpots);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredSpots(mockHikingSpots);
    } else {
      const filtered = mockHikingSpots.filter(
        spot =>
          spot.name.toLowerCase().includes(query.toLowerCase()) ||
          spot.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSpots(filtered);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#22C55E';
      case 'Moderate':
        return '#F59E0B';
      case 'Hard':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const featuredSpots = filteredSpots.filter(spot => spot.featured);
  const allSpots = filteredSpots;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover Trails</Text>
        <Text style={styles.subtitle}>Find your next adventure</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search color="#6B7280" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search hiking spots..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        {featuredSpots.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Trails</Text>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredContainer}
            >
              {featuredSpots.map((spot) => (
                <TouchableOpacity
                  key={spot.id}
                  style={styles.featuredCard}
                  onPress={() => router.push(`/place/${spot.id}`)}
                >
                  <Image source={{ uri: spot.image }} style={styles.featuredImage} />
                  <View style={styles.featuredOverlay}>
                    <Text style={styles.featuredName}>{spot.name}</Text>
                    <View style={styles.featuredLocation}>
                      <MapPin color="#FFFFFF" size={14} />
                      <Text style={styles.featuredLocationText}>{spot.location}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        {/* All Trails Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Trails</Text>
        </View>

        {allSpots.map((spot) => (
          <TouchableOpacity
            key={spot.id}
            style={styles.trailCard}
            onPress={() => router.push(`/place/${spot.id}`)}
          >
            <Image source={{ uri: spot.image }} style={styles.trailImage} />
            <View style={styles.trailInfo}>
              <View style={styles.trailHeader}>
                <Text style={styles.trailName}>{spot.name}</Text>
                <ArrowRight color="#6B7280" size={20} />
              </View>
              
              <View style={styles.trailLocation}>
                <MapPin color="#6B7280" size={16} />
                <Text style={styles.trailLocationText}>{spot.location}</Text>
              </View>

              <View style={styles.trailMeta}>
                <View style={styles.trailRating}>
                  <Star color="#F59E0B" size={16} fill="#F59E0B" />
                  <Text style={styles.ratingText}>{spot.rating}</Text>
                  <Text style={styles.reviewText}>({spot.reviewCount})</Text>
                </View>
                
                <View 
                  style={[
                    styles.difficultyBadge, 
                    { backgroundColor: getDifficultyColor(spot.difficulty) + '20' }
                  ]}
                >
                  <Text 
                    style={[
                      styles.difficultyText, 
                      { color: getDifficultyColor(spot.difficulty) }
                    ]}
                  >
                    {spot.difficulty}
                  </Text>
                </View>
                
                <Text style={styles.distanceText}>{spot.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  featuredContainer: {
    paddingLeft: 20,
    paddingRight: 8,
  },
  featuredCard: {
    width: 280,
    height: 200,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    padding: 16,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredLocationText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  trailCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  trailImage: {
    width: 100,
    height: 100,
  },
  trailInfo: {
    flex: 1,
    padding: 12,
  },
  trailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  trailName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  trailLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  trailLocationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  trailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trailRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  distanceText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});