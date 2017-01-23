define(
  [
    './URLIndicator'
  ],
  function URLIndicatorPlugin(URLIndicator) {
    return function(opts) {
        return function install(openmct) {
            openmct.legacyExtension('indicators', {
                  "implementation": URLIndicator,
                  "depends": ["$http", "$interval"]
              });
            }
    }
    return URLIndicatorPlugin
});