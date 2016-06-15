function Store() {
	if (!localStorage) throw '你使用的瀏覧器不支持本地存儲！';
}

Store.prototype.checkNull = function(value) {
	if (value === null || value === undefined) {
		throw '不允許使用 null 或 undefined 值。';
	}
}

Store.prototype.put = function(key, value) {
	this.checkNull(value);
	value = JSON.stringify(value);
	localStorage.setItem(key,value);
}

Store.prototype.get = function(key) {
	var value = localStorage.getItem(key);
	return JSON.parse(value);
}

Store.prototype.hasKey = function(key) {
	for (var i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i) === key) {
			return true;
		}
	}
	return false;
}

Store.prototype.keys = function() {
	var array = [];
	for (var i = 0; i < localStorage.length; i++) {
		array.push(localStorage.key(i));
	}
	return array;
}

Store.prototype.remove = function(key) {
	localStorage.removeItem(key);
}

function StoreBinder(key) {
	this.store = new Store();
	this.key = key;
}

StoreBinder.prototype.get = function() {
	return this.store.get(this.key);
}

StoreBinder.prototype.put = function(value) {
	this.store.put(this.key, value);
}