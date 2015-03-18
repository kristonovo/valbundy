/**
 * Created by Kristo on 17.03.2015.
 */

Valbundy.DOM = function(selector) {

    var d = this;
    d.submit = $(selector + ' :submit');
    d.successImage = '<img class="valbundy-success" src="/img/valbundy-success.png" alt="check">';
    d.errorImage = '<img class="valbundy-error" src="/img/valbundy-error.png" alt="x">';

    d.disableSubmit = function()
    {
        d.submit.prop('disabled', true).addClass('disabled');
        return d;
    };

    d.enableSubmit = function()
    {
        d.submit.prop('disabled', false).removeClass('disabled');
        return d;
    };

    d.addClass = function(selector, c)
    {
        selector.addClass(c);
        return d;
    };

    d.removeClass = function(selector, c)
    {
        selector.removeClass(c);
        return d;
    };

    d.showSuccessImage = function(selector)
    {
        var next = selector.next().attr('class');
        if(next !== 'valbundy-success')
        {
            selector.after(d.successImage);

        }
        return d;
    };

    d.hideSuccessImage = function(selector)
    {
        selector.next('.valbundy-success').remove();
        return d;
    };

    d.showErrorImage = function(selector)
    {
        var next = selector.next().attr('class');
        if(next !== 'valbundy-error')
        {
            selector.after(d.errorImage);

        }
        return d;
    };

    d.hideErrorImage = function(selector)
    {
        selector.next('.valbundy-error').remove();
        return d;
    };
};
