'use strict'

function passwordToggle(id = null){
    if(id == null){
        if($('#password').attr('type') == 'password'){
            $('#password').attr('type', 'text');
        }else{
            $('#password').attr('type', 'password');
        }
    }else{
        id = '#'+id;

        if($(id).attr('type') == 'password'){
            $(id).attr('type', 'text');
        }else{
            $(id).attr('type', 'password');
        }
    }
}

function hasData(data){
    if(data != null && data != 'null' && data != undefined && data != 'undefined' && data != "")
        return true;

    return false;
}

function hideError(...ids){
    ids.forEach(e => {
        let id = '#' + e;
        $(id).css('display', 'none');
    });
}

function getDeviceType(){
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
}

function showList(inputId, listId){
    inputId = '#'+inputId;

    if($(inputId).val().length < 2){
        $(inputId).attr('list', '');
    }else{
        $(inputId).attr('list', listId);
    }
}

function hideListOnSelect(inputId){
    let datalist = undefined;

    inputId = '#'+inputId;
    let filter = tagSearches.filter(e => {return e == $(inputId).val();});

    if(inputId == '#interest'){
        datalist = document.querySelector("#interestList");

        if(datalist != null){
            if(filter.length > 0){
                datalist.id = "interestList-hide";
            }else{
                datalist.id = "interestList";
            }
        }else{
            datalist = document.querySelector("#interestList-hide");

            if(filter.length == 0){
                datalist.id = "interestList";
            }else{
                datalist.id = "interestList-hide";
            }
        }
    }else{
        if(inputId == "#tag"){
            datalist = document.querySelector("#tagList");

            if(datalist != null){
                if(filter.length > 0){
                    datalist.id = "tagList-hide";
                }else{
                    datalist.id = "tagList";
                }
            }else{
                datalist = document.querySelector("#tagList-hide");

                if(filter.length == 0){
                    datalist.id = "tagList";
                }else{
                    datalist.id = "tagList-hide";
                }
            }
        }else{
            datalist = document.querySelector("#knowledgeList");

            if(datalist != null){
                if(filter.length > 0){
                    datalist.id = "knowledgeList-hide";
                }else{
                    datalist.id = "knowledgeList";
                }
            }else{
                datalist = document.querySelector("#knowledgeList-hide");

                if(filter.length == 0){
                    datalist.id = "knowledgeList";
                }else{
                    datalist.id = "knowledgeList-hide";
                }
            }
        }
    }
}

function makeid(len){
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for ( let i = 0; i < len; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
 }