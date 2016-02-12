'use strict';
(function(){

  var emailDiv = document.querySelector('.YourEmail');
  var nameDiv = document.querySelector('.YourName');
  var messageDiv = document.querySelector('.YourMessage');
  var myMail = 'dmitrij.relkin(dOg)gM@.MOC';
  var secondMail = 'testemailforportfolio(dOg)M@.MOC';
  var name = document.querySelector('.YourName input');
  var email = document.querySelector('.YourEmail input');
  var message = document.querySelector('.YourMessage textarea');
  var key = 'sZu-y-EBOBOYIieBashkxkilo';

  function createMessageText(text, status){
    var readySendMessage = readySendMessage || document.createElement('div');
    readySendMessage.className = 'message';
    readySendMessage.innerHTML = '<p>' + text + '</p>';
    if(!!!document.querySelector('.message')){
      document.querySelector('body').appendChild(readySendMessage);
      document.querySelector('.message').className = 'message '+status;
    }else{
      document.querySelector('.message').innerHTML = text;
      document.querySelector('.message').className = 'message '+status;
    }
  }
  function deleteMessageText(type)
  {
    setTimeout(function(){
      document.querySelector('.message.'+type).remove();
    },5000);
  }

  document.querySelector('form[name="sentMessage"] button[type="submit"]').addEventListener('click',function(){
    validateEmail();
    validateName();
    validateMessage();
    if(validateEmail() && validateName() && validateMessage()){
       var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
       xmlhttp.open('POST', 'https://mandrillapp.com/api/1.0/messages/send.json');
       xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
       xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
              createMessageText('Message has been sent...','Success');
              message.value = '';
              name.value = '';
              email.value = '';
              deleteMessageText('Success')
            } else {
                createMessageText('Error, service is not available','Error');
                deleteMessageText('Error');
              }         
          }
        } 
       xmlhttp.send(JSON.stringify({'key': key.replace('EBOBO','RnlEp').replace('eBash','bEY').replace('kilo','kog'),
          'message': {
              'from_email': secondMail.replace('(dOg)','@').replace('M@','mail').replace('MOC','com'),
              'to': [{'email': myMail.replace('(dOg)','@').replace('M@','mail').replace('MOC','com'), 'type': 'to'}],
              'autotext': 'true',
              'subject': 'Name:'+ name.value + ', Email:'+ email.value +';',
              'html': '<p>' + message.value + '</p>'
          } 
        }));
    }        
  },false)

    function showError(container, errorMessage,originClassName) {
      container.className = originClassName+' has-error';
      var msgElem = document.createElement('div');
      msgElem.className = "validation-error";
      msgElem.innerHTML = errorMessage;
      container.appendChild(msgElem);
    }

    function resetError(container,originClassName) {
       container.className = originClassName;
        if (container.lastChild.className == "validation-error") {
         container.removeChild(container.lastChild);
        }
    }

    function validateEmail() {
      resetError(emailDiv,'form-group YourEmail'); 
        if (email.value === '') {
            showError(emailDiv, 'This field is required','form-group YourEmail');
            return false
        } else if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(email.value)) {
            showError(emailDiv, 'invalid email','form-group YourEmail');
            return false
        } 
      return true
    }

    function validateName() {
      resetError(nameDiv,'form-group YourName'); 
        if (name.value === '') {
            showError(nameDiv, 'This field is required','form-group YourName');
            return false
        } else if (!/^[а-яА-ЯA-Za-z0-9\,_\.-]{1,}$/.test(name.value)) {
            showError(nameDiv, 'illegal symbols','form-group YourName');
            return false
        } 
      return true
    }

    function validateMessage() {
      resetError(messageDiv,'form-group YourMessage'); 
        if (message.value === '') {
            showError(messageDiv, 'This field is required','form-group YourMessage');
            return false
        } else if (!/^[а-яА-ЯA-Za-z0-9\,_\.-]{1,}$/.test(message.value)) {
            showError(messageDiv, 'illegal symbols','form-group YourMessage');
            return false
        } 
      return true
    }
    var keyupTimeoutEmail;
    email.addEventListener('input',function(event){
      clearTimeout(keyupTimeoutEmail);
      keyupTimeoutEmail = setTimeout(function(){validateEmail()}, 300);
    });

    var keyupTimeoutName;
    name.addEventListener('input',function(event){
      clearTimeout(keyupTimeoutName);
      keyupTimeoutName = setTimeout(function(){validateName()}, 300);
    });

    var keyupTimeoutMessage;
    message.addEventListener('input',function(event){
      clearTimeout(keyupTimeoutMessage);
      keyupTimeoutMessage = setTimeout(function(){validateMessage()}, 300);
    });

}())