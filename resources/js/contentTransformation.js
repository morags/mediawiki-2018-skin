/* Permalink clipboard handling */
window.addEventListener('load', function () {
    var clipboard = new ClipboardJS('#copy-permalink');

    clipboard.on('success', function (e) {
        UIkit.tooltip('#copy-permalink', {
            'title': 'Copied link to clipboard!'
        }).show();
    });

    clipboard.on('error', function (e) {
        $('#copy-permalink').text(e.text);
    });
});

/* Format TOC */
// TODO: Change font size dynamically to fit smaller viewports
// TODO: Deal with text overflow / truncation of text
window.addEventListener('load', function () {
    // Article TOC
    if ($bodytext[0].querySelector('#toc')) {
        var $toc = $bodytext.find('#toc');
        $toc.appendTo($('#left-col'));
        $toc.addClass('uk-margin-small-left uk-height-1-1 uk-overflow-auto').attr('uk-sticky', '');
        $toc.find('h2').addClass('uk-nav-header uk-margin-remove-bottom uk-inline');
        $toc.find('.toctoggle').attr('hidden', '');
        $toc.find('>ul').addClass('uk-nav uk-nav-default uk-margin-remove-top')
            .attr('uk-scrollspy-nav', 'closest: li; scroll: true;'); // BUG: Scrollspy isn't working (uikit#3100)
        $toc.find('.toclevel-1').addClass('uk-parent');
        $toc.find('.toclevel-1>ul').addClass('uk-nav-sub');
    }
    // User preferences TOC
    else if ($bodytext[0].querySelector('#preftoc')) {
        var $toc = $bodytext.find('#preftoc');
        $toc.appendTo($('#left-col'))
            .prepend('<h2 class="uk-nav-header uk-margin-remove-bottom uk-inline">What would you like to change?</h>') // A change of tone from the otherwise technical MediaWiki
            .addClass('uk-margin-small-left uk-height-1-1 uk-nav uk-nav-default').attr('uk-sticky', '');
    }
});

/* Convert edit links to icons */
window.addEventListener('load', function () {
    if ($bodytext[0].querySelector('.mw-editsection')) {
        var $edit_markers = $bodytext.find('.mw-editsection');
        $edit_markers.addClass('uk-invisible-hover uk-text-middle');
        $edit_markers.parent().addClass('uk-visible-toggle');
        $edit_markers.find('>.mw-editsection-bracket').attr('hidden', '');
        $edit_markers.find('>a').attr('uk-icon', 'icon: pencil').text('');
    }
});

/* Reformat history pages */
// TODO: Finish this
// window.addEventListener('load', function () {
//     $('ul').replaceWith(function () {
//         return $("<table />").append($(this).contents());
//     });
//     $('li').replaceWith(function () {
//         return $("<tr />").append($(this).contents());
//     });
//     $('span').replaceWith(function () {
//         return $("<td />").append($(this).contents());
//     });
// });

/* Preview Wikilinks */
// TODO: Finish this
// window.addEventListener('load', function () {
//     var $wikilinks = $bodytext.find('a[href^="/wiki/"], a[href^="/mediawiki/"]');
//     var $policies = $wikilinks.find('a[title^="WP:"], a[title^="Wikipedia:"]');
//     $wikilinks.after(' \
//                     <div uk-dropdown> \
//                         <h2></h2> \
//                         <p>Loading summary...</p> \
//                     </div>');

//     $wikilinks.hover(getSummary);

//     function getSummary() {
//         res = $.getJSON('https://en.wikipedia.org/api/rest_v1/page/summary/' + $(this)[0].title, jsonSuccess(data), jsonFailure(data));

//         function jsonSuccess(res) {
//             $(this).find('div h1').html(res.responseJSON.title);
//             $(this).find('div p').html(res.responseJSON.extract);
//         }

//         function jsonFailure(res) {
//             $(this).find('div p').html('Article ' + $(this)[0].title + ' not found!'); // TODO: Better error handling
//         }
//     };
// });