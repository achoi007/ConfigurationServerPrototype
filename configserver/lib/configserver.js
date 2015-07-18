/// <reference path="../dtypes/underscore/underscore.d.ts" />
var _ = require("underscore");
var ConfigRecord = (function () {
    function ConfigRecord(component, version, content) {
        this.component = component;
        this.version = version;
        this.content = content;
    }
    ConfigRecord.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return ConfigRecord;
})();
exports.ConfigRecord = ConfigRecord;
;
;
;
;
var MemoryConfigStore = (function () {
    function MemoryConfigStore() {
        this.configs_ = [];
    }
    MemoryConfigStore.prototype.getComponents = function () {
        return _.uniq(_.pluck(this.configs_, 'component'));
    };
    MemoryConfigStore.prototype.getAllVersions = function (component) {
        return _.pluck(_.where(this.configs_, { component: component }), 'version');
    };
    MemoryConfigStore.prototype.getMatchedVersions = function (component, versionRegex) {
        var vers = this.getAllVersions(component);
        var regex = new RegExp(versionRegex);
        return _.filter(vers, function (v) { return regex.test(v); });
    };
    MemoryConfigStore.prototype.getExact = function (component, version) {
        return _.where(this.configs_, { component: component, version: version })[0];
    };
    MemoryConfigStore.prototype.addNew = function (configRec) {
        if (this.getExactIdx(configRec) != -1) {
            throw "Record already exists: " + configRec.toString();
        }
        this.configs_.push(configRec);
    };
    MemoryConfigStore.prototype.update = function (configRec) {
        var idx = this.getExactIdx(configRec);
        if (idx == -1) {
            throw "Record does not exist: " + configRec.toString();
        }
        this.configs_[idx] = configRec;
    };
    MemoryConfigStore.prototype.delete = function (configRec) {
        var idx = this.getExactIdx(configRec);
        if (idx == -1) {
            throw "Record does not exist: " + configRec.toString();
        }
        this.configs_.splice(idx, 1);
    };
    MemoryConfigStore.prototype.getExactIdx = function (configRec) {
        var recs = this.configs_;
        var len = recs.length;
        for (var i = 0; i < len; ++i) {
            if (recs[i].component === configRec.component &&
                recs[i].version === configRec.version) {
                return i;
            }
        }
        return -1;
    };
    return MemoryConfigStore;
})();
exports.MemoryConfigStore = MemoryConfigStore;
;
