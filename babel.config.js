module.exports = {
  //   presets: [
  //     [
  //       ["@babel/preset-env", "@babel/preset-react"],
  //       //   {
  //       //     targets: {
  //       //       node: "current",
  //       //     },
  //       //   },
  //     ],
  //   ],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" },
      },
    ],
    "@babel/preset-react",
  ],
};
