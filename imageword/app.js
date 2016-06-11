(function() {
	var app = angular.module('hanword', []);

	app.controller('HanwordCtrl', function() {
		this.word = {};
		this.wordPage = new Page(20, words);
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
					i = '00000' + (i+1);
					i = i.slice(-5);
					image = `lib/image/${i}.jpg`;
					name = e;
					index = i;
					return;
				}
			});
			if (name) {
				this.word.name = name;
				this.word.image = image;
				this.word.error = '';
				this.wordPage.setIndex(index);
				this.pagerPage.setIndex(Math.ceil(index / this.wordPage.pageSize));
			} else {
				this.word.error = '提示：系統未收錄此字';
			}
		}
		
		this.init = function() {
			this.search('日');
			this.wordPage.toPage(1);
			this.pagerPage.toPage(1);
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