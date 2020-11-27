'use strict'

var tagColors = ['color-red', 'color-peru', 'color-indigo', 'color-lightseagreen', 'color-darkcyan'];
var curPageLazyLoad = 1;
var channelList = undefined;
var banners = {
	vida: '<div class="container"><div class="row bg-img-banner"><div class="d-none d-sm-block col-sm-1 d-lg-block col-lg-1"> &nbsp; </div><div class="col-8 col-sm-6 col-md-4 col-lg-5 col-xl-5 text-center text-banner-index"><br>Una comunidad para compartir tus experiencias <b>de Vida</b> y así ayudar a otras personas.<br><a href="/#" class="line-height-40 btn-tag-exp text-14">Saber más <span class="text-18"> › </span></a></div><div class="col-4 col-sm-5 col-md-6 col-lg-6 col-xl-6 text-right"><div class="close_banner float-right"><a style="cursor: pointer;" onclick="hidden_banner();">×</a></div></div></div></div>',
	conocimiento: '<div id="hidden_banner" class="container-fluid" style="border-bottom: 1px solid #e9ecec"><div class="container"><div class="row bg-img-banner-knowledge"><div class="d-none d-sm-block col-sm-1 d-lg-block col-lg-1"> &nbsp; </div><div class="col-8 col-sm-6 col-md-4 col-lg-5 col-xl-5 text-center text-banner-index"><br>Una comunidad para compartir experiencias de tus <b>Conocimientos</b> y así ayudar a otras personas. <br><a href="#" class="line-height-40 btn-tag-exp text-14">Saber más <span class="text-18"> › </span></a></div><div class="col-4 col-sm-5 col-md-6 col-lg-6 col-xl-6 text-right"><div class="close_banner float-right"><a style="cursor: pointer;" onclick="hidden_banner();">×</a></div></div></div></div>',
	negocio: '<div class="container"><div class="row bg-img-banner-brands"><div class="d-none d-sm-block col-sm-1 d-lg-block col-lg-1"> &nbsp; </div><div class="col-8 col-sm-6 col-md-4 col-lg-5 col-xl-5 text-center text-20 text-banner-index"><br>Una comunidad para compartir tus experiencias sobre <b>Negocios y Marcas</b> y así ayudar a otras personas.<br><a href="#" class="line-height-40 btn-tag-exp  text-14">Saber más <span class="text-18"> › </span></a></div><div class="col-4 col-sm-5 col-md-6 col-lg-6 col-xl-6 text-right"><div class="close_banner float-right"><a style="cursor: pointer;" onclick="hidden_banner();">×</a></div></div></div></div>'
}

$(document).ready(() => {
    getChannels();
    tenMoreUsefullTags();
    fiveMoreVisitedExperiences();
    listExperiences(curPageLazyLoad);
});

$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        curPageLazyLoad++;

        listExperiences(curPageLazyLoad);
    }
 });

async function getChannels(){
    let url = '/api/ui/channels/get_channels_complete';
    axios.get(url)
        .then(res => {
            let channels = res.data.response;
            channelList = channels;
            let container = document.getElementById('channelOptions');
            container.innerHTML = '';

            channels.forEach((e, i) => {
                let li = '<a href="/channel/'+e.slug+'" class="dropdown-item btn-subchannel" style="color:#21b27f;cursor:pointer">'+e.name+'</a>';
                container.innerHTML += li;
            });

            setChannelSelected();
        })
        .catch(err => {
            console.log(err);
        });
}

function setChannelSelected(){
    let id = $('#channelId').val();
    let currentChannel = channelList.filter(e => {return e.id == id})[0];

    $('#currentChannelSelected').contents().last().replaceWith(currentChannel.name);
    $('#hidden_banner').html(banners[currentChannel.slug]);
}

async function tenMoreUsefullTags(){
    let id = $('#channelId').val();
    let url = '/api/ui/tags/get_ten_more_usefull?id='+id;
    axios.get(url)
            .then(res => {
                $('#top-ten-tags').html('');
                let ul = document.getElementById('top-ten-tags');

                let channelName = $('#channelName').val();

                res.data.response.forEach((fullTag, index) => {
                    let tag = fullTag['name'];
                    let redirect = 'http://'+window.location.hostname+':'+window.location.port+'/channel/'+channelName+'/tag/'+fullTag['slug']
                    let cap = tag[0];
                    let colorInd = tagColors.length <= index ? index - tagColors.length : index;
                    let li = '<li class="row margin-right-10"><div class="d-none d-lg-block col-lg-2"> <div class="bg_c_letters '+tagColors[colorInd]+'">'+cap+'</div> </div><div class="col-12 col-lg-10 bg_c_themmes btn btn-light"> <a href="'+redirect+'">'+tag+'</a> </div></li>';

                    ul.innerHTML += li;
                });
            })
            .catch(err => {
                console.log(err);
            });
}

async function fiveMoreVisitedExperiences(){
    let id = $('#channelId').val();
    let tag = $('#tagId').val();
    let url = '/api/ui/experiences/get_five_more_seen?id='+id+'&tag='+tag;
    axios.get(url)
            .then(res => {
                $('#top-five-experiences').html('');
                let div = document.getElementById('top-five-experiences');

                res.data.response.forEach(exp => {
                    let container = '<div style="background: #e9f0f5; overflow: hidden;"><div class="photo-profile_featured"><div class="photo-profile"><svg width="36" height="36"><use xlink:href="/svg/sprite-icons.svg#profile"/></svg></div></div><div class="name-profile_featured"><div class="line-height-20"><a href="/#">'+exp['userFullName']+'</a></div><div class="country-col-exp">'+exp['zone']+'</div> &nbsp; <svg width="17" height="17"><use xlink:href="/svg/sprite-icons.svg#level1"/></svg></div></div><div class="featured-title-experendia"><a href="/#" class="btn-tag-exp text-12">'+exp['rootTag']+'</a> <p></p><b><a href="/#" class="text-dark line-height-20">'+exp['title']+'</a></b></div>';
                    div.innerHTML += container;
                });

            })
            .catch(err => {
                console.log(err);
            });
}

async function listExperiences(page = 1){
    let id = $('#channelId').val();
    let tag = $('#tagId').val();
    let url = '/api/ui/experiences/get_ordered_experiences?page='+page+'&id='+id+'&tag='+tag;
    axios.get(url)
            .then(res => {
                let div = document.getElementById('experiences-feed');

                if(curPageLazyLoad == 1){
                    $('#experiences-feed').html('');
                    div.innerHTML = '<div class="row btn_exp_ques"><div class="col-12"> Experiencias </div><!--<div class="col-6"><a href="/#" > Responder </a></div>--></div>';
                }

                res.data.response.data.forEach(exp => {
                    let container = '<div class="row bg-white rounded-sm padding-top-10 margin-bottom-5"><div class="col-12"><div class="photo-profile"><svg width="36" height="36"><use xlink:href="/svg/sprite-icons.svg#profile"/></svg></div><div class="name-profile"><div style="width: 100%" class="line-height-20">'+exp['userFullName']+'</div><div style="width: 100%"><div class="country-col-exp"> '+exp['zone']+' </div> &nbsp; <svg width="17" height="17"><use xlink:href="/svg/sprite-icons.svg#level2"/></svg> </div></div><div class="cnt-btn-agregge-report float-right"><div class="agregge-friend"><a href="/#"><svg width="25" height="25"><use xlink:href="/svg/sprite-icons.svg#agregge-friend"/></svg></a></div><div class="report-spam" onclick="show_close_report_pop(\'id_poppup_report_2\')" id="list_option_report_2"><svg width="3" height="15"><use xlink:href="/svg/sprite-icons.svg#report-spam"/></svg></div><div class="actions_report_exp" id="id_poppup_report_2"><a href="/#"><svg width="22" height="16" class="icons-action-report-popup"><use xlink:href="/svg/sprite-icons.svg#icon-delete_user"/></svg><div class="msg_report"><span class="text-14"><b>Dejar de seguir usuario</b></span> <br><span class="text-12 text-muted">Dejarás de ver sus experiencias en tu muro y no recibirás notificaciones de sus publicaciones.</span></div></a><a href="/#"><svg width="22" height="16" class="icons-action-report-popup"><use xlink:href="/svg/sprite-icons.svg#icon-see_profile"/></svg><div class="msg_report"><span class="text-14"><b>Ver perfil</b></span> <br><span class="text-12 text-muted">Puedes ver su formación y empleos, también sus intereses, experiencias y niveles de interacción en Experendia.</span></div></a><a href="/#"><svg width="22" height="16" class="icon-report_content"><use xlink:href="/svg/sprite-icons.svg#icon-report_content"/></svg><div class="msg_report"><span class="text-14"><b>Reportar contenido</b></span> <br><span class="text-12 text-muted">Envíanos una alerta de todo contenido inapropiado y Experendia se encargará de solucionarlo.</span></div></a></div></div></div><div class="col-12 text-12"><!--<span class="text-muted">Experiencia •</span>--> <a href="/#" class="btn-tag-exp"> '+exp['rootTag']+' </a></div><div class="col-12  margin-top-15"><div class="line-height-20 text-18"><b><a href="/#" class="text-dark">'+exp['title']+'</a></b></div><a href="/#" class="btn-detail_img"><div class="float-left content-description-exp-img text-14"><div class="line-height-20 text-cut-points2"><div class="btn-read_more">...</div>'+exp['description']+'</div></div><div class="img-cont-exp text-center float-right"><img src="'+exp['image']+'" alt=""></div></a></div><div class="col-12"><span class="color-date-exp text-12">'+formatDate(exp['created_at'])+'</span><div class="float-right text-muted text-13"><div class="float-left" style="margin: 3px 0 0 0"><svg width="18" height="12" class="icon-view"><use xlink:href="/svg/sprite-icons.svg#icon-view"/></svg>'+exp['seen']+'</div><div class="btn-qualification-exp float-left"><a href="/#"><svg width="18" height="16" class="icon-qualification"><use xlink:href="/svg/sprite-icons.svg#icon-qualification"/></svg> 0</a></div><div class="btn-message-exp float-left"><a href="/#"><svg width="18" height="16" class="icon-message"><use xlink:href="/svg/sprite-icons.svg#icon-message"/></svg> 0</a></div></div></div></div>';
                    div.innerHTML += container;
                });
            })
            .catch(err => {
                console.log(err);
            });
}

function formatDate(date){
    return '9, Nov, 2020';
}