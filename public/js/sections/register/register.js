'use strict'

var tagSearches = undefined;
var interests = [];
var knowledges = [];

$(document).ready(() => {
    fillNationalities();
    fillTags();
});

async function fillNationalities(){
    let url = '/api/ui/zones/get_zones';
    axios.get(url)
            .then(res => {
                let nationalities = res.data.response;

                nationalities.forEach(e => {
                    $('#nationality').append(new Option(e.name, e.id));
                });
            })
            .catch(err => {
                console.log(err);
            });
}

async function fillTags(){
    let url = '/api/ui/tags/get_tag_searches_list';
    axios.get(url)
            .then(res => {
                tagSearches = Object.values(res.data.response);

                tagSearches.forEach((e, i) => {
                    $('#interestList').append(new Option(e));
                    $('#knowledgeList').append(new Option(e));
                });
            })
            .catch(err => {
                console.log(err);
            });
}

function addInterest(){
    let tag = $('#interest').val();
    let ind = tagSearches.indexOf(tag);
    
    if(!hasData(tag) || ind < 0 || interests.find(e => e == (ind+1)))
        return;
    
    ind += 1;
    interests.push(ind);

    let li = '<li id="interest-'+ind+'" class="tag_register_interests"> <a style="color:#718081">'+tag+'<span class="delete-tag-m" onclick="deleteElement(\'interest-'+ind+'\')">×</span></a></li>';
    $("#selectedInterest").append(li);

    $('#interest').val('');

    showList('interest', 'interestList');
}

function addKnowledge(){
    let tag = $('#knowledge').val();
    let ind = tagSearches.indexOf(tag);
    
    if(!hasData(tag) || ind < 0 || interests.find(e => e == (ind+1)))
        return;
    
    ind += 1;
    knowledges.push(ind);

    let li = '<li id="knowledge-'+ind+'" class="tag_register_interests"> <a style="color:#718081">'+tag+'<span class="delete-tag-m" onclick="deleteElement(\'knowledge-'+ind+'\')">×</span></a></li>';
    $("#selectedKnowledges").append(li);

    $('#knowledge').val('');
    showList('knowledge', 'knowledgeList');
}

function deleteElement(id){
    let remove = '#'+id;
    $(remove).remove();

    id = id.split('-');

    if(id[0] === 'interest'){
        let ind = interests.indexOf(parseInt(id[1]));
        interests.splice(ind, 1);
    }
    if(id[0] === 'knowledge'){
        let ind = knowledges.indexOf(parseInt(id[1]));
        knowledges.splice(ind, 1);
    }
}

function register(event){
    event.preventDefault();

    if(!validateForm())
        return;

    grecaptcha.ready(function() {
        grecaptcha.execute('6Lct8M4ZAAAAABO3_1ARkjhif1-T7Jjyef0YdZ2K', {action: 'submit'}).then(function(token) {
            let url = '/api/ui/check_user_email?email='+$('#email').val();
            axios.get(url)
                .then(res => {
                    if(res.data == false){
                        sendForm();
                        $('#invalid-email-duplicated').css('display', 'none');
                    }else{
                        $('#invalid-email-duplicated').css('display', 'block');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });
      });
}

function sendForm(){
    let data = new FormData();

    data.append('isManualRegister', $('#isManualRegister').val());
    data.append('firstname', $('#firstname').val());
    data.append('lastname', $('#lastname').val());
    data.append('nationality', $('#nationality').val());
    data.append('country', $('#nationality').val());
    data.append('email', $('#email').val());
    data.append('password', $('#password').val());
    data.append('useragent', navigator.userAgent);
    data.append('device', getDeviceType());
    data.append('role', 'User');


    for(let i = 0; i < interests.length; i++ ) {
        data.append('interests[]', interests[i]);
    }
    for(let i = 0; i < knowledges.length; i++ ) {
        data.append('knowledges[]', knowledges[i]);
    }


    data.append('status', 'Pendiente');
    data.append('isPublic', 1);
    data.append('origin', 'ui');
    
    let url = '/api/ui/user_manual_register';

    axios.post(url, data)
            .then(res => {
                window.location.href = "./send-confirmation-email";
            })
            .catch(err => {
                console.log(err);
            });
}

function validateForm(){
    if(     !hasData($('#firstname').val())
        ||  !hasData($('#lastname').val())
        ||  !hasData($('#email').val())
        ||  !hasData($('#password').val())
        ||  !hasData($('#nationality').val())
        ||  interests.length < 3
        ||  knowledges.length < 3
    ){
        if(!hasData($('#firstname').val())){
            $('#invalid-firstname').css('display', 'block');
        }else{
            $('#invalid-firstname').css('display', 'none');
        }

        if(!hasData($('#lastname').val())){
            $('#invalid-lastname').css('display', 'block');
        }else{
            $('#invalid-lastname').css('display', 'none');
        }

        if(!hasData($('#email').val())){
            $('#invalid-email').css('display', 'block');
        }else{
            $('#invalid-email').css('display', 'none');
        }

        if(!hasData($('#password').val())){
            $('#invalid-password').css('display', 'block');
        }else{
            $('#invalid-password').css('display', 'none');
        }

        if(!hasData($('#nationality').val())){
            $('#invalid-nationality').css('display', 'block');
        }else{
            $('#invalid-nationality').css('display', 'none');
        }

        if(interests.length < 3){
            $('#invalid-interest').css('display', 'block');
        }else{
            $('#invalid-interest').css('display', 'none');
        }

        if(knowledges.length < 3){
            $('#invalid-knowledge').css('display', 'block');
        }else{
            $('#invalid-knowledge').css('display', 'none');
        }

        return false;
    }else{
        $('#invalid-firstname').css('display', 'none');
        $('#invalid-lastname').css('display', 'none');
        $('#invalid-email').css('display', 'none');
        $('#invalid-password').css('display', 'none');
        $('#invalid-nationality').css('display', 'none');
        $('#invalid-interest').css('display', 'none');
        $('#invalid-knowledge').css('display', 'none');
    }
    
    return true;
}

function passwordToggle(){
    if($('#password').attr('type') == 'password'){
        $('#password').attr('type', 'text');
    }else{
        $('#password').attr('type', 'password');
    }
}