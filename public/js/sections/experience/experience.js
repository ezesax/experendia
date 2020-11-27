'use strict'

var tagSearches = undefined;
var tags = [];
var suggested_tags = [];

$(document).ready(() => {
    getChannels();
    fillTags();

    if(hasData(localStorage.tempPath))
        deleteAllContent(localStorage.tempPath);

    localStorage.removeItem('mainPhoto');
});

function getChannels(){
    let url = '/api/ui/channels/get_channels';
    axios.get(url)
        .then(res => {
            let channels = Object.values(res.data.response);
            channels.forEach((e, i) => {
                $('#channels').append(new Option(e, i+1));
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
                $('#tagList').append(new Option(e));
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function addTag(){
    if(!hasData($('#tag').val()))
        return;

    hideError('invalid-tags');
    
    let tag = $('#tag').val();
    let ind = tagSearches.indexOf(tag);
    let li = "";

    if(ind >= 0){
        tags.push(ind+1);
        li = '<li id="tag-'+(ind+1)+'" class="tag_circle"> <a style="color:#718081">'+tag+'<span class="delete-tag-m" onclick="deleteElement(\'tag-'+(ind+1)+'\')">×</span></a></li>';
    }else{
        suggested_tags.push(tag);
        li = '<li id="tag-'+tag.replace(" ", "_")+'" class="tag_circle"> <a style="color:#718081">'+tag+'<span class="delete-tag-m" onclick="deleteElement(\'tag-'+tag.replace(" ", "_")+'\')">×</span></a></li>';
    }

    $("#selectedTags").append(li);

    $('#tag').val('');
}

function deleteElement(id){
    let remove = '#'+id;
    $(remove).remove();

    id = id.split('-');

    if(!isNaN(parseInt(id[1]))){
        let ind = tags.indexOf(parseInt(id[1]));
        tags.splice(ind, 1);
    }else{
        let tag = id[1].replace("_", " ");
        let ind = suggested_tags.indexOf(tag);
        suggested_tags.splice(ind, 1);
    }
}

function mainImageUpload(){
    if(!hasData($('#file-input').val()))
        return;

    hideError('invalid-file-input');

    let data = new FormData()

    data.append('image',document.getElementById('file-input').files[0]);
    data.append('path', localStorage.tempPath);
    
    let url = '/api/ui/experiences/upload_main_photo';
    axios.post(url, data)
        .then(res => {
            $('#upload_img').css('display', 'none');
            $('#image_selected').attr('src', res.data.path);
            localStorage.mainPhoto = res.data.path;
            $('#uploaded_img').css('display', 'block');

        })
        .catch(err => {
            console.log(err);
        });
}

function mainImageDelete(){
    let data = {path: localStorage.mainPhoto};
    let url = '/api/ui/experiences/delete_main_photo';
    axios.post(url, data)
        .then(res => {
            $('#uploaded_img').css('display', 'none');
            localStorage.removeItem('mainPhoto');
            $('#upload_img').css('display', 'block');
        })
        .catch(err => {
            console.log(err);
        });
}

function saveExperience(){
    if(!validateExperience())
        return;
    
    let data = new FormData();
    
    data.append('channel', $('#channels').val());
    data.append('title', $('#title').val());
    data.append('experience', editor.getData());
    data.append('image', document.getElementById('file-input').files[0]);
    data.append('video', $('#video').val());
    data.append('tags', tags);
    data.append('suggested_tags', suggested_tags);
    data.append('path', localStorage.tempPath);
    data.append('useragent', navigator.userAgent);
    data.append('device', getDeviceType());

    let url = '/api/ui/experiences/save_experience';
    axios.post(url, data)
        .then(res => {
            //TODO:
            //vaciar formulario
            //mostrar algun mensaje
            //redirigir a algun lado
            localStorage.removeItem('mainPhoto');
            localStorage.removeItem('tempPath');
            document.location.href = './post-success';
        })
        .catch(err => {
            console.log(err);
        });
}

function validateExperience(){
    if(!hasData($('#channels').val()) || !hasData($('#title').val()) || 
        !hasData(editor.getData()) || (tags.length + suggested_tags.length) < 3 ||
        !hasData($('#file-input').val())){

            if(!hasData($('#channels').val())){
                $('#invalid-channel').css('display', 'block');
                document.getElementById('channels').focus();
            }
            
            if(!hasData($('#title').val())){
                $('#invalid-title').css('display', 'block');
                document.getElementById('title').focus();
            }
            
            if(!hasData(editor.getData())){
                $('#invalid-experienceBody').css('display', 'block');
                document.getElementsByClassName('ck-editor__editable_inline')[0].focus();
            }
            
            if(!hasData($('#file-input').val())){
                $('#invalid-file-input').css('display', 'block');
                document.getElementById('file-input').focus();
            }
            
            if((tags.length + suggested_tags.length) < 3){
                $('#invalid-tags').css('display', 'block');
                document.getElementById('tag').focus();
            }
            
            return false;
    }

    return true;
}

function deleteAllContent(path){
    console.log(path);
}