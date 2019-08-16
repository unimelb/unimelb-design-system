module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-functions': {
      functions: {
        pxtorem: function($px) {
          return "calc(" + $px / 16 + "rem)";
        }
      }
    },
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-cssnext': {
      browsers: [
        '> 1% in AU',
        'last 2 versions',
        'Firefox ESR',
        'ie >= 9',
        'iOS >= 8.4',
        'Safari >= 8',
        'Android >= 4.4'
      ]
    }
  }
};
