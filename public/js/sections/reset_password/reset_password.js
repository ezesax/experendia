'use strict'

const { hasData } = require("jquery");

function sendForm(){
    //resetPassForm
    if(!validateForm())
        return;
    
    var form = document.querySelector('#resetPassForm');
    var data = new FormData(form);

    axios.post('/api/ui/update_password', data)
        .then(res => {
            //window.location.href = "./send-confirmation-email";
            //TODO: Redirigir a alguna otra ruta
        })
        .catch(err => {
            console.log(err);
            //TODO: Mostrar algún mensaje de error
        });
}

function validateForm(){
    //invalid-feedback-password-1
    if(!hasData($('#password').val()) || !hasData($('#repassword').val())){
        $('#invalid-feedback-password-1').css('display', 'block');
        return false;
    }else{
        $('#invalid-feedback-password-1').css('display', 'none');

        if($('#password').val() != $('#repassword').val()){
            $('#invalid-feedback-password-2').css('display', 'block');
            return false;
        }else{
            $('#invalid-feedback-password-2').css('display', 'none');
            if(!isCorrectFormat()){
                $('#invalid-feedback-password-3').css('display', 'block');
                return false;
            }else{
                $('#invalid-feedback-password-3').css('display', 'none');
                return true;
            }
        }
    }

    return true;
}

function isCorrectFormat(){
    let pass = $('#password').val();

    if(pass.length < 6)
        return false;
    

    for(let i = 0; i < 10; i++){
        if(pass.search(i) >= 0)
            return true;
    }

    return false;
}