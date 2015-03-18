/**
 * Created by Kristo on 17.03.2015.
 */

Valbundy.Fields = function(form) {

    var f = this;
    f.form = $(form);
    f.fields = {};
    f.fieldcount = 0;
    f.validatedFields = {};

    f.setFields = function()
    {
        f.fields = $(form.selector + ' :input[data-rules]');
        return f;
    };

    f.countFields = function()
    {
        f.fieldcount = f.fields.length;
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
