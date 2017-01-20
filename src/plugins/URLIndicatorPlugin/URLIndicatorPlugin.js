define(
  [
    './URLIndicator'
  ],
  function URLIndicatorPlugin(URLIndicator) {
        return function install(openmct) {
            openmct.legacyExtension('indicator', {
                  "implementation": URLIndicator
              });
            }
});