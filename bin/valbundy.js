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
        var data_rules = target.attr('data-rules') || target.parent().attr('data-rules');
        var rules = [];

        if(typeof data_rules !== 'undefined' && data_rules.length >= 1)
        {
            rules = data_rules.split("|");
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
        var re = /^[a-zA-ZäöüÄÖÜàáâçéèêëîïôûùüÿñæœß]*$/;
        v.pass = re.exec(v.value);
    };

    // german name
    v.name = function()
    {
        var re = /^[a-zA-ZäöüÄÖÜàáâçéèêëîïôûùüÿñæœß\-–]*$/;
        v.pass = re.exec(v.value);
    };

    v.min = function()
    {
        v.pass = v.value.length;
    };

    v.phone = function()
    {
        var re = /^((\+){0,2}[0-9 \-\/]{8,20})*$/;
        v.pass = re.exec(v.value);
    };

    v.email = function()
    {
        var re = /^([-0-9a-zA-Z.+_]{1,60}@[-0-9a-zA-Z.+_]{1,60}\.[a-zA-Z]{2,4})*$/;
        v.pass = re.exec(v.value);
    };

    v.int = function()
    {
        var re = /^([0-9])*$/;
        v.pass = re.exec(v.value);
    };

    v.alphanumeric = function()
    {
        var re = /^([a-zA-Z0-9 ])*$/;
        v.pass = re.exec(v.value);
    };

    // german cities
    v.city = function()
    {
        var re = /^(([a-zA-Z-äöüÄÖÜß/\(\)]+\s){0,100}[a-zA-Z-äöüÄÖÜßàáâçéèêëîïôûùÿñæœ/\(\)]{2,100})*$/;
        v.pass = re.exec(v.value);
    };

    // german zip
    v.zip = function()
    {
        var re = /^(([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3})*$/;
        v.pass = re.exec(v.value);
    };

    // e. g. 2x1
    v.xy = function()
    {
        var re = /^([2-6]x1)*$/;
        v.pass = re.exec(v.value);
    };

    // german text restricted to 1000 characters
    v.text = function()
    {
        var re = /^([a-zA-Z0-9, !?."%§&:;äöüÄÖÜßàáâçéèêëîïôûùÿñæœ()$€=\-–—―+\r\n]){0,1000}$/;
        v.pass = re.exec(v.value);
    };

    // german line restricted to 140 characters
    v.line = function()
    {
        var re = /^([a-zA-Z0-9, !?."%§&:;äöüÄÖÜßàáâçéèêëîïôûùÿñæœ()$€=\-–—―+]){0,140}$/;
        v.pass = re.exec(v.value);
    };

    // german street
    v.street = function()
    {
        var re = /^([A-Za-z 0-9-.,&äöüÄÖÜßàáâçéèêëîïôûùÿñæœ]{2,100})*$/;
        v.pass = re.exec(v.value);
    };

};

/**
 * Created by Kristo on 17.03.2015.
 */

Valbundy.Fields = function(form) {

    var f = this;
    f.form = form;
    f.fields = {};
    f.fieldcount = 0;
    f.validatedFields = {};

    f.setFields = function()
    {
        f.fields = $(f.form.selector + ' :input[data-rules]');
        return f;
    };

    f.countFields = function()
    {
        f.fieldcount = f.fields.length;
        return f;
    };

    f.addValidatedField = function(field)
    {
        f.validatedFields[field.attr('name')] = 'validated';
        return f;
    };

    f.deleteValidatedField = function(field)
    {
        delete f.validatedFields[field.attr('name')];
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
    };

    f.status = function(dom)
    {
        /**
         * Check if all fields are validated.
         * If so we enable the submit-button.
         */
        if(f.countValidatedFields() == f.fieldcount)
        {
            dom.enableSubmit();
        }
        else
        {
            dom.disableSubmit();
        }
    };

};

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

    d.loading = function ()
    {
        d.submit.replaceWith('<div class="loading"></div>');
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

/**
 * Created by Kristo on 16.03.2015.
 */

jQuery.fn.extend({
    valbundy: function() {

        var form = $(this);

        var validation = new Valbundy.Validation();
        var dom =        new Valbundy.DOM(form);
        var fields =     new Valbundy.Fields(form);

        fields.setFields().countFields();

        /**
         * Disable submit button
         * if at least 1 field exists with
         * data-rules attribute
         */
        if(fields.fieldcount)
        {
            dom.disableSubmit();
        }

        dom.submit.on('click', function(e)
        {
            e.preventDefault();
            dom.disableSubmit(); // @todo not just disabling: also loading-feedback
            form.submit();
        });

        /**
         * Init: Validate input-fields
         * Check if server-flag "data-error" is set to 1
         * If so: Delete those fields from ValidatedFields-Object
         */
        $.each(fields.fields, function(key, obj)
        {
            var field = $(this);
            if(validation.validate(field))
            {
                fields.addValidatedField(field);
            }
            else
            {
                fields.deleteValidatedField(field);
            }
            if(parseInt(field.attr('data-error')))
            {
                dom.addClass(field, 'error').showErrorImage(field);
                fields.deleteValidatedField(field);
            }

            fields.status(dom);

        });

        fields.fields.on('propertychange change keyup paste', function() {

            var field = $(this);
            var label = $('label[for="' + field.attr('id') + '"]');

            /**
             * Check if validation for input passes but only if content is given
             */
            if(validation.validate(field))
            {
                dom.removeClass(field, 'error').hideErrorImage(field).showSuccessImage(field);
                fields.addValidatedField(field);
            }
            else
            {
                dom.addClass(field, 'error').hideSuccessImage(field).showErrorImage(field);
                fields.deleteValidatedField(field);
            }

            fields.status(dom);

        });

    }
});
