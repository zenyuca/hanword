function Page(pageSize, list) {
	this.currentPage = 1;
	this.pageSize = pageSize;
	this.list = list;
	this.pageSum = Math.ceil(this.list.length / this.pageSize);
	this.pageMin = false;
	this.pageMax = false;
	this.subList = [];
}
Page.prototype.toPage = function(page) {
	if (page < 1 || page > this.pageSum) return;
	this.currentPage = page;
	this.pageMin = this.currentPage === 1;
	this.pageMax = this.currentPage === this.pageSum;
	this.subList = this.list.slice((this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize);
	return this.subList;
}
Page.prototype.prev = function() {
	return this.toPage(--this.currentPage);
}
Page.prototype.next = function() {
	return this.toPage(++this.currentPage);
}
Page.prototype.setIndex = function(i) {
	var page = Math.ceil((i+1) / this.pageSize);
	this.toPage(page);
}
