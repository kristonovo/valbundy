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

        dom.submit.on('click', function()
        {
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

        fields.fields.on('propertychange change click keyup paste', function() {

            var field = $(this);

            /**
             * Check if validation for input passes
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
