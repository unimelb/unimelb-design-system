class Valid
  constructor: (@el) ->
    @patterns =
      alpha: /[a-zA-Z]+/
      alpha_numeric : /[a-zA-Z0-9]+/
      integer: /-?\d+/
      number: /-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/
      card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
      cvv : /^([0-9]){3,4}$/

      # generic password: upper-case, lower-case, number/special character, and min 8 characters
      password : /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

      # http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
      email : /^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

      # abc.de
      domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z][a-zA-Z]+$/

      datetime: /([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/
      date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/
      time : /(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/
      dateISO: /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/
      day_month_year : /(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/

      # url: /(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&\'\(\)\*\+,;=]|:|@)|\/|\?)*)?/

    @setupMsg(f) for f in @el.querySelectorAll('[data-required],[data-pattern]')

    t = this
    @el.addEventListener 'submit', (e) ->
      invalid = 0
      target = e.target || e.srcElement
      for f in target.querySelectorAll('input,select,textarea')

        if f.hasAttribute('data-required')
          if f.tagName=='SELECT'
            if f.value!="-1"
              t.valid(f)
            else
              t.invalid(f)
              invalid++

          else
            if f.getAttribute('type')=='checkbox'
              if f.checked
                t.valid(f)
              else
                t.invalid(f)
                invalid++

            else
              if f.value.length > 0
                t.valid(f)
              else
                t.invalid(f)
                invalid++

        if f.hasAttribute('data-pattern')
          re = if t.patterns.hasOwnProperty(f.getAttribute 'data-pattern') then new RegExp(t.patterns[f.getAttribute 'data-pattern']) else new RegExp(f.getAttribute 'data-pattern')
          if re.test(f.value)
            t.valid(f)
          else
            t.invalid(f)
            invalid++

      e.preventDefault() if invalid

  # Move error message out to new node
  setupMsg: (f) ->
    error = document.createElement 'small'
    error.appendChild document.createTextNode f.getAttribute('title')
    f.parentNode.appendChild error

  invalid: (f) ->
    if f.parentNode.hasClass('invalid')
      window.setTimeout ->
        f.parentNode.removeClass('invalid')
        f.removeClass('invalid')
        window.setTimeout ->
          f.parentNode.addClass('invalid')
          f.addClass('invalid')
        , 0
      , 100
    else
      f.parentNode.addClass('invalid')
      f.addClass('invalid')

  valid: (f) ->
    f.parentNode.removeClass('invalid')
    f.removeClass('invalid')

if (supportedmodernbrowser)
  new Valid(f) for f in document.querySelectorAll("[data-validate]")
