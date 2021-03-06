# Valbundy
Instant form validation (requires jQuery)

## Download
Download **bin/valbundy.min.js** and include it after jquery
```html
<script src="jquery.min.js"></script>
<script src="valbundy.min.js"></script>
```

## Usage
1. ### jQuery
  Add `.valbundy()` to any form you wish
  ```javascript
  $().ready(function() {
      $("#my-form").valbundy();
  });
  ```

2. ### Feedback-Images
Place the two png-images from **img/** folder in your public root. They have to be accessible via e.g. `http://yourdomain.com/img/valbundy-success.png`

3. ### HTML-Markup
  Add data-rules attribute to input-fields. Separate multiple rules with `|`. Don´t forget to markup your input with an unique name-attribute.
  ```html
  <input name="email" type="email" data-rules="required|email">
  ```
  If you like to interact with server-side validation (recommended) use `data-error` to let valbundy know that the given field failed while server-validation.
  ```html
  <input name="email" type="email" data-rules="required|email" data-error="1">
  ```

### Validation rules
- required
- alpha
- email
- phone
- int
- alphanumeric
- min @todo min:2
- text
  - regex for german text
- line
  - regex for german text without line break
- street
  - regex for german streets
- zip
  - regex for german postcodes
- city
  - regex for german cities

Fields without the data-rules-attribute will automatically be treated as validated.

***

## More Advanced

### CSS
Fields which are failing validation get the error class attached
```html
<input class="error" name="email" type="email" data-rules="required|email" data-error="1">
```
Customise your CSS to fit your needs. E.g.
```css
input.error {
  border: 1px solid red;
}
```
The class will automatically removed when the given field passes validation.

### Custom validation rules
Download **bin/valbundy.js**. To define your own rule just add a method to **Valbundy.Validation**. The method should set `v.pass` to false if validation fails. If validation pass its value should be true or any "not-false" value.
```javascript
v.customrule = function()
{
    v.pass = v.value.length;
}
```
After that you can use the validation-rule in html
```html
<input name="first-name" type="text" data-rules="alpha|customrule">
```
