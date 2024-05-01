/** @type {import('next').NextConfig} */
const { withExpo } = require('@expo/next-adapter')
const { withGluestackUI } = require('@gluestack/ui-next-adapter')

const nextConfig = {
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true

  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  },
  images: {
    disableStaticImages: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'rb.gy',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
      },
            {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'react-native',
    'react-native-web',
    'solito',
    'moti',
    'app',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'expo-router',
    'react-native-svg',
    'nativewind',
    'react-native-css-interop',
    '@expo/html-elements',
    '@expo/vector-icons',
    'react-native-vector-icons',
    'react-native-reanimated-carousel',
    'expo-linear-gradient',
    'expo-image',
    '@react-native/assets-registry',
    'swiper',
    'swiper/react',
    'swiper/modules',
    '@kolking/react-native-rating',
    'lucide-react-native',

  ],


webpack(config, options) {
     config.module.rules.push({
      test: /\.(ttf|webp|png|jpg|jpeg|svg|pdf)$/,
      loader: 'url-loader', // or directly file-loader
    })

    // Mix in aliases
    if (!config.resolve) {
      config.resolve = {}
    }

     config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Alias direct react-native imports to react-native-web
      'react-native$': 'react-native-web',
      'react-carousel':'react-native-reanimated-carousel',
      // Alias internal react-native modules to react-native-web
      'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
      'react-native/Libraries/vendor/emitter/EventEmitter$':
        'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
      'react-native/Libraries/EventEmitter/NativeEventEmitter$':
        'react-native-web/dist/vendor/react-native/NativeEventEmitter',
      '@expo/vector-icons': 'react-native-vector-icons',
      'react-native-webview': 'react-native-web-webview',
    }

    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...(config.resolve?.extensions ?? []),
    ]



    return config
  },
}


module.exports = withExpo(withGluestackUI(nextConfig))
