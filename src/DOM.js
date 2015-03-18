/**
 * Created by Kristo on 17.03.2015.
 */

Valbundy.DOM = function(form) {

    var d = this;
    d.submit = $(form.selector + ' :submit');
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

    d.addClass = function(target, c)
    {
        target.addClass(c);
        return d;
    };

    d.removeClass = function(target, c)
    {
        target.removeClass(c);
        return d;
    };

    d.showSuccessImage = function(target)
    {
        var next = target.next().attr('class');
        if(next !== 'valbundy-success')
        {
            target.after(d.successImage);

        }
        return d;
    };

    d.hideSuccessImage = function(target)
    {
        target.next('.valbundy-success').remove();
        return d;
    };

    d.showErrorImage = function(target)
    {
        var next = target.next().attr('class');
        if(next !== 'valbundy-error')
        {
            target.after(d.errorImage);

        }
        return d;
    };

    d.hideErrorImage = function(target)
    {
        target.next('.valbundy-error').remove();
        return d;
    };
};
