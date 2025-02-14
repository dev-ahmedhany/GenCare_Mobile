export default {
  expo: {
    name: 'GenCare',
    slug: 'gencare',
    version: '1.0.0',
    scheme: 'gencare',
    icon: "./assets/Logo/Mob-Logo-removebg-preview.png",
    extra: {
      apiUrl: 'http://192.168.122.1:5000',
      eas: {
        projectId: "492afcaf-713b-4b0c-b955-f70442f2acdb"
      }
    },
    newArchEnabled: true,
    android: {
      package: "com.ahmed_shams2.gencare",
      compileSdk: 34,
      targetSdk: 34,
      buildToolsVersion: "34.0.0",
      adaptiveIcon: {
        foregroundImage: "./assets/Logo/Mob-Logo-removebg-preview.png",
        backgroundColor: "#ffffff"
      },
      ndkVersion: "25.1.8937393",
      minSdkVersion: 21,
      buildConfigExtra: {
        repositories: [
          "maven { url 'https://www.jitpack.io' }"
        ]
      }
    },
    ios: {
      bundleIdentifier: "com.ahmed-shams2.gencare",
      supportsTablet: true
    },
    plugins: [
      [
        'expo-blur',
        {
          enabled: false
        }
      ]
    ]
  },
}; 