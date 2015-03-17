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