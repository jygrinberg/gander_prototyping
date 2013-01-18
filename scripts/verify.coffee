
saveCookieValue = (name, value) ->
  expiryDate = new Date()
  expiryDate.setMinutes(expiryDate.getMinutes() + 20)
  document.cookie = 
    name+'=' + value + '; ' +
    'expires=' + expiryDate.toGMTString() + '; path=/'

readCookieValue = (name) ->
  for cookie in document.cookie.split(';')
    if cookie?
      [curName, curValue] = cookie.split('=')
      if $.trim(curName) == name
        return curValue
  null

requireFormFill = (e) ->
  canContinue = true
  locationOfError = 0
  for field in $('input')
    if not $(field).hasClass('optional-field') and not $(field).val()?.length
      $(field).addClass('error')
      $(field).prev().addClass('error')
      if canContinue
        locationOfError = $(field).prev()[0].offsetTop #position of label for field
      canContinue = false
    else
      $(field).prev().removeClass('error')
      $(field).removeClass('error')
  if not canContinue
    window.scrollTo 0, locationOfError
    e.preventDefault()
  canContinue

$('#log-in-email-field').blur (e) ->
  if (not readCookieValue('email')) or not (readCookieValue('email') == $(this).val()) and $(this).val().length > 0
    $('.new-account-helper').css('display', 'block')

$('#log-in-email-field').keypress (e) ->
  setTimeout (->
    saveCookieValue 'email-attempt', $('#log-in-email-field').val() 
    if readCookieValue('email') == $('#log-in-email-field').val()
      $('.new-account-helper').css('display', 'none')),
    0

$('#sign-up').click (e) ->
  if requireFormFill e
    saveCookieValue 'email', $('#new-email-field').val()

    console.log(readCookieValue('email'))

$('#go').click requireFormFill

if (readCookieValue 'email-attempt')?
  $('#new-email-field').val (readCookieValue 'email-attempt')

