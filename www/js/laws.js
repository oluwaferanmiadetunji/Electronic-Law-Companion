/** @format */

const base_url = 'https://justiceadejumo.com/lc2/public/api';

new Vue({
	el: '#laws',
	data() {
		return {
			laws: [],
			loading: true,
		};
	},
	methods: {
		getLaws() {
			axios
				.get(`${base_url}/laws`)
				.then((res) => {
					this.laws = res.data;
					this.loading = false;
				})
				.catch(() => this.getLaws());
		},
	},
	mounted() {
		this.getLaws();
	},
});

$(document).ready(function () {
	let markedContent = [];
	const element = document
		.getElementById('lawsContent')
		.getElementsByTagName('mark');
	let index = 0;

	var mark = function () {
		var keyword = document.getElementById('search-text-input').value;
		$('#lawsContent').unmark({
			done: function () {
				$('#lawsContent').mark(keyword, {
					separateWordSearch: true,
					diacritics: true,
				});
			},
		});
	};

	$('#search-text-form').on('submit', function (event) {
		event.preventDefault();
		mark();
		var content = document.getElementById('lawsContent');
		var marked = content.getElementsByTagName('mark');
		for (i = 0; i < marked.length; i++) {
			markedContent.push(marked[i]);
		}
		document.getElementById('navigation').style.display = 'block';
		document.getElementById('count').innerHTML =
			markedContent.length > 0
				? `${markedContent.length} matches found`
				: '0 match found';
		const elmnt = element[index];
		elmnt.scrollIntoView();
	});
	$('#forward').on('click', function (event) {
		event.preventDefault();
		if (index !== element.length - 1) {
			index++;
			const elmnt = element[index];
			elmnt.scrollIntoView();
		}
	});
	$('#backward').on('click', function (event) {
		event.preventDefault();
		if (index !== 0) {
			index--;
			const elmnt = element[index];
			elmnt.scrollIntoView();
		}
	});
});
