// Generated by CoffeeScript 1.3.3
(function() {
  var readCookieValue, requireFormFill, saveCookieValue;

  saveCookieValue = function(name, value) {
    var expiryDate;
    expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 20);
    return document.cookie = name + '=' + value + '; ' + 'expires=' + expiryDate.toGMTString() + '; path=/';
  };

  readCookieValue = function(name) {
    var cookie, curName, curValue, _i, _len, _ref, _ref1;
    _ref = document.cookie.split(';');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cookie = _ref[_i];
      if (cookie != null) {
        _ref1 = cookie.split('='), curName = _ref1[0], curValue = _ref1[1];
        if ($.trim(curName) === name) {
          return curValue;
        }
      }
    }
    return null;
  };

  requireFormFill = function(e) {
    var canContinue, field, locationOfError, _i, _len, _ref, _ref1;
    canContinue = true;
    locationOfError = 0;
    _ref = $('input');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      if (!$(field).hasClass('optional-field') && !((_ref1 = $(field).val()) != null ? _ref1.length : void 0)) {
        $(field).addClass('error');
        $(field).prev().addClass('error');
        if (canContinue) {
          locationOfError = $(field).prev()[0].offsetTop;
        }
        canContinue = false;
      } else {
        $(field).prev().removeClass('error');
        $(field).removeClass('error');
      }
    }
    if (!canContinue) {
      window.scrollTo(0, locationOfError);
      e.preventDefault();
    }
    return canContinue;
  };

  $('#log-in-email-field').blur(function(e) {
    if ((!readCookieValue('email')) || !(readCookieValue('email') === $(this).val()) && $(this).val().length > 0) {
      return $('.new-account-helper').css('display', 'block');
    }
  });

  $('#log-in-email-field').keypress(function(e) {
    return setTimeout((function() {
      saveCookieValue('email-attempt', $('#log-in-email-field').val());
      if (readCookieValue('email') === $('#log-in-email-field').val()) {
        return $('.new-account-helper').css('display', 'none');
      }
    }), 0);
  });

  $('#log-in-password-field').keypress(function(e) {
    document.getElementById('has-password-yes')[0].value = true;
  }

  $('#sign-up').click(function(e) {
    if (requireFormFill(e)) {
      saveCookieValue('email', $('#new-email-field').val());
      return console.log(readCookieValue('email'));
    }
  });

  $('#log-in').click(requireFormFill);

  $('#log-in').click(requireFormFill);

  if ((readCookieValue('email-attempt')) != null) {
    $('#new-email-field').val(readCookieValue('email-attempt'));
  }

}).call(this);
