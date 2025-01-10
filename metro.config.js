const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// تكوين معالجة الأصول
config.resolver = {
  ...config.resolver,
  assetExts: [...config.resolver.assetExts],
  sourceExts: [...config.resolver.sourceExts],
  // إضافة معالجة خاصة للأصول المفقودة
  extraNodeModules: {
    'missing-asset-registry-path': __dirname + '/assets'
  }
};

module.exports = config; 