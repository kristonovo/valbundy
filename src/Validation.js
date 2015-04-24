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
        var re = /^(([a-zA-Z-äöüÄÖÜß/\(\)]+\s){0,100}[a-zA-Z-äöüÄÖÜß/\(\)]{2,100})*$/;
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

    // german text
    v.text = function()
    {
        var re = /^([a-zA-Z0-9, !?."%&:;äöüÄÖÜß\-\+])*$/;
        v.pass = re.exec(v.value);
    };

    // german street
    v.street = function()
    {
        var re = /^([A-Za-z 0-9-.,&äöüÄÖÜß]{2,100})*$/;
        v.pass = re.exec(v.value);
    };

};
