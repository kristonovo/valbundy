# Valbundy
Instant jquery validation

## Usage
Requires jquery
### For production
Download **bin/valbundy.min.js** and include it after jquery like so
```
...
<script src="jquery.min.js"></script>
<script src="valbundy.min.js"></script>
...
```

### Usage
Add `.valbundy()` to any form you wish
```
$().ready(function() {
    $(".form").valbundy();
});
```

Add data-rules attribute to inputfields. Sepparate multiple rules with `|`
```
<input name="email" type="email" data-rules="required|email">
```

### Validation rules
- required
- alpha
- email
- phone
- min @todo min:2

To add your own rule just add a method to **Validation.js**. The method should set `v.pass` to false if validation fails. If validation pass its value should be true or any "notfalse" value.
```
v.customrule = function()
{
    v.pass = v.value.length;
}
```
