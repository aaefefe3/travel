import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Settings, MapPin, Star, Camera, LogOut, CreditCard as Edit, Trophy, Users } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings color="#6B7280" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Camera color="#FFFFFF" size={16} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Sarah Johnson</Text>
            <Text style={styles.userEmail}>sarah.johnson@email.com</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Edit color="#22C55E" size={16} />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MapPin color="#22C55E" size={24} />
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Trails Visited</Text>
          </View>
          <View style={styles.statCard}>
            <Star color="#F59E0B" size={24} />
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.statCard}>
            <Trophy color="#EF4444" size={24} />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <MapPin color="#22C55E" size={20} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Visited Mount Rainier Summit</Text>
              <Text style={styles.activityDate}>2 days ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Star color="#F59E0B" size={20} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Reviewed Angel Falls Trail</Text>
              <Text style={styles.activityDate}>1 week ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Users color="#3B82F6" size={20} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Joined Mountain Explorers group</Text>
              <Text style={styles.activityDate}>2 weeks ago</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          
          <View style={styles.achievementGrid}>
            <View style={styles.achievementBadge}>
              <Trophy color="#F59E0B" size={32} />
              <Text style={styles.achievementName}>Trail Blazer</Text>
              <Text style={styles.achievementDesc}>Visited 20+ trails</Text>
            </View>
            
            <View style={styles.achievementBadge}>
              <Star color="#EF4444" size={32} />
              <Text style={styles.achievementName}>Top Reviewer</Text>
              <Text style={styles.achievementDesc}>40+ helpful reviews</Text>
            </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem}>
            <MapPin color="#6B7280" size={20} />
            <Text style={styles.menuItemText}>My Trails</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Star color="#6B7280" size={20} />
            <Text style={styles.menuItemText}>My Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Users color="#6B7280" size={20} />
            <Text style={styles.menuItemText}>Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Settings color="#6B7280" size={20} />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <LogOut color="#EF4444" size={20} />
            <Text style={[styles.menuItemText, styles.logoutText]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  userSection: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#22C55E',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#22C55E',
    marginLeft: 6,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  achievementGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementBadge: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemText: {
    fontSize: 16,
    color: '#111827',
    marginLeft: 12,
    flex: 1,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#EF4444',
  },
});