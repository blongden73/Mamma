import xr from 'xr'
import blocksTemplate from '../templates/blocks.html'
import Mustache from 'mustache'

var el = document.createElement('script');
el.src = '<%= path %>/app.js';
document.body.appendChild(el);


xr.get('https://interactive.guim.co.uk/docsdata-test/1I0NvU4--b8my3hwTbKXHwxQhjSJcKxH69F34zeWljgA.json').then((resp) => {
		var sheets = resp.data.sheets;
		var html = Mustache.render(blocksTemplate, sheets);

		return html;
	});
