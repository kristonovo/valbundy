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