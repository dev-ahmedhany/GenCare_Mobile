import { 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Image 
} from "react-native";
import React from "react";
import { router } from 'expo-router';
import Spacing from "../../../constants/Spacing";
import { NewsList } from "../../../data/pregnancyweeks";
import FontSize from "../../../constants/FontSize";
import { theme } from "../../../constants/Colors1";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{
          padding: Spacing.padding.base,
        }}
      >
        <Text style={[styles.headerText, { color: theme.colors.secondary}]}>
          Pregnancy Week By Week
        </Text>

        <View style={styles.sliderContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: Spacing.margin.base,
            }}
          >
            {NewsList.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  router.push({
                    pathname: "/(home)/(home-components)/(pages-components)/pregnancyPage",
                    params: { news: JSON.stringify(item) }
                  });
                }}
                style={{
                  width: 150,
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <View style={{
                  width: "100%",
                  height: 250,
                  position: 'relative',
                  backgroundColor: '#efefef',
                  borderRadius: Spacing.borderRadius.lg,
                  padding: Spacing.padding.sm,
                  alignItems: 'center',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 3,
                  overflow: 'hidden',
                }}>
                  {/* Top half circle */}
                  <View style={{
                    position: 'absolute',
                    top: -40,
                    left: -60,
                    width: '90%',
                    height: 60,
                    backgroundColor: '#95cae4',
                    borderBottomLeftRadius: 100,
                    borderBottomRightRadius: 100,
                    transform: [{ scale: 2 }],
                    zIndex: 1,
                  }} />

                  <Text
                    style={{
                      fontSize: FontSize.xl,
                      color: theme.colors.text,
                      marginTop: Spacing.margin.lg,
                      marginBottom: Spacing.margin.sm,
                      zIndex: 2,
                    }}
                  >
                    {item.id}
                  </Text>
                  
                  <Text
                    style={{
                      fontSize: FontSize.sm,
                      color: theme.colors.secondary,
                      textAlign: 'center',
                      marginBottom: Spacing.margin.sm,
                      zIndex: 2,
                    }}
                  >
                    Weeks{'\n'}Pregnant
                  </Text>

                  <Image
                    source={item.image}
                    style={{
                      height: 120,
                      width: "90%",
                      marginTop: 'auto',
                      zIndex: 2,
                    }}
                    resizeMode="contain"
                  />

                  {/* Bottom half circle */}
                  <View style={{
                    position: 'absolute',
                    bottom: -40,
                    right: -60,
                    width: '90%',
                    height: 60,
                    backgroundColor: '#ffb9cc',
                    borderTopLeftRadius: 100,
                    borderTopRightRadius: 100,
                    transform: [{ scale: 2 }],
                    zIndex: 1,
                  }} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: FontSize.xl,
    textAlign: 'center',
  },
  sliderContainer: {
    marginTop: Spacing.margin.lg,
  },
});

export default HomeScreen;
