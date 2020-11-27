<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/contact.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>
<body>
<!--*********************************** START HEADER ****************************************-->
  <div class="container-fluid bg-head">
    <header class="container">
      <div class="row" style="padding: 12px 0">
        <div class="col-6 col-sm-4 col-md-3 col-lg-3">
          <div class="div-logo">
            <a href="index.html">
              <svg width="100%" height="32">
                <use xlink:href="svg/logo-top.svg#logo-top"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="d-none d-sm-block col-sm-5 col-md-5"> <!--no borrar--> </div>
        <div class="col-3 col-sm-2 col-md-3 col-lg-2">&nbsp;</div>
        <div class="d-none d-lg-block col-lg-2 text-left cnt-btn-head" style="margin: 15px 0 0 0 "><a href="register.html">Regístrate</a> &nbsp; | &nbsp; <a href="login.html">Ingresa</a></div>
        <div class="col-1 d-sm-none text-muted">
          <!--<a href="#" onclick="openSearch()"><svg width="22" height="22" class="glass_search"><use xlink:href="svg/sprite-icons.svg#glass_search"/></svg></a>-->
        </div>

        <div id="myOverlay" class="overlay">
          <span class="closebtn" onclick="closeSearch()" title="Close Overlay">
            <svg width="11" height="16" class="close-win-search"><use xlink:href="svg/sprite-icons.svg#close-win-search"/></svg>
          </span>
          <div class="overlay-content">
            <form action="" action="resultado_busqueda_brands.html">
              <input type="search" placeholder="Escriba un Negocio o Marca...(no sitio web)">
            </form>
          </div>
        </div>

        <div class="col-2 col-sm-1 col-md-1 d-lg-none text-muted">
          <svg width="22" height="22" class="btn-burger" style="margin:19px 15px 0 0"><use xlink:href="svg/sprite-icons.svg#btn-burger"/></svg>
        </div>
      </div>

      <div class="display-btn-burger col-12 d-lg-none cnt-div-burger-head">
        <div class="row cnt-btn-register-mob">
          <div class="col-6" style="border-right:1px solid #E2E2E2">
            <a href="register.html">
              <div class="btn-register">
                <svg viewBox="1 -2 18 22" width="22" height="22" class="icon-register"><use xlink:href="svg/sprite-icons.svg#icon-register"/></svg>Regístrate
              </div>
            </a>
          </div>
          <div class="col-6" >
            <a href="login.html">
              <div class="btn-enter">
                <svg width="22" height="22" class="icon-enter"><use xlink:href="svg/sprite-icons.svg#icon-enter"/></svg>Ingresa
              </div>
              </a>
          </div>
        </div>

        <div class="row text-14 line-height-35">
          <div class="col-12 "> <a href="#" class="text-dark" style="width: 100%; display: inline-block;">Acerca de Experendia</a> </div>
          <div class="col-12 "> <a href="reputations_privileges.html" target="_blank" class="text-dark" style="width: 100%; display: inline-block;">Reputaciones y privilegios</a> </div>
          <div class="col-12 "> <a href="community_norms.html" target="_blank" class="text-dark" style="width: 100%; display: inline-block;">Normas de la comunidad</a> </div>
          <div class="col-12 "> <a href="#" class="text-dark" style="width: 100%; display: inline-block;">Contacto</a></div>
          <div class="col-12 border-bottom" style="margin: 10px 0"></div>
          <div class="col-12 "> <a href="terms_conditions.html" target="_blank" class="text-dark" style="width: 100%; display: inline-block;">Términos y condiciones</a></div>
          <div class="col-12 "> <a href="privacy_policies.html" target="_blank" class="text-dark" style="width: 100%; display: inline-block;">Política de privacidad</a></div>
        </div>
        <!--ICONOS RRSS-->
        <div class="row margin-top-30" style="width: 58%">
          <div class="col-3">
            <svg width="32" height="30" class="btns-rrss"><use xlink:href="svg/sprite-icons.svg#btn-facebook"/></svg>
          </div>
          <div class="col-3">
            <svg width="32" height="30" class="btns-rrss"><use xlink:href="svg/sprite-icons.svg#btn-twitter"/></svg>
          </div>
          <div class="col-3">
            <svg width="32" height="30" class="btns-rrss"><use xlink:href="svg/sprite-icons.svg#btn-linkedin"/></svg>
          </div>
          <div class="col-3">
            <svg width="32" height="30" class="btns-rrss"><use xlink:href="svg/sprite-icons.svg#btn-instagram"/></svg>
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
<!--********************************COMIENZA CONTENIDO***************************************-->
  <div class="container-fluid bg-body">
    <section class="container">
      <!-----------------------CONTENEDOR SEARCH BRAND---------------------------------------->
      <div class="row">
        <!---***************************** START CONTENT ************************************-->
        <article class="col-xs-12 col-md-6 padding_messages_send" style="margin: auto">
          <div class="cnt-div-login bg-white" style="text-align: center;">
            Restablece contraseña <br><br>

            <form id="resetPassForm" method="POST" action="/api/ui/updatePassword" class="needs-validation" novalidate="" style="overflow: hidden;">
              @csrf
              <input type="hidden" id="id" name="id" value="{{$id}}">
              <input type="hidden" id="remember_token" name="remember_token" value="{{$remember_token}}">
              <input onkeydown="hideError('invalid-feedback-password-1', 'invalid-feedback-password-2', 'invalid-feedback-password-3')" onclick="passwordToggle()" id="password" name="password" type="password" class="form-control input_login" placeholder="Contraseña" required="">
              <svg class="icon-view" style="float: right;top: -54px;right:-5px;  position: relative; cursor:pointer;"><use xlink:href="svg/sprite-icons.svg#icon-view"></use></svg>
              <input onkeydown="hideError('invalid-feedback-password-1', 'invalid-feedback-password-2', 'invalid-feedback-password-3')" onclick="passwordToggle('repassword')" id="repassword" name="repassword" type="password" type="text" class="form-control input_login" placeholder="Repetir Contraseña" required="">
              <div class="invalid-feedback" id="invalid-feedback-password-1">
                Debe completar ambos campos
              </div>
              <div class="invalid-feedback" id="invalid-feedback-password-2">
                Las contraseñas no coinciden
              </div>
              <div class="invalid-feedback" id="invalid-feedback-password-3">
                La contraseña debe contener al menso 6 caracteres y al menos 1 numero
              </div>             
              <svg class="icon-view" style="float: right;top: -54px;right:-5px;  position: relative; cursor:pointer;"><use xlink:href="svg/sprite-icons.svg#icon-view"></use></svg>
              <div class="btn-publish" style="clear: right;" onclick="sendForm()"><a style="color:  white; cursor: pointer;">Restablecer</a></div>
            </form>

          </div>
        </article>
        <!---****************************** START ASIDE**************************************-->
      </div>
    </section>
  </div>

  <footer class="row new_footer" style="margin:auto;padding: 20px 0;border-top: 1px solid #d9d9d9;">
    <div class="col-12 col-md-7 new_footer">
      <a href="#" class="text-muted text-14">Experendia</a>&nbsp; · &nbsp;<a href="#" class="text-muted text-14">Reputaciones y privilegios</a>&nbsp; · &nbsp;<a href="#" class="text-muted text-14">Normas de la comunidad</a>&nbsp; · &nbsp;<a href="#" class="text-muted text-14">Contacto</a>&nbsp; · &nbsp;<a href="#" class="text-muted text-14">Términos y condiciones</a>&nbsp; · &nbsp;<a href="#" class="text-muted text-14">Política de proivacidad</a>
      <br><br>
      <div class="row" style="margin: auto;width: 260px;text-align: center;">
        <div class="col-3">
          <a href="#"><svg width="32" height="30" fill="#869196" class="btns-rrss"><use xlink:href="svg/sprite-icons.svg#btn-facebook"></use></svg></a>
        </div>
        <div class="col-3">
          <a href="#"><svg width="32" height="30" fill="#869196" class="btns-rrss"><use xlink:href="svg/sprite-icons.svg#btn-twitter"></use></svg></a>
        </div>
        <div class="col-3">
          <a href="#"><svg width="32" height="30" fill="#869196" class="btns-rrss"><use xlink:href="svg/sprite-icons.svg#btn-linkedin"></use></svg></a>
        </div>
        <div class="col-3">
          <a href="#"><svg width="32" height="30" fill="#869196" class="btns-rrss"><use xlink:href="svg/sprite-icons.svg#btn-instagram"></use></svg></a>
        </div>
      </div>
      <div class="color-date-exp text-12" style="text-align: center;margin: 10px 0 0 0">© Experendia - 2019. Todos los derechos reservados.</div>
    </div>
  </footer>


<!--********************************* END CONTENT ******************************************-->
<!--<script src="js/jquery-3.3.1.slim.min.js"></script>-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="/js/sections/common/common.js"></script>
<script src="/js/sections/common/axios.min.js"></script>
<script src="/js/sections/reset_password/reset_password.js"></script>


<!---SCRIPT PARA DESPLEGAR: BTN BURGER Y REPORTAR USUARIO, EXPERENCIA-->
<script>
  $(document).ready(function(){
    $(".btn-burger").click(function(){
      $(".display-btn-burger").toggle();
    });
  });
</script>

<script>
  function show_themmes_li(id){
    if (document.getElementById){
      var el = document.getElementById(id);
      el.style.display = (el.style.display == 'none') ? 'block' : 'none';
    }
  }
  window.onload = function(){
    show_themmes_li('list_btns');
  }
  /*aca oculto al hacer click en cualquier parte*/
  $('html').click(function(e) {
    var container = $("#close_list_btns");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('#list_btns').hide();
    }
  });
</script>

</body>
</html>