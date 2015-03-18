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

        //fields.status(dom);

        /**
         * Init: Validate input-fields
         * Check if server-flag "data-error" is set to 1
         * If so: Delete those fields from ValidatedFields-Object
         */
        $.each(inputs, function(key, obj)
        {
            var input = $(this);
            if(validation.validate(input))
            {
                fields.addValidatedField(input);
            }
            else
            {
                fields.deleteValidatedField(input);
            }
            if(parseInt(input.attr('data-error')))
            {
                dom.addClass(input, 'error').showErrorImage(input);
                fields.deleteValidatedField(input);
            }
            fields.status(dom);
        });

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

            fields.status(dom);

        });

    }
});
