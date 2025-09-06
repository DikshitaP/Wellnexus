module.exports = {
  plugins: [
    require('@tailwindcss/postcss7-compat'),  // Use this plugin instead of just tailwindcss
    require('autoprefixer'),
  ],
};
