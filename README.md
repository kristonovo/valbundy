# Valbundy
Instant form validation (requires jquery)

## Download
Download **bin/valbundy.min.js** and include it after jquery
```html
...
<script src="jquery.min.js"></script>
<script src="valbundy.min.js"></script>
...
```

## Usage
Add `.valbundy()` to any form you wish
```javascript
$().ready(function() {
    $("#my-form").valbundy();
});
```

### Feedback-Images
Place two png-images in your public root called `valbundy-success.png` and `valbundy-error.png`. They have to be accessible via e.g. `yourdomain.com/img/valbundy-success.png`.

### HTML-Markup
Add data-rules attribute to input-fields. Separate multiple rules with `|`. **Important:** input-fields need an id-attribute which is equal to their name-attribute.
```html
<input id="email" name="email" type="email" data-rules="required|email">
```
If you like to interact with server-side validation (recommended) use `data-error` to let valbundy know that the given field failed while server-validation.
```html
<input id="email" name="email" type="email" data-rules="required|email" data-error="1">
```

### Validation rules
- required
- alpha
- email
- phone
- min @todo min:2
- city
  - default regex for german cities
- zip
  - default regex for german postcodes

Fields without the data-rules-attribute will automatically be treated as validated.

***

### Advanced
Download **bin/valbundy.js**. To add your own rule just add a method to **Valbundy.Validation**. The method should set `v.pass` to false if validation fails. If validation pass its value should be true or any "not-false" value.
```javascript
v.customrule = function()
{
    v.pass = v.value.length;
}
```
After that you can use the validation-rule in html
```html
<input id="first-name" name="first-name" type="text" data-rules="alpha|customrule">
```
