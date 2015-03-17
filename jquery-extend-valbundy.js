/**
 * Created by Kristo on 16.03.2015.
 */

var validation = new Valbundy.Validation();
var dom = new Valbundy.DOM();

jQuery.fn.extend({
    valbundy: function() {

        var selector = $(this).selector;
        var submit = $(selector + ' :submit');
        submit.prop('disabled', true).addClass('disabled');

        $(selector + ' :input').on('propertychange change click keyup input paste', function() {

            var rules_str = $(this).attr('data-rules');
            var rules = [];

            if(typeof rules_str !== 'undefined' && rules_str.length >= 1)
            {
                rules = rules_str.split("|");
                validation.value = $.trim($(this).val());

                $.each(rules, function( key, value ) {
                    if(value in validation)
                    {
                        validation[value]();
                        if(!validation.pass)
                        {
                            return false;
                        }
                    }
                    else
                    {
                        console.log('Validation rule does not exist.')
                    }
                });

                if(!validation.pass)
                {
                    dom.addClass($(this), 'error').removeCheck($(this)).displayCross($(this));
                    submit.prop('disabled', true).addClass('disabled');
                }
                else
                {
                    dom.removeClass($(this), 'error').displayCheck($(this)).removeCross($(this));
                    submit.prop('disabled', false).removeClass('disabled');
                }
            }

        });

    }
});