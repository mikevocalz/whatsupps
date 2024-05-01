const path = require("path");
const { getDefaultConfig, blacklistRE } = require("expo/metro-config");
//const blacklist = require('expo/metro-config/');

// 1. Enable CSS for Expo.
const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
});

// This is not needed for NativeWind, it is configuration for Metro to understand monorepos
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");
config.watchFolders = [workspaceRoot];
config.resolver.disableHierarchicalLookup = true;
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 2. Enable NativeWind
const { withNativeWind } = require("nativewind/metro");

//4.Configure the react native packager
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts, exclusionList},
  } = await getDefaultConfig(__dirname)
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      blockList: [config.resolver.blockList, /node_modules\/react-responsive-carousel\/.*/],
      assetExts: [
        assetExts.filter((ext) => ext !== 'svg'),
        ...assetExts,
        'obj',
        'mtl',
        'jpg',
        'vrx',
        'hdr',
        'png',
        'jpeg',
        'gltf',
        'glb',
        'bin',
        'arobject',
        'gif',
        'svg',
        'pdf',
        'ttf',
        'webp'
      ],
      sourceExts: [
        ...sourceExts,
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'cjs',
        'svg',
      ],
    
    },
  }
})()

module.exports = withNativeWind(config, {
  // 3. Set `input` to your CSS file with the Tailwind at-rules
  input: "./global.css",
  // This is optional
  projectRoot,
  inlineRem: false,
});