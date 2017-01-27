define(
  [
    './URLIndicator'
  ],
  function URLIndicatorPlugin(URLIndicator) {
    return function(opts) { 
      
      function URLIndicatorWrapper() {
           this.options = opts;
           URLIndicator.apply(this, arguments);
       }
       
       URLIndicatorWrapper.prototype = Object.create(URLIndicator.prototype);
       
        return function install(openmct) {
            openmct.legacyExtension('indicators', {
                  "implementation": URLIndicatorWrapper,
                  "depends": ["$http", "$interval"]
              });
            }
          }
    return URLIndicatorPlugin
});