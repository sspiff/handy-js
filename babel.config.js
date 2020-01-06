
// for now, we just need babel to be able to run jest
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {targets: {node: 'current'}},
    ],
  ],
};

