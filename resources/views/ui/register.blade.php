<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Experendia | Registro</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="/css/bootstrap.css">
  <link rel="stylesheet" href="/css/main.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>
<body class="bg2_page">
  <div class="bg-img-login">&nbsp;</div>
  <div class="cnt-div-login bg-white">
    <div style="margin: auto; width: 190px;height: 40px">
      <a href="/index.html">
        <svg viewBox="0 0 145 31">
          <use xlink:href="/svg/logo-top.svg#logo-top-login"/>
        </svg>
      </a>
    </div>
    <br>
    <div style="text-align:center; color: #343a40;"><b>Regístrate</b> <br> y se parte de nuestra comunidad</div>
    <br>

    <div style="margin: 20px 0 30px 0;">
      <div class="cnt-btn-with-rrss">
        <a style="cursor:pointer" class="btn btn-primary" href="{{ route('social.auth.facebook') }}">
          Ingresa con Facebook
        </a>
        <p></p>
        <a style="cursor:pointer" class="btn btn-danger" href="{{ route('social.auth.google') }}">
          Ingresa con Google
        </a>
        <div style="margin: 30px auto 10px;width: 250px;overflow: hidden;">
          <div class="float-left" style="width: 48%;margin: -3px 0 0 0"><hr></div>
          <div class="float-left" style="color: #b0b9be; font-weight: normal;"> o </div>
          <div class="float-left" style="width: 48%;margin: -3px 0 0 0"><hr></div>
        </div>
        <a onclick="OpenRegisterManual()" style="color: #718081; cursor: pointer; font-weight: normal;text-decoration: underline; margin: 0 0 50px 0;">Regístrate manualmente</a>
        <div id="register_manual" style="margin: 20px 0 0 0; display: none;" >
          <form id="registerForm" class="needs-validation" novalidate>
            <input type="hidden" name="isManualRegister" id="isManualRegister" value="1" />
            <input onkeydown="hideError('invalid-firstname')" type="text" class="form-control input_login" id="firstname" name="firstname" placeholder="Nombre" aria-describedby="inputGroupPrepend"  required>
              <div id="invalid-firstname" class="invalid-feedback">
                Por favor ingrese un nombre
              </div>

            <input onkeydown="hideError('invalid-lastname')" type="text" class="form-control input_login" id="lastname" name="lastname" placeholder="Apellido" aria-describedby="inputGroupPrepend"  required>
              <div id="invalid-lastname" class="invalid-feedback">
                Por favor ingrese un apellido
              </div>

            <select onchange="hideError('invalid-nationality')" id="nationality" name="nationality" class="form-control select_channel_exp icon-arrow-channel" required>
              <option value="">Nacionalidad</option>
            </select>
            <div id="invalid-nationality" class="invalid-feedback">
              Por favor ingrese un país
            </div>

            <input onkeydown="hideError('invalid-email', 'invalid-email-duplicated')" type="text" class="form-control input_login" id="email" name="email" placeholder="Correo electrónico" aria-describedby="inputGroupPrepend"  required>
              <div id="invalid-email" class="invalid-feedback">
                Por favor ingrese un email valido
              </div>
              <div id="invalid-email-duplicated" class="invalid-feedback">
                El email ingresado ya se encuentra registrado
              </div>

            <input onkeydown="hideError('invalid-password')" type="password" class="form-control input_login" name="password" id="password" placeholder="Contraseña" aria-describedby="inputGroupPrepend"  required>
            <svg onclick="passwordToggle()" class="icon-view" style="float: right;top: -54px;right:-5px;  position: relative; cursor:pointer;"><use xlink:href="/svg/sprite-icons.svg#icon-view"/></svg>
              <div id="invalid-password" class="invalid-feedback">
                Por favor ingrese una contraseña
              </div>

            <div class="margin-bottom-20" style="text-align: left; margin-top:45px">
              <span style="font-size:16px;"> <b>Intereses</b></span>
              <span class="text-muted text-12">(Temas que te interesan saber)</span>
            </div>
              
            <ul id="selectedInterest" style="margin: 0 0 30px 0"></ul>
            <input onkeyup="hideListOnSelect('interest')" onkeydown="showList('interest', 'interestList');hideListOnSelect('interest')" onchange="hideError('invalid-interest');hideListOnSelect('interest')" id="interest" name="interest" list="" type="text" style="margin: 0 0 14px 0" class="form-control input_login" id="validationCustomUsername" placeholder="Ej: Deportes, Jardinería, Ciencia, etc..." aria-describedby="inputGroupPrepend"  required>
              <datalist id="interestList"></datalist>
              <div id="invalid-interest" class="invalid-feedback">
                × Mínimo requerido: 3 intereses. Ingrese uno a la vez. 
              </div>
            <div class="btn_aggrege"> <a onclick="addInterest()" style="color:#22b37f;cursor:pointer;">Agregar</a> </div>

            <div class="margin-bottom-20" style="text-align: left; margin-top:45px">
              <span style="font-size:16px;"> <b>conocimientos</b></span>
              <span class="text-muted text-12">(Temas de los que sabes)</span>
            </div>

            <ul id="selectedKnowledges" style="margin: 0 0 30px 0"></ul>
            <input onkeyup="hideListOnSelect('knowledge')" onkeydown="showList('knowledge', 'knowledgeList');hideListOnSelect('knowledge')" onchange="hideError('invalid-knowledge');hideListOnSelect('knowledge')" id="knowledge" list="" type="text" class="form-control input_login" id="validationCustomUsername" placeholder="Ej: Nutrición, Carpintería, Salud, etc..." aria-describedby="inputGroupPrepend"  required>
            <datalist id="knowledgeList"></datalist>
            <div id="invalid-knowledge" class="invalid-feedback">
              × Mínimo requerido: 3 conocimientos. Ingrese uno a la vez. 
            </div>
            <div class="btn_aggrege"> <a onclick="addKnowledge()" style="color:#22b37f;cursor:pointer;">Agregar</a> </div>

            <div class="text-muted text-12 align-right-center" style="width: 100%;font-weight: normal;margin: 0 0 20px 0">
              Al registrarse acepto los <a href="#" class="btn-link">Términos y Condiciones</a>
            </div>
            <div style="overflow: hidden;">
              <div class="btn-publish"> <button onclick="register(event)">Regístrate</button> </div>
              <!--<div class="btn-cancel_clean">
                <a onclick="closeRegistermanual()">Cancelar</a>
              </div>-->

            </div>
            </div>
          </form>
        </div>
      </div>
      <div class="color-date-exp text-12" style="text-align: center;">© Experendia - 2019. Todos los derechos reservados.</div>
    </div>

  </div>

<script src="/js/jquery-3.3.1.slim.min.js"></script>
<script src="/js/popper.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/sections/register/register.js"></script>
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


<script>
  function OpenRegisterManual() {
    document.getElementById("register_manual").style.display = "block";
  }
  function closeRegistermanual() {
    document.getElementById("register_manual").style.display = "none";
  }
</script>

<script src="https://www.google.com/recaptcha/api.js?render=6Lct8M4ZAAAAABO3_1ARkjhif1-T7Jjyef0YdZ2K"></script>

</body>
</html>