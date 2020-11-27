<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Experendia | Login </title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/main.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>
<body class="bg2_page">
  <div class="bg-img-login">&nbsp;</div>
  <div class="cnt-div-login bg-white">
    <div style="margin: auto; width: 190px;height: 40px">
      <a href="index.html">
        <svg viewBox="0 0 145 31">
          <use xlink:href="svg/logo-top.svg#logo-top-login"/>
        </svg>
      </a>
    </div>
    <br>
    <div style="text-align:center; color: #3B4244;font-weight: bold">Ingresa</div>
    <br>
    
    <div style="margin: 0px 0 10px 0;">
      <div class="cnt-btn-with-rrss">
      <a style="cursor:pointer" class="btn btn-primary" href="{{ route('social.auth.facebook') }}">
        Ingresa con Facebook
      </a>
      <p></p>
      <a style="cursor:pointer" class="btn btn-danger" href="{{ route('social.auth.google') }}">
        Ingresa con Google
      </a>
        <div style="margin: 30px  auto 0px;width: 250px;overflow: hidden;">
          <div class="float-left" style="width: 48%;margin: -3px 0 0 0"><hr></div>
          <div class="float-left" style="color: #b0b9be; font-weight: normal;"> o </div>
          <div class="float-left" style="width: 48%;margin: -3px 0 0 0"><hr></div>
        </div>
      </div>
    </div>

    <form class="needs-validation" novalidate style="padding: 0 10px">
      <input id="email" onkeydown="hideError('invalid-feedback-email-1', 'invalid-feedback-credentials', 'invalid-feedback-email-2')" type="text" class="form-control input_login" id="validationCustomUsername" placeholder="Correo electrónico" aria-describedby="inputGroupPrepend"  required>
        <div class="invalid-feedback" id="invalid-feedback-email-1">
          Por favor ingresa un email válido
        </div>
        <div class="invalid-feedback" id="invalid-feedback-email-2">
          El email ingresado no existe en Experendia, vuelve a intentarlo ó Registrate
        </div>
      <input id="password" onkeydown="hideError('invalid-feedback-password')" type="password" class="form-control input_login" id="validationCustomPass" placeholder="Contraseña" aria-describedby="inputGroupPrepend"  required>
      <svg onclick="passwordToggle()" class="icon-view" style="float: right;top: -54px;right:-5px;  position: relative; cursor:pointer;"><use xlink:href="svg/sprite-icons.svg#icon-view"/></svg>
        <div class="invalid-feedback" id="invalid-feedback-password">
          Por favor ingrese una contraseña
        </div>
        <div class="invalid-feedback" id="invalid-feedback-credentials">
          Los datos ingresados son incorrectos
        </div>
      <div class="float-right text-12" style="width: 100%;text-align: right; margin: -20px 0 38px 0"><a href="#" class="text-muted" onclick="forgetPassword()" >Olvidaste tu contraseña</a></div>
      
      <div style="overflow: hidden;margin: 20px 0 0 0">
        <div class="btn-publish" ><a style="color:  white; cursor: pointer;" onclick="login()">Ingresar</a></div>
      </div>

      <div style="overflow: hidden;margin: 20px 0 0 0">
        <div class="btn-publish " ><a style="color:  white; cursor: pointer;" onclick="login()">Ingresar</a></div>
      </div>
    </form>
    
    <div class="color-date-exp text-12" style="text-align: center;margin: 30px 0 0 0">© Experendia - 2019. Todos los derechos reservados.</div>
  </div>

  <script src="js/jquery-3.3.1.slim.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="/js/sections/login/login.js"></script>
  <script src="/js/sections/common/common.js"></script>
  <script src="/js/sections/common/axios.min.js"></script>
  <!---script para validar login-->
  <script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
</script>
<script src="https://www.google.com/recaptcha/api.js?render=6Lct8M4ZAAAAABO3_1ARkjhif1-T7Jjyef0YdZ2K"></script>

</body>
</html>