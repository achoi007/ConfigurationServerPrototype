/// <reference path="../dtypes/underscore/underscore.d.ts" />

import _ = require("underscore");

export class ConfigRecord
{
	constructor(public component: string, public version: string, public content: string) {
	}
	
	toString(): string {
		return JSON.stringify(this);
	}
};

export interface IConfigReadStore 
{
	getComponents(): string[];
	
	getAllVersions(component: string): string[];
	
	getMatchedVersions(component: string, versionRegex: string): string[];
	
	getExact(component: string, version: string): ConfigRecord;	
};

export interface IConfigWriteStore
{
	addNew(configRec: ConfigRecord);
	
	update(configRec: ConfigRecord);
	
	delete(configRec: ConfigRecord);	
};

export interface IConfigStore extends IConfigReadStore, IConfigWriteStore
{
	
};

export class MemoryConfigStore implements IConfigStore
{
	private configs_: ConfigRecord[];
	
	constructor() {
		this.configs_ = [];
	}
	
	getComponents(): string[] {
		return _.uniq(_.pluck(this.configs_, 'component'));
	}
	
	getAllVersions(component: string): string[] {
		return _.pluck(_.where(this.configs_, { component: component }),
			'version');
	}
	
	getMatchedVersions(component: string, versionRegex: string): string[] {
		var vers = this.getAllVersions(component);
		var regex = new RegExp(versionRegex);
		return _.filter(vers, function(v) { return regex.test(v); });
	}
	
	getExact(component: string, version: string): ConfigRecord {
		return _.where(this.configs_, 
			{ component: component, version: version })[0];
	}

	addNew(configRec: ConfigRecord) {
		if (this.getExactIdx(configRec) != -1) {
			throw "Record already exists: " + configRec.toString();
		}
		this.configs_.push(configRec);
	}
	
	update(configRec: ConfigRecord) {
		var idx = this.getExactIdx(configRec);
		if (idx == -1) {
			throw "Record does not exist: " + configRec.toString();
		}
		this.configs_[idx] = configRec;
	}
	
	delete(configRec: ConfigRecord) {
		var idx = this.getExactIdx(configRec);
		if (idx == -1) {
			throw "Record does not exist: " + configRec.toString();
		}
		this.configs_.splice(idx, 1);		
	}		
	
	private getExactIdx(configRec: ConfigRecord) {
		var recs = this.configs_;
		var len = recs.length;
		for (var i = 0; i < len; ++i) {
			if (recs[i].component === configRec.component &&
				recs[i].version === configRec.version) {
					return i;
				}
		}
		return -1;
	}		
};