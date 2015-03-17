/**
 * Created by Kristo on 17.03.2015.
 */

var Valbundy = Valbundy || {};

Valbundy.Validation = function() {

    var v = this;
    v.value = '';
    v.pass = true;

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