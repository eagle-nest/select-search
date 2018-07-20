/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
    $(document).ready(function () {
        
        $(document).click(function (e) {
            if ($('.suggestion-box').length > 0 && $(e.target).closest('.suggestion-box').length == 0) {
                $('.suggestion-box>.select-suggestion-list').hide();
            }
        });
    });

    $.fn.addSelectSearch = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            color: "#556b2f",
            backgroundColor: "white",
            padding: '4px 4px',
            placeholder: 'Search',
            suggestion: {maxContent: true},
        }, options);

//        console.log($(this).length);
        $(this).each(function () {
            $(this).hide();
            var selectedVal = $('option[selected]', this).text();

            if ($(this).siblings('.suggestion-box').length == 0) {
                $(this).after('<div class="suggestion-box"></div>');
                $(this).siblings('.suggestion-box').attr('style', 'position: relative;');
                $(this).siblings('.suggestion-box').append('<input type="text" class="select-search-box" placeholder="' + settings.placeholder + '"/>');
                $(this).siblings('.suggestion-box').append('<div class="select-suggestion-list" style="display: none"></div>');
                $(this).siblings('.suggestion-box .select-suggestion-list').hide();
            }
            var elselect = $(this);
            var elSuggList = $(this).siblings('.suggestion-box').children('.select-suggestion-list');
            if ($('option[selected]', this).val()) {
                $(this).siblings('.suggestion-box').children('.select-search-box').val(selectedVal);
            }else{
                $(this).siblings('.suggestion-box').children('.select-search-box').val($(this).children('option:first').text());
            }

            $(this).siblings('.suggestion-box').children('.select-search-box').keyup(function (e) {
                text = $(e.target).val();
                elSuggList.empty();
                searchedList = searchOptions(text, elselect);
                if (options.length > 0) {
                    updateSuggestions(searchedList, elSuggList);
                    elSuggList.show();
                    elSuggList.children().first().mouseenter();
                } else {
                    elselect.val('').trigger('change');
                }
            });

            elSuggList.keypress(function (e) {
                console.log($(e.target).text());
                switch (e.which) {
                    case 13: // Enter
                        $(this).click();
                        break;

                    case 38: // up
                        $(this).prev().focus();
                        break;

                    case 40: // down
                        $(this).next().focus();
                        break;

                    default:
                        return; // exit this handler for other keys
                }
            });
        });

        function searchOptions(text, elSelect) {
            text = text.toLowerCase();
            elselect = elSelect;
            options = elSelect.children('option').map(function () {
                optionText = this.text.toLowerCase();
                if (optionText.indexOf(text) >= 0) {
                    return {value: this.value, text: this.text};
                }
            }).get();
            return options;
        }

        function updateSuggestions(suggestions, elSuggList) {
            elSelect = elSuggList.closest('.suggestion-box').siblings('select');
            elSearchInput = elSuggList.siblings('input');
            for (var i = 0; i < suggestions.length; i++) {
                elSuggList.append('<div value=' + suggestions[i].value + '>' + suggestions[i].text + '</div>');
            }

            if (settings.suggestion.maxContent) {
                elSuggList.css('width', 'fit-content');
                elSuggList.children().css('width', 'max-content');
            }
            elSuggList.children().css('cursor', 'pointer');

            elSuggList.children().click(function () {
                elSelect.val($(this).attr('value')).trigger('change');
                elSearchInput.val($(this).text());
                elSuggList.hide();
            });

        }
    };

}(jQuery));


