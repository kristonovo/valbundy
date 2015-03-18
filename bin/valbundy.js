/**
 * Created by Kristo on 17.03.2015.
 */

var Valbundy = Valbundy || {};

Valbundy.Validation = function() {

    var v = this;
    v.value = '';
    v.pass = true;

    v.validate = function(target)
    {
        var rules_str = target.attr('data-rules') || target.parent().attr('data-rules');
        var rules = [];

        if(typeof rules_str !== 'undefined' && rules_str.length >= 1)
        {
            rules = rules_str.split("|");
            v.value = $.trim(target.val());

            $.each(rules, function( key, method )
            {
                if (method in v)
                {
                    v[method]();
                    if (!v.pass)
                    {
                        return false;
                    }
                }
                else
                {
                    console.log('Validation rule does not exist.')
                }
            });
        }
        return v.pass;
    };

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
    };

    // german cities
    v.city = function()
    {
        var re = /^([a-zA-Z-äöüÄÖÜß/\(\)]+\s){0,100}[a-zA-Z-äöüÄÖÜß/\(\)]{2,100}$/;
        v.pass = re.exec(v.value);
    };

    // german zip
    v.zip = function()
    {
        var re = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;
        v.pass = re.exec(v.value);
    };

};
/**
 * Created by Kristo on 17.03.2015.
 */

Valbundy.Fields = function(selector) {

    var f = this;
    f.form = $(selector);
    f.fields = {};
    f.fieldcount = 0;
    f.validatedFields = {};
    f.filledFields = 0;

    f.setFields = function()
    {
        f.fields = $(selector + ' :input[data-rules]').serializeArray();
        return f;
    };

    f.countFields = function()
    {
        f.fieldcount = f.fields.length;
        return f;
    };

    f.countFilledFields = function()
    {
        $.each(f.fields, function(key, obj)
        {
            if(obj['value'] != '')
            {
                f.filledFields++;
            }
        });
        return f;
    };

    f.addValidatedField = function(field)
    {
        f.validatedFields[$(field).attr('id')] = 'validated';
        return f;
    };

    f.deleteValidatedField = function(field)
    {
        delete f.validatedFields[$(field).attr('id')];
        return f;
    };

    f.countValidatedFields = function()
    {
        var count = 0;
        var i;

        for (i in f.validatedFields)
        {
            if (f.validatedFields.hasOwnProperty(i))
            {
                count++;
            }
        }
        return count;
    }

};
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
/**
 * Created by Kristo on 16.03.2015.
 */

jQuery.fn.extend({
    valbundy: function() {

        var form = $(this);
        var selector = form.selector;
        var inputs = $(selector + ' :input[data-rules]');

        var validation = new Valbundy.Validation();
        var dom = new Valbundy.DOM(selector);
        var fields = new Valbundy.Fields(selector);

        fields.setFields().countFields().countFilledFields();
        dom.disableSubmit();
        dom.submit.on('click', function()
        {
            dom.disableSubmit(); // @todo not just disabling: also loading-feedback
            form.submit();
        });

        var Status = function()
        {
            /**
             * Check if all fields are validated.
             * If so we enable the submit-button.
             */
            if(fields.countValidatedFields() == fields.fieldcount)
            {
                dom.enableSubmit();
            }
            else
            {
                dom.disableSubmit();
            }
        };

        /**
         * Check if html-page is loaded and input-fields are already filled:
         * This proofs if html-page is sent back from Server because Server-Side-Validation fails
         */
        if(fields.fieldcount == fields.filledFields)
        {
            $.each(inputs, function(key, obj)
            {
                var input = $(this);
                var server_error = parseInt(input.attr('data-error'));
                if(!server_error)
                {
                    if(validation.validate(input))
                    {
                        dom.removeClass(input, 'error').showSuccessImage(input);
                        fields.addValidatedField(input);
                    }
                    else
                    {
                        dom.addClass(input, 'error').showErrorImage(input);
                        fields.deleteValidatedField(input);
                    }
                }
                else
                {
                    dom.addClass(input, 'error').showErrorImage(input);
                    fields.deleteValidatedField(input);
                }

                Status();
            });
        }

        inputs.on('propertychange change click keyup input paste', function() {

            var input = $(this);

            /**
             * Check if validation for input passes
             */
            if(validation.validate(input))
            {
                dom.removeClass(input, 'error').hideErrorImage(input).showSuccessImage(input);
                fields.addValidatedField(input);
            }
            else
            {
                dom.addClass(input, 'error').hideSuccessImage(input).showErrorImage(input);
                fields.deleteValidatedField(input);
            }

            Status();

        });

    }
});