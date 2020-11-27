<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="/css/bootstrap.css">
  <link rel="stylesheet" href="/css/main.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>
<body>
<!--*********************************** START HEADER ****************************************-->
  <!--<div class="container-fluid bg-head" style="border: 1px solid red; overflow: hidden;">
    <div class="glass_search sprite-icon "><a href="/#" onclick="openSearchMiddle()">&nbsp;</a></div>
  </div>-->
  <div class="container-fluid bg-head">
    <header class="container">
      <div class="row">
        <div class="col-6 col-sm-4 col-md-3 col-lg-3">
          <div class="div-logo">
            <a href="/index.html">
              <svg width="100%" height="32">
                <use xlink:href="/svg/logo-top.svg#logo-top"/>
              </svg>
            </a>
            <div class="dropdown">
              <button type="button" id="currentChannelSelected" class="btn btn-secondary dropdown-toggle btn-channel" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="channelOptions">
                
              </div>
            </div>
          </div>
        </div>
        <div class="d-none d-sm-block col-sm-5 col-md-5 cnt-search">
          <input type="text">
          <button>
            <a href="/resultado_busqueda.html"><svg width="21" height="18" class="glass_search"><use xlink:href="/svg/sprite-icons.svg#glass_search_desktop"/></svg></a>
          </button>
        </div>
        <div class="d-none d-lg-block col-lg-2  cnt-btn-head"><a href="./register">Regístrate</a> &nbsp; | &nbsp; <a href="./login">Ingresa</a></div>
        <div class="col-3 col-sm-2 col-md-3 col-lg-2"><a href="./publicar-experiencia" class="cnt-btn-publish">Exprésate</a></div>
        <div class="col-1 d-sm-none text-muted">
          <a href="/#" onclick="openSearch()"><svg width="22" height="22" class="glass_search"><use xlink:href="/svg/sprite-icons.svg#glass_search"/></svg></a>
        </div>

        <div id="myOverlay" class="overlay">
          <span class="closebtn" onclick="closeSearch()" title="Close Overlay">
            <svg width="11" height="16" class="close-win-search"><use xlink:href="/svg/sprite-icons.svg#close-win-search"/></svg>
          </span>
          <div class="overlay-content">
            <input type="search" placeholder="Buscar experiencias de...">
          </div>
        </div>

        <div class="col-2 col-sm-1 col-md-1 d-lg-none text-muted">
          <svg width="22" height="22" class="btn-burger"><use xlink:href="/svg/sprite-icons.svg#btn-burger"/></svg>
        </div>
      </div>

      <div class="display-btn-burger col-12 d-lg-none cnt-div-burger-head">
        <div class="row cnt-btn-register-mob">
          <div class="col-6" style="border-right:1px solid #E2E2E2">
            <a href="/register.html">
              <div class="btn-register">
                <svg viewBox="1 -2 18 22" width="22" height="22" class="icon-register"><use xlink:href="/svg/sprite-icons.svg#icon-register"/></svg>Regístrate
              </div>
            </a>
          </div>
          <div class="col-6" >
            <a href="/login.html">
              <div class="btn-enter">
                <svg width="22" height="22" class="icon-enter"><use xlink:href="/svg/sprite-icons.svg#icon-enter"/></svg>Ingresa
              </div>
              </a>
          </div>
        </div>

        <div class="row text-14 line-height-35">
          <div class="col-12 "> <a href="/#" class="text-dark" style="width: 100%; display: inline-block;">Acerca de Experendia</a> </div>
          <div class="col-12 "> <a href="/reputations_privileges.html" target="_blank" class="text-dark" style="width: 100%; display: inline-block;">Reputaciones y privilegios</a> </div>
          <div class="col-12 "> <a href="/community_norms.html" target="_blank" class="text-dark" style="width: 100%; display: inline-block;">Normas de la comunidad</a> </div>
          <div class="col-12 "> <a href="/#" class="text-dark" style="width: 100%; display: inline-block;">Contacto</a></div>
          <div class="col-12 border-bottom" style="margin: 10px 0"></div>
          <div class="col-12 "> <a href="/terms_conditions.html" target="_blank" class="text-dark" style="width: 100%; display: inline-block;">Términos y condiciones</a></div>
          <div class="col-12 "> <a href="/privacy_policies.html" target="_blank" class="text-dark" style="width: 100%; display: inline-block;">Política de privacidad</a></div>
        </div>
        <!--ICONOS RRSS-->
        <div class="row margin-top-30" style="width: 58%">
          <div class="col-3">
            <svg width="32" height="30" class="btns-rrss"><use xlink:href="/svg/sprite-icons.svg#btn-facebook"/></svg>
          </div>
          <div class="col-3">
            <svg width="32" height="30" class="btns-rrss"><use xlink:href="/svg/sprite-icons.svg#btn-twitter"/></svg>
          </div>
          <div class="col-3">
            <svg width="32" height="30" class="btns-rrss"><use xlink:href="/svg/sprite-icons.svg#btn-linkedin"/></svg>
          </div>
          <div class="col-3">
            <svg width="32" height="30" class="btns-rrss"><use xlink:href="/svg/sprite-icons.svg#btn-instagram"/></svg>
          </div>
        </div>
        <!---COPYRIGHT-->
         <div class="row margin-top-30">
          <div class="col-12 line-height-20 text-12 color-date-exp"> © Experendia - 2019. <br> Todos los derechos reservados.</div>
        </div>
      </div>


      <div class="row">
        <div class="col-12 text-muted" style="display: none"><input type="text"></div>
      </div>
    </header>
  </div>
<!--******************************** START BANNER HEAD **************************************-->
    <div id="hidden_banner" class="container-fluid" style="border-bottom: 1px solid #e9ecec">
      
    </div>
<!--********************************COMIENZA CONTENIDO***************************************-->
  <div class="container-fluid bg-body">
    <section class="container padding-top-30">
      <div class="row">
        <!---****************************** START LEFT **************************************-->
        <nav class="col-12 col-lg-3">
          <div class="cnt-themmes_featured">
            <div class="row">
              <div class="col-12 title_themmes_featured" style="margin: 0 0 20px 0"> Temas detacados </div>
            </div>
            <ul class="btn-scroll" id="top-ten-tags">
              
            </ul>

            <div class="col-12 d-none d-lg-block">
              <div class="row">
                <div class="col-12 title_themmes_featured"> Acerca de </div>
              </div>
              <div class="row text-14 line-height-25">
                <div class="col-12 text-muted"> · <a href="/#" class="text-muted">Experendia</a> </div>
                <div class="col-12 text-muted"> · <a href="/reputations_privileges.html" target="_blank" class="text-muted">Reputaciones y privilegios</a> </div>
                <div class="col-12 text-muted"> · <a href="/community_norms.html" target="_blank" class="text-muted">Normas de la comunidad</a> </div>
                <div class="col-12 text-muted"> · <a href="/#" class="text-muted">Contacto</a></div>
                <div class="col-12  text-muted border-bottom" style="margin: 10px 0"></div>
                <div class="col-12 text-muted"> · <a href="/terms_conditions.html" target="_blank" class="text-muted">Términos y condiciones</a></div>
                <div class="col-12 text-muted"> · <a href="/privacy_policies.html" target="_blank" class="text-muted">Política de proivacidad</a></div>
              </div>
              <!--ICONOS RRSS-->
              <div class="row margin-top-30">
                <div class="col-3">
                  <a href="/#"><svg width="32" height="30" class="btns-rrss"><use xlink:href="/svg/sprite-icons.svg#btn-facebook"/></svg></a>
                </div>
                <div class="col-3">
                  <a href="/#"><svg width="32" height="30" class="btns-rrss"><use xlink:href="/svg/sprite-icons.svg#btn-twitter"/></svg></a>
                </div>
                <div class="col-3">
                  <a href="/#"><svg width="32" height="30" class="btns-rrss"><use xlink:href="/svg/sprite-icons.svg#btn-linkedin"/></svg></a>
                </div>
                <div class="col-3">
                  <a href="/#"><svg width="32" height="30" class="btns-rrss"><use xlink:href="/svg/sprite-icons.svg#btn-instagram"/></svg></a>
                </div>
              </div>
              <!---COPYRIGHT-->
               <div class="row margin-top-30">
                <div class="col-12 line-height-20 text-12 color-date-exp"> © Experendia - 2019. <br> Todos los derechos reservados.</div>
              </div>
            </div>
          </div>
        </nav>
        <!---***************************** START CONTENT ************************************-->
        <article class="col-xs-12 col-md-7 col-lg-5" id="experiences-feed">
          
        </article>
        <!---****************************** START ASIDE**************************************-->
        <aside class="col-xs-12  col-md-5  col-lg-4">
          <div class="cnt-col-aside">
            <div class="banner-aside">
              <span class="text-success text-title-banner">  Exprésa tu experiencia! </span><br>  Comienza sumando puntos y se parte de nuestra comunidad, como...<br><br>
              <svg style="width:302.99px; height:154.74px"><use xlink:href="/svg/user_founder_banner.svg#user_founder_banner"/></svg>
              <a href="/resultado_busqueda.html" class="btn btn-success btn-banner-r">Exprésate</a>
            </div>
            <br><br>
            <div class="title_themmes_featured d-none d-md-block d-lg-block"> Experiencias destacadas </div>

            <div class="cnt-expendia-featured d-none d-md-block d-lg-block" id="top-five-experiences">
              
            </div>

          </div>
        </aside>
      </div>
    </section>
  </div>
  <input type="hidden" id="channelId" value="{{$channelId}}"/>
  <input type="hidden" id="channelName" value="{{$channelName}}"/>
  <input type="hidden" id="tagId" value="{{$tag}}"/>


<!--********************************* END CONTENT ******************************************-->
<!--<script src="/js/jquery-3.3.1.slim.min.js"></script>-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="/js/popper.min.js"></script>
<script src="/js/bootstrap.min.js"></script>

<script src="/js/sections/common/common.js"></script>
<script src="/js/sections/common/axios.min.js"></script>
<script src="/js/sections/home/home.js"></script>

<!---SCRIPT PARA CERRAR BANNER HEAD-->
<script>
  function hidden_banner(){
    document.getElementById("hidden_banner").style.display="none";
  }
</script>
<!---SCRIPT PARA DESPLEGAR: BTN BURGER Y REPORTAR USUARIO, EXPERENCIA-->
<script>
  $(document).ready(function(){
    $(".btn-burger").click(function(){
      $(".display-btn-burger").toggle();
    });
  });
</script>
<!---SCRIPT PARA FORM SEARCH MOBILE-->
<script>
  // Open the full screen search box
  function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
  }
  // Close the full screen search box
  function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
  }
   // Open the full screen search box
  function openSearchMiddle() {
    document.getElementById("myOverlayMiddle").style.display = "block";
  }
  // Close the full screen search box
  function closeSearchMiddle() {
    document.getElementById("myOverlayMiddle").style.display = "none";
  }
</script>

<!--SCRIPT PARA POPUP VENTANA DE REPORTE 3 PUNTITOS-->
<script>
  function show_close_report_pop(id){
    if (document.getElementById){
      var el = document.getElementById(id);
      el.style.display = (el.style.display == 'none') ? 'block' : 'none';
    }
  }
  window.onload = function(){
    show_close_report_pop('id_poppup_report_1');
  }
  window.onload = function(){
    show_close_report_pop('id_poppup_report_2');
  }
</script>
<script>
  $('html').click(function(e) {
    var container = $("#list_option_report_1");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('#id_poppup_report_1').hide();
    }

    var container = $("#list_option_report_2");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('#id_poppup_report_2').hide();
    }

  });
</script>

</body>
</html>