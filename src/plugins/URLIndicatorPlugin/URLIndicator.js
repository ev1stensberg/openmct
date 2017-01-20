
define(
    [],
    function () {
        function URLIndicator() {}

        URLIndicator.prototype.getCssClass = function () {
            return "icon-check";
        };
        URLIndicator.prototype.getGlyphClass = function () {
            return "ok"
        };
        URLIndicator.prototype.getText = function () {
            return  "Connected"
        };
        URLIndicator.prototype.getDescription = function () {
            return "Connected to the domain object database."
        };
        return URLIndicator
    }
);