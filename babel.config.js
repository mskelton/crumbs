module.exports = {
  ignore: [/node_modules/],
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
    '@babel/preset-react',
  ],
}
