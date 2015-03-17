/**
 * Created by Kristo on 17.03.2015.
 */

var Valbundy = Valbundy || {};

Valbundy.Validation = function() {

    var v = this;
    v.value = '';
    v.pass = true;

    v.required = function()
    {
        v.pass = v.value.length;
    };

    v.alpha = function()
    {
        var re = /^[a-zA-ZäöüÄÖÜàáâçéèêëîïôûùüÿñæœß]+$/;
        v.pass = re.exec(v.value);
    };

    v.min = function()
    {
        v.pass = v.value.length;
    };

    v.phone = function()
    {
        var re = /^(\+){0,2}[0-9 ]{8,20}$/;
        v.pass = re.exec(v.value);
    };

    v.email = function()
    {
        var re = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
        v.pass = re.exec(v.value);
    }

};
/**
 * Created by Kristo on 17.03.2015.
 */

Valbundy.DOM = function() {

    var d = this;

    d.addClass = function(selector, c)
    {
        $(selector).addClass(c);
        return d;
    };

    d.removeClass = function(selector, c)
    {
        $(selector).removeClass(c);
        return d;
    };

    d.displayCheck = function(selector)
    {
        var next_element = $(selector).next().attr('class');
        if(next_element !== 'check')
        {
            $(selector).after('<img class="check" src="/img/check.png" alt="check">');
        }
        return d;
    };

    d.removeCheck = function(ancestor)
    {
        $(ancestor).next('.check').remove();
        return d;
    };

    d.displayCross = function(selector)
    {
        var next_element = $(selector).next().attr('class');
        if(next_element !== 'cross')
        {
            $(selector).after('<img class="cross" src="/img/cross.png" alt="cross">');
        }
        return d;
    };

    d.removeCross = function(ancestor)
    {
        $(ancestor).next('.cross').remove();
        $(ancestor).next().next('.cross').remove();
        return d;
    };
};
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