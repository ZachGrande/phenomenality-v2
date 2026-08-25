/**
 * Bootstrap's `@charset` gets inlined into the `bootstrap` cascade layer when
 * Tailwind bundles the `@import`, where it is invalid. Strip it; the bundle is
 * served as UTF-8 anyway.
 */
const discardCharset = {
  postcssPlugin: 'discard-charset',
  AtRule: {
    charset: (rule) => rule.remove(),
  },
};

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: ['@tailwindcss/postcss', discardCharset],
};

export default config;
