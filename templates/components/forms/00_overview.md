## Implementation

Client&ndash;side form validation, using HTML5 text patterns.

## Dependencies

Some minor DOM extensions (IE8+ only)

## Options
<ul class="nobullet">
  <li><code>data-validate</code> &ndash; Validate form <small>required</small></li>
  <li><code>data-required</code> &ndash; Field is required <small class="opt">optional</small></li>
  <li><code>data-pattern</code> &ndash; Field is required and must match pattern (can be regular expression or from list adapted from <a href="http://foundation.zurb.com/docs/components/abide.html">Foundation</a> below) <small class="opt">optional</small>
    <dl>
      <dt>alpha</dt><dd>any letter (can be upper of lower case)<br>
        <code>/[a-zA-Z]+/</code></dd>
      <dt>alpha_numeric</dt><dd>any letter or number<br>
        <code>/[a-zA-Z0-9]+/</code></dd>
      <dt>integer</dt><dd>any whole number (can be negative)<br>
        <code>/-?\d+/</code></dd>
      <dt>number</dt><dd>any number<br>
        <code>/-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/</code></dd>
      <dt>card</dt><dd>credit card number<br>
        <code>/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/</code></dd>
      <dt>cvv</dt><dd>credit card cvv<br>
        <code>/^([0-9]){3,4}$/</code></dd>
      <dt>password</dt><dd>generic password must include upper-case, lower-case, number/special character, and min 8 characters<br>
        <code>/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/</code></dd>
      <dt>email</dt><dd><a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address">email address</a><br>
        <code>/^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/</code></dd>
      <dt>domain</dt><dd>abc.de (no http://)<br>
        <code>/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/</code></dd>
      <dt>datetime</dt><dd>YYYY-MM-DDThh:mm:ssTZD<br>
        <code>/([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/</code></dd>
      <dt>date</dt><dd>YYYY-MM-DD 2014-01-21<br>
        <code>/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/</code></dd>
      <dt>time</dt><dd>HH::MM::SS 11:47:23 (can be 12 or 24 hour)<br>
        <code>/(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/</code></dd>
      <dt>dateISO</dt><dd>YYYY-MM-DD 2013-01-21 2014-01-21 (ISO formatted date)<br>
        <code>/\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/</code></dd>
      <dt>day_month_year</dt><dd>DD-MM-YYYY 21-01-2014<br>
        <code>/(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/</code></dd>
    </dl>
  </li>
</ul>

Note: Browser-native HTML5 validation uses <code>required</code> and <code>pattern</code>, but there is no easy way to customise the error messand behaviour.

## Example
