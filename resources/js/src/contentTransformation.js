/* globals ClipboardJS, UIkit */
/* eslint-disable max-len */

/* Permalink clipboard handling */
$(window).ready(function () {
	var clipboard = new ClipboardJS('#copy-permalink');

	clipboard.on('success', function () {
		UIkit.tooltip('#copy-permalink', {
			title: 'Copied link to clipboard!'
		}).show();
	});

	clipboard.on('error', function (e) {
		$('#copy-permalink').text(e.text);
	});
});

/* Format TOC */
// TODO: Change font size dynamically to fit smaller viewports
// TODO: Deal with text overflow / truncation of text
$(window).ready(function () {
	if (document.querySelector('#toc')) {
		// Article TOC
		let $toc = $('#toc');
		$toc.appendTo($('#left-col'));
		$toc.addClass('uk-margin-small-left uk-height-1-1 uk-overflow-auto').attr('uk-sticky', '');
		$toc.find('h2').addClass('uk-nav-header uk-margin-remove-bottom uk-inline');
		$toc.find('.toctoggle').attr('hidden', '');
		$toc.find('>ul').addClass('uk-nav uk-nav-default uk-margin-remove-top')
			.attr('uk-scrollspy-nav', 'closest: li; scroll: true;'); // BUG: Scrollspy isn't working (uikit#3100)
		// Useful for tab navigation
		$toc.find('>ul').prepend(`
			<li class="toclevel-0 tocsection-0 uk-parent">
			<a id="skip" href="#content">
				<span class="tocnumber"></span>
				<span class="toctext">Introduction</span>
			</a></li>`);
		$toc.find('.toclevel-1').addClass('uk-parent');
		$toc.find('.toclevel-1>ul').addClass('uk-nav-sub');
	} else if (document.querySelector('#preftoc')) {
		// User preferences TOC
		let $toc = $('#preftoc');
		$toc.appendTo($('#left-col'))
			.prepend('<h2 class="uk-nav-header uk-margin-remove-bottom uk-inline">What would you like to change?</h>') // A change of tone from the otherwise technical MediaWiki
			.addClass('uk-margin-small-left uk-height-1-1 uk-nav uk-nav-default').attr('uk-sticky', '');
	}
});

/* Convert edit links to icons */
$(window).ready(function () {
	if (document.querySelector('.mw-editsection')) {
		let $editMarkers = $('.mw-editsection');
		$editMarkers.addClass('uk-invisible-hover uk-text-middle');
		$editMarkers.parent().addClass('uk-visible-toggle');
		$editMarkers.find('>.mw-editsection-bracket').attr('hidden', '');
		$editMarkers.find('>a').attr('uk-icon', 'icon: pencil').attr('role', 'button').attr('aria-label', $(this).attr('title')).text('');
	}
});

// TODO: Split article to <section> elements
// TODO: Add 'to top' markers to section ends

/* Reformat history pages */
$(window).ready(function () {
	if (document.getElementById('mw-history-compare')) {

		// Create table
		$('#mw-history-compare ul').replaceWith(function () {
			return $('<table id="pagehistory" />').append($(this).contents());
		});

		let $table = $('table'),
			// Select and transform cells
			re = /\(|\)/g,
			s = function (context, query, transform = 0) {
				var res = $(context).find(query);
				// jQuery returns 'undefined' if it can't find an object, eg. '.minoredit' or '.comment'
				if (res[0] !== undefined) {
					if (transform === 1) {
						// Remove parentheses from bytes
						return res[0].outerHTML.replace(re, '');
					} else if (transform === 2) {
						// Reverse date formatting
						let date = res.text().split(', '),
							fixedDate = [date[1], date[0]].join(', ');
						res.text(fixedDate);
						return res[0].outerHTML;
					}
					return res[0].outerHTML;
				}
				// Has to return something to the template literal
				return '';
			};

		$table.children().replaceWith(function () {
			return '<tr>' +
				'<td>' + s(this, '.mw-userlink') + '<div class="uk-padding-small uk-text-center" uk-dropdown>' + s(this, '.mw-usertoollinks') + '</div></td>' +
				'<td>' + s(this, '.mw-changeslist-date', 2) + '</td>' +
				'<td>' + s(this, '.minoredit') + '</td>' +
				'<td>' + s(this, '.mw-plusminus-pos', 1) + s(this, '.mw-plusminus-neg', 1) + '</td>' +
				'<td>' + s(this, '.history-size') + '</td>' +
				'<td>' + s(this, '.comment') + '</td>' +
				'<td>' + s(this, '.mw-history-histlinks') + '</td>' +
				'<td><span>' + $(this).find('input')[0].outerHTML + '</span><span>' + $(this).find('input')[1].outerHTML + '</span></td>' +
				'<td><span uk-icon="icon: cog" role="button" aria-haspopup="menu" title="Revision tools"></span><div class="uk-padding-small uk-text-center" uk-dropdown role="menu">' + s(this, '.mw-history-undo') + '</div></td>' +
				'</tr>';
		});
		$table.children().wrapAll('<tbody />');

		// Add headings
		// WORKAROUND: 'Change size' should span two columns ('.minoredit' and '.mw-plusminus-*'), but Tablesorter doesn't handle 'colspan' well. Instead, an empty header is added just before to accomodate for '.minoredit'.
		$table.prepend(
			'<thead>' +
			'<tr>' +
			'<th>Editor</th>' +
			'<th>Time</th>' +
			'<th class=parser-false sorter-false></th>' +
			'<th>Change</th>' +
			'<th>(Total)</th>' +
			'<th>Comment</th>' +
			'<th colspan=3 class=parser-false sorter-false>Tools</th>' +
			'</tr>' +
			'</thead>'
		);

		// Style
		// FIX: For some reason Tablersorter's css disrupt uk-table-hover
		$table = $('table').addClass('uk-table uk-table-divider uk-table-hover uk-table-justify uk-table-small uk-text-small tablesorter');

		// TODO: Add more tools to the history tools menu (next to the "undo")

		// TODO: Make sure this sorts properly at the beginning of a month
		$table.tablesorter();

	}
});

/* Shift images to the right */
$(window).ready(function () {
	let imgs = $('main .thumb, main .mermaid'),
		prev = $('head');

	imgs.each(function () {
		let $this = $(this),
			vOffest = $this.offset().top,
			cutoff = prev.offset().top + prev.height();
		if (vOffest <= cutoff) {
			let newOffset = cutoff + 20;
			$this.css('top', `${newOffset}px`); // Default UIkit margin
		}
		prev = $this;
	});
});

/* Preview Wikilinks */
$(window).ready(function () {
	let own = top.location.host.toString(),
		mothership = 'en.wikipedia.org',

		$wikilinks = $('#content').find('a[href^="' + own + '"], a[href^="http://' + own + '"],' +
			'a[href^="https://' + own + '"], a[href^="' + mothership + '"], a[href^="http://' + mothership + '"],' +
			'a[href^="https://' + mothership + '"], a[href^="/"], a[href^="./"], a[href^="../"], a[href^="#"]');

	// let $policies = $wikilinks.filter( 'a[title^="WP:"], a[title^="Wikipedia:"], a[title^="wikipedia:"]' );

	$wikilinks.each(function () {
		$(this).after(
			'<div class="uk-padding-small" uk-dropdown role="tooltip">' +
			'<h2 class="uk-h4"></h2>' +
			' <p>Loading summary...</p>' +
			'</div>');
	});

	$wikilinks.mouseenter(function () {
		var caller = $(this).next();

		$.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + $(this)[0].title)
			.done(function (res) {
				caller.find('h2').html(res.title);
				if (res.type !== 'no-extract') {
					caller.find('p').html(res.extract);
				} else {
					caller.find('p').html('No extract available!'); // TODO: Add "warning" icon for policy pages, and "info" icon for guideline pages
				}
			})
			.fail(function (res, status, err) {
				caller.find('p').html('Article not found!<br>Reason: ' + status + ', ' + err);
			});
	});
});