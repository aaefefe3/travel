import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { Camera, MapPin, Upload, Check } from 'lucide-react-native';

export default function AddPlaceScreen() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    difficulty: 'Easy',
    distance: '',
    description: '',
    weatherConditions: '',
    wildlifePresent: false,
    permissionRequired: false,
    permissionDetails: '',
    nearbyShops: false,
    shopDetails: '',
    ticketRequired: false,
    ticketPrice: '',
    dangerousSpots: '',
    waterAvailable: false,
    campingAllowed: false,
    campingDetails: '',
  });

  const difficulties = ['Easy', 'Moderate', 'Hard'];

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.location.trim()) {
      Alert.alert('Error', 'Please fill in the trail name and location.');
      return;
    }
    
    Alert.alert(
      'Success!', 
      'Your hiking spot has been added and will be reviewed before publishing.',
      [{ text: 'OK', onPress: () => {
        // Reset form
        setFormData({
          name: '',
          location: '',
          difficulty: 'Easy',
          distance: '',
          description: '',
          weatherConditions: '',
          wildlifePresent: false,
          permissionRequired: false,
          permissionDetails: '',
          nearbyShops: false,
          shopDetails: '',
          ticketRequired: false,
          ticketPrice: '',
          dangerousSpots: '',
          waterAvailable: false,
          campingAllowed: false,
          campingDetails: '',
        });
      }}]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Trail</Text>
        <Text style={styles.subtitle}>Share your hiking discovery</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trail Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              placeholder="Enter trail name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin color="#6B7280" size={20} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.inputWithIconText]}
                value={formData.location}
                onChangeText={(text) => setFormData({...formData, location: text})}
                placeholder="Enter location"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Difficulty Level</Text>
            <View style={styles.difficultyContainer}>
              {difficulties.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.difficultyButton,
                    formData.difficulty === level && styles.difficultyButtonSelected,
                  ]}
                  onPress={() => setFormData({...formData, difficulty: level})}
                >
                  <Text
                    style={[
                      styles.difficultyButtonText,
                      formData.difficulty === level && styles.difficultyButtonTextSelected,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Distance</Text>
            <TextInput
              style={styles.input}
              value={formData.distance}
              onChangeText={(text) => setFormData({...formData, distance: text})}
              placeholder="e.g., 5.2 mi or 8.4 km"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({...formData, description: text})}
              placeholder="Describe the trail, views, and experience..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Conditions & Safety */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conditions & Safety</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weather Conditions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.weatherConditions}
              onChangeText={(text) => setFormData({...formData, weatherConditions: text})}
              placeholder="Describe typical weather, best seasons to visit..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.switchGroup}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Wildlife Present</Text>
              <Text style={styles.switchDescription}>Are there wild animals in the area?</Text>
            </View>
            <Switch
              value={formData.wildlifePresent}
              onValueChange={(value) => setFormData({...formData, wildlifePresent: value})}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dangerous Spots</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.dangerousSpots}
              onChangeText={(text) => setFormData({...formData, dangerousSpots: text})}
              placeholder="Describe any hazardous areas, steep cliffs, loose rocks..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Permits & Tickets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permits & Access</Text>
          
          <View style={styles.switchGroup}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Special Permission Required</Text>
              <Text style={styles.switchDescription}>Is a permit needed to access this trail?</Text>
            </View>
            <Switch
              value={formData.permissionRequired}
              onValueChange={(value) => setFormData({...formData, permissionRequired: value})}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {formData.permissionRequired && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Permission Details</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.permissionDetails}
                onChangeText={(text) => setFormData({...formData, permissionDetails: text})}
                placeholder="Where to get permits, requirements, fees..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>
          )}

          <View style={styles.switchGroup}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Tickets Required</Text>
              <Text style={styles.switchDescription}>Is there an entrance fee?</Text>
            </View>
            <Switch
              value={formData.ticketRequired}
              onValueChange={(value) => setFormData({...formData, ticketRequired: value})}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {formData.ticketRequired && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ticket Price</Text>
              <TextInput
                style={styles.input}
                value={formData.ticketPrice}
                onChangeText={(text) => setFormData({...formData, ticketPrice: text})}
                placeholder="e.g., $15 per person"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}
        </View>

        {/* Amenities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          
          <View style={styles.switchGroup}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Nearby Shops</Text>
              <Text style={styles.switchDescription}>Are there stores for supplies nearby?</Text>
            </View>
            <Switch
              value={formData.nearbyShops}
              onValueChange={(value) => setFormData({...formData, nearbyShops: value})}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {formData.nearbyShops && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Shop Details</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.shopDetails}
                onChangeText={(text) => setFormData({...formData, shopDetails: text})}
                placeholder="What shops are available, distance, what they sell..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>
          )}

          <View style={styles.switchGroup}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Water Available</Text>
              <Text style={styles.switchDescription}>Is drinking water accessible on the trail?</Text>
            </View>
            <Switch
              value={formData.waterAvailable}
              onValueChange={(value) => setFormData({...formData, waterAvailable: value})}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.switchGroup}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Camping Allowed</Text>
              <Text style={styles.switchDescription}>Is overnight camping permitted?</Text>
            </View>
            <Switch
              value={formData.campingAllowed}
              onValueChange={(value) => setFormData({...formData, campingAllowed: value})}
              trackColor={{ false: '#E5E7EB', true: '#22C55E' }}
              thumbColor="#FFFFFF"
            />
          </View>

          {formData.campingAllowed && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Camping Details</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.campingDetails}
                onChangeText={(text) => setFormData({...formData, campingDetails: text})}
                placeholder="Camping rules, designated areas, permits needed..."
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>
          )}
        </View>

        {/* Photos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <TouchableOpacity style={styles.photoUploadButton}>
            <Camera color="#6B7280" size={24} />
            <Text style={styles.photoUploadText}>Add Photos</Text>
            <Text style={styles.photoUploadSubtext}>Share the beauty of this trail</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Check color="#FFFFFF" size={20} style={styles.submitIcon} />
          <Text style={styles.submitButtonText}>Submit Trail</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 8,
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  inputIcon: {
    marginLeft: 12,
  },
  inputWithIconText: {
    flex: 1,
    borderWidth: 0,
    marginLeft: 8,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  difficultyButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  difficultyButtonSelected: {
    borderColor: '#22C55E',
    backgroundColor: '#22C55E20',
  },
  difficultyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  difficultyButtonTextSelected: {
    color: '#22C55E',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchInfo: {
    flex: 1,
    marginRight: 16,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  photoUploadButton: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  photoUploadText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
  },
  photoUploadSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#22C55E',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});