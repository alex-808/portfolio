module.exports = function override(config) {
    config.resolve.fallback = {
        fs: false,
        path: require.resolve('path-browserify'),
    };
    return config;
};
