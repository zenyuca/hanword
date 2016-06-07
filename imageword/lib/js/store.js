function Store() {

}
Store.prototype.check = function() {
	if (!localStorage) throw '你使用的瀏覧器不支持本地存儲！';
}
Store.prototype.put = function(key, value) {
	this.check();
	value = value || '';
	value = JSON.stringify(value);
	localStorage[key] = value;
}

Store.prototype.get = function(key) {
	this.check();
	var value = localStorage[key];
	value = value || '';
	value = JSON.parse(value);
	return value;
}