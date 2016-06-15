(function() {
	var app = angular.module('hanword', []);
	
	var wordStore = new StoreBinder('word');
	var wordQuantityStore = new StoreBinder('wordQuantity');
	var pageQuantityStore = new StoreBinder('pageQuantity');


	app.controller('HanwordCtrl', function() {
		var wordQuantity = wordQuantityStore.get();
		var pageQuantity = pageQuantityStore.get();
		if (wordQuantity === null) {
			wordQuantity = 30;
		}
		if (pageQuantity === null) {
			pageQuantity = 6;
		}

		this.word = {};
		this.wordPage = new Page(wordQuantity, words);
		var pages = [];
		for (var i = 0; i < this.wordPage.pageSum; i++) {
			pages.push(i+1);
		}
		this.pagerPage = new Page(pageQuantity, pages);

		this.isSelectedPage = function(selectedPage) {
			return this.wordPage.currentPage === selectedPage;
		}
		this.isSelectedWord = function(selectedWord) {
			return this.word.name === selectedWord;
		}

		this.search = function(searchWord) {
			var name;
			var image;
			var index;
			words.forEach(function(e, i) {
				if (searchWord === e) {
					index = i;
					name = e;

					i = '00000' + (i+1);
					i = i.slice(-5);
					image = `lib/image/${i}.jpg`;
					return;
				}
			});
			if (name) {
				this.word.name = name;
				this.word.image = image;
				this.word.error = '';
				this.wordPage.setIndex(index);
				this.pagerPage.setIndex(Math.ceil((index+1) / this.wordPage.pageSize)-1);
				wordStore.put(name);
			} else {
				this.word.name = store.get(key);
				this.word.error = `提示：系統未收錄【${searchWord}】字`;
			}
		}
		
		this.init = function() {
			var name = wordStore.get();
			if (!name) {
				name = '日';
			}
			this.search(name);
		}
		this.init();
	});

	app.controller('PanelCtrl', function() {
		this.tab = 1;
		this.selectPanel = function(setTab) {
			this.tab = setTab;
		}
		this.isSelected = function(setTab) {
			return this.tab === setTab;
		}
	});

	app.controller('SetCtrl', function() {
		this.setter = {};
		try {
			this.setter.wordQuantity = wordQuantityStore.get();
			this.setter.pageQuantity = pageQuantityStore.get();
		} catch (err) {}

		this.submitSet = function() {
			wordQuantityStore.put(this.setter.wordQuantity);
			pageQuantityStore.put(this.setter.pageQuantity);
			this.setter.tip = '提示：設置成功';
		}

		this.changeValue = function() {
			this.setter.tip = '';
		}
	});
})();