import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Star, Navigation, Info, Shield, ShoppingBag, Ticket, Camera, TriangleAlert as AlertTriangle, Droplets, Tent, CloudRain, Binoculars } from 'lucide-react-native';

interface PlaceDetail {
  id: string;
  name: string;
  location: string;
  difficulty: string;
  rating: number;
  reviewCount: number;
  distance: string;
  image: string;
  description: string;
  weatherConditions: string;
  wildlifePresent: boolean;
  wildlifeDetails: string;
  permissionRequired: boolean;
  permissionDetails: string;
  nearbyShops: boolean;
  shopDetails: string;
  ticketRequired: boolean;
  ticketPrice: string;
  dangerousSpots: string;
  waterAvailable: boolean;
  campingAllowed: boolean;
  campingDetails: string;
  distanceFromUser: string;
}

const mockPlaceDetails: { [key: string]: PlaceDetail } = {
  '1': {
    id: '1',
    name: 'Mount Rainier Summit',
    location: 'Washington, USA',
    difficulty: 'Hard',
    rating: 4.8,
    reviewCount: 234,
    distance: '14.4 mi',
    image: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg',
    description: 'A challenging but rewarding climb to the summit of Mount Rainier. The trail offers breathtaking views of the Cascade Range and surrounding wilderness.',
    weatherConditions: 'Best visited June-September. Snow conditions can be severe in winter. Check weather reports before attempting. Temperature can drop significantly at higher elevations.',
    wildlifePresent: true,
    wildlifeDetails: 'Black bears, mountain goats, and marmots are commonly seen. Store food properly and make noise while hiking.',
    permissionRequired: true,
    permissionDetails: 'Climbing permit required from National Park Service. Cost: $52 per person. Reserve in advance at recreation.gov.',
    nearbyShops: false,
    shopDetails: 'No shops at trailhead. Stock up in Enumclaw (45 minutes drive) before heading to the mountain.',
    ticketRequired: true,
    ticketPrice: '$30 park entrance fee + $52 climbing permit',
    dangerousSpots: 'Steep ice fields above 10,000 ft. Crevasse danger on Emmons Glacier. Weather can change rapidly.',
    waterAvailable: false,
    campingAllowed: true,
    campingDetails: 'Camping permitted at designated sites only. Camp Muir (10,080 ft) requires advance reservation.',
    distanceFromUser: '2.3 hours drive',
  },
  '2': {
    id: '2',
    name: 'Angel Falls Trail',
    location: 'Venezuela',
    difficulty: 'Moderate',
    rating: 4.6,
    reviewCount: 156,
    distance: '8.2 mi',
    image: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg',
    description: 'Trek through tropical rainforest to witness the world\'s tallest waterfall. An unforgettable journey through pristine wilderness.',
    weatherConditions: 'Wet season (May-November) best for waterfall flow. Dry season offers easier hiking but less water flow.',
    wildlifePresent: true,
    wildlifeDetails: 'Jaguars, poisonous snakes, and various tropical birds. Local guide highly recommended.',
    permissionRequired: true,
    permissionDetails: 'Must be part of organized tour. Independent hiking not permitted. Contact local tour operators.',
    nearbyShops: true,
    shopDetails: 'Basic supplies available in Canaima village. Limited selection - bring essentials from Caracas.',
    ticketRequired: true,
    ticketPrice: '$200-400 depending on tour package',
    dangerousSpots: 'Slippery rocks near waterfall base. River crossings during wet season can be dangerous.',
    waterAvailable: true,
    campingAllowed: true,
    campingDetails: 'Camping included in tour packages. Hammocks provided by tour operators.',
    distanceFromUser: '14.7 hours flight + boat',
  },
};

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const place = mockPlaceDetails[id as string];
  const [activeTab, setActiveTab] = useState('overview');

  if (!place) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Place not found</Text>
      </View>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#22C55E';
      case 'Moderate': return '#F59E0B';
      case 'Hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleGetDirections = () => {
    Alert.alert(
      'Get Directions',
      'Google Maps integration will open here to provide turn-by-turn directions to the trailhead.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: place.image }} style={styles.headerImage} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <View style={styles.imageOverlay}>
          <Text style={styles.placeName}>{place.name}</Text>
          <View style={styles.placeLocation}>
            <MapPin color="#FFFFFF" size={16} />
            <Text style={styles.placeLocationText}>{place.location}</Text>
          </View>
        </View>
      </View>

      {/* Quick Info */}
      <View style={styles.quickInfo}>
        <View style={styles.quickInfoItem}>
          <Star color="#F59E0B" size={16} fill="#F59E0B" />
          <Text style={styles.quickInfoText}>{place.rating} ({place.reviewCount})</Text>
        </View>
        <View 
          style={[
            styles.difficultyBadge, 
            { backgroundColor: getDifficultyColor(place.difficulty) + '20' }
          ]}
        >
          <Text 
            style={[
              styles.difficultyText, 
              { color: getDifficultyColor(place.difficulty) }
            ]}
          >
            {place.difficulty}
          </Text>
        </View>
        <Text style={styles.quickInfoText}>{place.distance}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleGetDirections}>
          <Navigation color="#FFFFFF" size={20} />
          <Text style={styles.primaryButtonText}>Get Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Camera color="#22C55E" size={20} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'details' && styles.activeTab]}
          onPress={() => setActiveTab('details')}
        >
          <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
            Trail Info
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && (
          <View style={styles.tabContent}>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Description</Text>
              <Text style={styles.cardText}>{place.description}</Text>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <CloudRain color="#3B82F6" size={20} />
                <Text style={styles.cardTitle}>Weather Conditions</Text>
              </View>
              <Text style={styles.cardText}>{place.weatherConditions}</Text>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <Binoculars color="#22C55E" size={20} />
                <Text style={styles.cardTitle}>Wildlife</Text>
              </View>
              <Text style={styles.cardText}>
                {place.wildlifePresent ? place.wildlifeDetails : 'No significant wildlife reported in this area.'}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.cardHeader}>
                <AlertTriangle color="#F59E0B" size={20} />
                <Text style={styles.cardTitle}>Safety Information</Text>
              </View>
              <Text style={styles.cardText}>
                {place.dangerousSpots || 'No specific dangerous areas reported. Always follow standard hiking safety protocols.'}
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'details' && (
          <View style={styles.tabContent}>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Shield color={place.permissionRequired ? '#EF4444' : '#22C55E'} size={24} />
                <Text style={styles.detailLabel}>Permits</Text>
                <Text style={styles.detailValue}>
                  {place.permissionRequired ? 'Required' : 'Not Required'}
                </Text>
                {place.permissionRequired && (
                  <Text style={styles.detailDescription}>{place.permissionDetails}</Text>
                )}
              </View>

              <View style={styles.detailItem}>
                <Ticket color={place.ticketRequired ? '#F59E0B' : '#22C55E'} size={24} />
                <Text style={styles.detailLabel}>Tickets</Text>
                <Text style={styles.detailValue}>
                  {place.ticketRequired ? place.ticketPrice : 'Free'}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <ShoppingBag color={place.nearbyShops ? '#22C55E' : '#6B7280'} size={24} />
                <Text style={styles.detailLabel}>Nearby Shops</Text>
                <Text style={styles.detailValue}>
                  {place.nearbyShops ? 'Available' : 'Not Available'}
                </Text>
                {place.shopDetails && (
                  <Text style={styles.detailDescription}>{place.shopDetails}</Text>
                )}
              </View>

              <View style={styles.detailItem}>
                <Droplets color={place.waterAvailable ? '#3B82F6' : '#6B7280'} size={24} />
                <Text style={styles.detailLabel}>Water</Text>
                <Text style={styles.detailValue}>
                  {place.waterAvailable ? 'Available' : 'Bring Your Own'}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <Tent color={place.campingAllowed ? '#22C55E' : '#6B7280'} size={24} />
                <Text style={styles.detailLabel}>Camping</Text>
                <Text style={styles.detailValue}>
                  {place.campingAllowed ? 'Allowed' : 'Not Permitted'}
                </Text>
                {place.campingDetails && (
                  <Text style={styles.detailDescription}>{place.campingDetails}</Text>
                )}
              </View>

              <View style={styles.detailItem}>
                <Navigation color="#3B82F6" size={24} />
                <Text style={styles.detailLabel}>Distance</Text>
                <Text style={styles.detailValue}>{place.distanceFromUser}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
  },
  placeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  placeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeLocationText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickInfoText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  secondaryButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#22C55E',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
});