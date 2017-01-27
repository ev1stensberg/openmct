/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2016, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define(
    [],
    function () {

        // Set of connection states; changing among these states will be
        // reflected in the indicator's appearance.
        // CONNECTED: Everything nominal, expect to be able to read/write.
        // DISCONNECTED: HTTP failed; maybe misconfigured, disconnected.
        // PENDING: Still trying to connect, and haven't failed yet.
        // ERROR: Recieved answer but it due internal server error.
        var CONNECTED = {
                text: "Connected",
                glyphClass: "ok",
                description: "Connected to the URL"
            },
            DISCONNECTED = {
                text: "Disconnected",
                glyphClass: undefined,
                description: "URL is offline"
            },
            PENDING = {
                text: "Checking connection...",
                glyphClass: 'caution',
                description: "Unable to connect to the URL"
            },
            ERROR = {
                text: "Error",
                glyphClass: "err",
                description: "Error trying to connect to the URL"
            };
        function URLIndicator($http, $interval) {
            // Track the current connection state
            var self = this;
            
            this.icon = "icon-".concat(this.options.icon) || "icon-database";
            this.URLpath = this.options.url;
            this.interval = this.options.interval;
            this.state = PENDING;

            // Callback if the HTTP request to ElasticSearch fails
            function handleError(e) {
              if(e.status != 404) self.state = ERROR
              else self.state = DISCONNECTED;
            }

            // Callback if the HTTP request succeeds.
            function handleResponse() {
                self.state = CONNECTED;
            }

            // Try to connect to ElasticSearch, and update the indicator.
            function updateIndicator(path) {
                $http.get(path).then(handleResponse, handleError);
            }

            // Update the indicator initially, and start polling.
            updateIndicator(this.URLpath);
            $interval(updateIndicator, this.interval, 0, false);
        }

        URLIndicator.prototype.getCssClass = function () {
            return this.icon;
        };
        URLIndicator.prototype.getGlyphClass = function () {
            return this.state.glyphClass;
        };
        URLIndicator.prototype.getText = function () {
            return this.state.text;
        };
        URLIndicator.prototype.getDescription = function () {
            return this.state.description;
        };
        return URLIndicator;
    }
);