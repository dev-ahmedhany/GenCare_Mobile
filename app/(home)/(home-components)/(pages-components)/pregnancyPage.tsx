import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { bgColors } from "@/constants/Colors";

const PregnancyPage = () => {
  const { news } = useLocalSearchParams();
  const weekData = JSON.parse(news as string);

  return (
    <SafeAreaView style={{ backgroundColor: bgColors.light.background, flex: 1 }}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name='chevron-back' size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Title and Subtitle */}
        <Text style={styles.title}>{weekData.title}</Text>
        <Text style={styles.subtitle}>{weekData.author}</Text>

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={weekData.image}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Highlights Section */}
          <Text style={styles.sectionTitle}>{weekData.body1Title}</Text>

          {/* Body Sections with Icons */}
          <View style={styles.bodySection}>
            <Image source={weekData.image2} style={styles.icon} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body2Title}</Text>
              <Text style={styles.bodyText}>{weekData.body2}</Text>
            </View>
          </View>

          <View style={styles.bodySection}>
            <Image source={weekData.image3} style={styles.icon} resizeMode="contain" />
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body3Title}</Text>
              <Text style={styles.bodyText}>{weekData.body3}</Text>
            </View>
          </View>

          {/* Additional Sections */}
          <View style={styles.bodySection}>
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body4Title1}</Text>
              <Text style={styles.bodyText}>{weekData.body4Body1}</Text>
            </View>
          </View>

          <View style={styles.bodySection}>
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body4Title2}</Text>
              <Text style={styles.bodyText}>{weekData.body4Body2}</Text>
            </View>
          </View>

          <View style={styles.bodySection}>
            <View style={styles.textContainer}>
              <Text style={styles.bodyTitle}>{weekData.body4Title3}</Text>
              <Text style={styles.bodyText}>{weekData.body4Body3}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: bgColors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4B0082',
    marginHorizontal: 16,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    marginHorizontal: 16,
    marginTop: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  mainImage: {
    width: 280,
    height: 280,
    marginVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 20,
    marginTop: 10,
  },
  bodySection: {
    flexDirection: 'row',
    marginBottom: 28,
    alignItems: 'flex-start',
    paddingRight: 8,
  },
  icon: {
    width: 70,
    height: 70,
    marginRight: 16,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
  },
  bodyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B0082',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
});

export default PregnancyPage;
