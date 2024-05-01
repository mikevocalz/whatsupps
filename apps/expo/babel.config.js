const path = require('path')
      

module.exports = function (api) {
  api.cache(true);
  const plugins = [
    'react-native-reanimated/plugin',
    // '@babel/plugin-syntax-flow',
    //       "@babel/plugin-transform-react-jsx",
    [
        'module-resolver',
        {
          alias: {
            ['@gluestack/app']: path.join(
              __dirname,
              '../../packages/app/screens'
            ),
          },
        },
      ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
            'solito/image': 'solito/image/expo',
        },
      },
    ],
  ];

  return {
    presets: [ ['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins,
  };
};
