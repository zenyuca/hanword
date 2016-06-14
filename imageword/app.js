(function() {
	var app = angular.module('hanword', []);

	app.controller('HanwordCtrl', function() {
		var store = new Store();
		var key = 'word';

		this.word = {};
		this.wordPage = new Page(30, words);
		var pages = [];
		for (var i = 0; i < this.wordPage.pageSum; i++) {
			pages.push(i+1);
		}
		this.pagerPage = new Page(6, pages);

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
				store.put(key, name);
			} else {
				this.word.name = store.get(key);
				this.word.error = `提示：系統未收錄【${searchWord}】字`;
			}
		}
		
		this.init = function() {
			var name = store.get(key);
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
})();