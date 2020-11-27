'use strict'

function login(){
    if(!validateForm())
        return;

    let data = {
        email: $('#email').val(),
        password: $('#password').val(),
        device: getDeviceType(),
        useragent: navigator.userAgent
    };
    let url = '/api/ui/user_login';

    axios.post(url, data)
            .then(res => {
                //window.location.href = "./send-confirmation-email";
                if(res.data.login != false){
                   //TODO: Redirigir a algun lado
                }
            })
            .catch(err => {
                $('#invalid-feedback-credentials').css('display', 'block');
            });
}

function validateForm(){
    if(!hasData($('#email').val()) || !hasData($('#password').val())){
        if(!hasData($('#email').val()))
            $('#invalid-feedback-email-1').css('display', 'block');
        if(!hasData($('#password').val()))
        $('#invalid-feedback-password').css('display', 'block');

        return false;
    }
    
    return true;
}

function forgetPassword(){
    if(!hasData($('#email').val())){
        $('#invalid-feedback-email-1').css('display', 'block');
        return;
    }

    let url = '/api/ui/check_user_email?email='+$('#email').val();
    axios.get(url)
        .then(res => {
            if(res.data == true){
                $('#invalid-feedback-email-1').css('display', 'none');
                grecaptcha.ready(function() {
                    grecaptcha.execute('6Lct8M4ZAAAAABO3_1ARkjhif1-T7Jjyef0YdZ2K', {action: 'submit'}).then(function(token) {
                        let url = '/api/ui/send_email_reset_password?email='+$('#email').val();
                        axios.get(url)
                            .then(res => {
                                window.location.href = "./reset-password-email-sent";
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
                  });
            }else{
                $('#invalid-feedback-email-2').css('display', 'block');
            }
        })
        .catch(err => {
            console.log(err);
        });
}