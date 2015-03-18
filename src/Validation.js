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
        var re = /^[a-zA-ZäöüÄÖÜàáâçéèêëîïôûùüÿñæœß]*$/;
        v.pass = re.exec(v.value);
    };

    v.min = function()
    {
        v.pass = v.value.length;
    };

    v.phone = function()
    {
        var re = /^((\+){0,2}[0-9 ]{8,20})*$/;
        v.pass = re.exec(v.value);
    };

    v.email = function()
    {
        var re = /^[-0-9a-zA-Z.+_]{1,60}@[-0-9a-zA-Z.+_]{1,60}\.[a-zA-Z]{2,4}$/;
        v.pass = re.exec(v.value);
    };

    // german cities
    v.city = function()
    {
        var re = /^(([a-zA-Z-äöüÄÖÜß/\(\)]+\s){0,100}[a-zA-Z-äöüÄÖÜß/\(\)]{2,100})*$/;
        v.pass = re.exec(v.value);
    };

    // german zip
    v.zip = function()
    {
        var re = /^(([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3})*$/;
        v.pass = re.exec(v.value);
    };

};