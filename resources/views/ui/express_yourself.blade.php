<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Experendia | Publicar Experiencia</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="ckeditor/samples/css/samples.css">
  <link rel="stylesheet" href="ckeditor/contents.css">

  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/express.css">

  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">

  <style>
    .tag_circle {
      width: 100%;
      border: 1px solid #718081;
      border-radius: 18px;
      font-size: 16px;
      margin: 0 0 10px 0;
    }
    .tag_circle a {
      padding: 6px 12px;
      color: #718081;
      display: inline-block;
      width: 100%;
      text-decoration: none;
    }

    .delete-tag-m {
      font-size: 18px;
      height: 8px;
      float: right;
      margin: -2px 0 0 0;
      color: #718081;
      cursor:pointer;
    }

    #file-input {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    .ck-editor__editable_inline {
      min-height: 400px;
    }
  </style>
</head>
<body>
<!--*********************************** START HEADER ****************************************-->
  <!--<div class="container-fluid bg-head" style="border: 1px solid red; overflow: hidden;">
    <div class="glass_search sprite-icon "><a href="#" onclick="openSearchMiddle()">&nbsp;</a></div>
  </div>-->
<div class="container-fluid bg-head">
    <header class="container">
      <div class="row">
        <div class="col-6 col-sm-4 col-md-3 col-lg-3">
          <div class="div-logo d-none d-md-block">
            <a href="index.html">
              <svg width="100%" height="32">
                <use xlink:href="svg/logo-top.svg#logo-top"></use>
              </svg>
            </a>
          </div>
          <div class="d-md-none d-block" style="color: white;padding: 21px 20px;font-size: 18px">
            <a onclick="goBack()"><svg width="11" height="16"><use xlink:href="svg/sprite-icons.svg#close-po-up"></use></svg> </a> &nbsp; <b>Exprésate</b> 
          </div>
        </div>
        <div class="d-none d-sm-block col-sm-3 col-md-5"> <!--no borrar--> </div>
        <div class="col-3 col-sm-2 col-md-3 col-lg-2">&nbsp;</div>
        <div class="d-none d-lg-block col-lg-2 text-left cnt-btn-head"><a href="./register">Regístrate</a> &nbsp; | &nbsp; <a href="./login">Ingresa</a></div>
        <div class="col-1 d-sm-none text-muted">
          <!--<a href="#" onclick="openSearch()"><svg width="22" height="22" class="glass_search"><use xlink:href="svg/sprite-icons.svg#glass_search"/></svg></a>-->
        </div>
      <div class="row">
        <div class="col-12 text-muted" style="display: none"><input type="text"></div>
      </div>
    </header>
  </div>
<!--********************************COMIENZA CONTENIDO***************************************-->
  <div class="container-fluid bg-body">
    <section class="main_content">
      <span class="d-none d-md-block colour_gray">
        <b><a onclick="goBack()" style="cursor: pointer;"><svg width="11" height="16"><use xlink:href="svg/sprite-icons.svg#icon-back"/></svg> Exprésate </b> </span></a> <p></p>
      <div class="form-group">
        <form action="">
          <select onchange="hideError('invalid-channel')" id="channels" class="form-control-express select_channel_exp icon-arrow-channel" style="margin: 0 0 25px 0">
            <option disabled selected>Seleccione canal</option>
          </select>
          <br>
          <div id="invalid-channel" class="invalid-feedback">
            Por favor, seleccione un canal
          </div>
          <span class="float-left colour_gray" style="margin: 0 0 10px 10px"> Experiencia </span>
          <input onkeydown="hideError('invalid-title')" id="title" type="text" class="input_express" placeholder="Escriba el título" >
          <br><br>
          <div id="invalid-title" class="invalid-feedback">
            Por favor, ingrese un título
          </div>
          <div onclick="hideError('invalid-experienceBody')" style="border:0 ;box-shadow:0px 2px 4px 0px rgba(0, 0, 0, 0.12);position: relative;">
            <span id="hidden_leyend" style="font-size: 16px; color: #b0b2b4;position: absolute; top: 58px;overflow: hidden; left: 11px;width: 98%;height: 85% " onclick="hidden_leyend();">Exprese  una experiencia...</span>
            <div id="experienceBody"></div>
          </div>
          <br><br>
          <div id="invalid-experienceBody" class="invalid-feedback">
            Por favor, escriba una experiencia
          </div>

          <div id="upload_img" class="cnt_load_img">
            <div id="div_not_img_main">
              <div class="padding_select_img">
                <svg width="35" height="35" viewBox="0 0 35 35"><use xlink:href="svg/upload-image.svg#upload-image"/></svg></div>
              <div id="div_file">
                <span id="texto">Selecciona una imagen principal</span>
                <input onchange="mainImageUpload()" type="file" id="file-input">
              </div>
              <div class="text-12" style="width: 100%;text-align: center;color: #449AD8;margin: 20px 0 0 0;line-height: 14px">Seleccione una imagen de buena resolución, <br> calidad y que represnte la experiencia.</div>
            </div>
          </div>
          <br>
          <div id="invalid-file-input" class="invalid-feedback">
            Por favor, suba una imagen principal
          </div>

          <div id="uploaded_img" style="display:none" class="cnt-img_main" style="margin: 0 0 25px 0">
            <div style="width:100%;height:25px">
              <svg onclick="mainImageDelete()" style="cursor:pointer" width="30" height="30" class="float-right"><use xlink:href="svg/delete.svg#delete"/></svg>
            </div>
            <div class="img_main_big"><img id="image_selected" src="images/img_main.jpg" alt=""></div>
          </div>
          <span class="float-left colour_gray" style="margin: 0 0 10px 10px"> Video </span>
          <input id="video" type="text" class="input_express link_youtube" placeholder="Ingrese el link de video You Tube..." style="margin: 0 0 25px 0">

          <span class="float-left colour_gray" style="margin: 0 0 10px 10px"> Etiqueta </span>
          
          <input id="tag" onkeyup="hideListOnSelect('tag')" onkeydown="showList('tag', 'tagList');hideListOnSelect('tag')" list="" type="text" class="input_express font-input" placeholder="Ingrese una etiqueta..." >
          <datalist id="tagList"></datalist>
          <ul id="selectedTags" style="margin: 0 0 30px 0; list-style-type:none"></ul>
          <div id="invalid-tags" class="invalid-feedback">
            Por favor, ingrese al menos tres etiquetas
          </div>
          <div class="btn_aggrege"> <a onclick="addTag()" style="color:#22b37f; cursor:pointer">Agregar</a> </div>

          <div id="Open-div-registers" style="margin: 20px 0; text-align: center;padding: 20px 0;border: 1px solid #CDD2D2;background: white;display: none">
            <p style="margin: 0 0 30px 0;font-weight: bold;"> Regístrate o Ingresa </p>
            <div class="cnt-btn-with-rrss">
              <img src="images/btn1.jpg" alt=""><p></p>
              <img src="images/btn1.jpg" alt=""><p></p>
              <img src="images/btn1.jpg" alt=""><p></p>
              <div style="margin: 30px auto 10px;width: 250px;overflow: hidden;">
                <div class="float-left" style="width: 48%;margin: -3px 0 0 0"><hr></div>
                <div class="float-left" style="color: #b0b9be; font-weight: normal;"> o </div>
                <div class="float-left" style="width: 48%;margin: -3px 0 0 0"><hr></div>
              </div>
              <a onclick="OpenRegisterManual()" style="color: #869196; cursor: pointer; font-weight: normal;text-decoration: underline; margin: 0 0 30px 0">Regístrate manualmente</a>
              <div id="register_manual" style="margin: 20px 0 0 0; display: none;" >
                <form class="needs-validation" novalidate>
                  <input type="text" class="form-control input_login" id="validationCustomUsername" placeholder="Nombre" aria-describedby="inputGroupPrepend"  required>
                    <div class="invalid-feedback">
                      × Mínimo requerido: 3 palabras.
                    </div>

                  <input type="text" class="form-control input_login" id="validationCustomUsername" placeholder="Apellido" aria-describedby="inputGroupPrepend"  required>
                    <div class="invalid-feedback">
                      × Mínimo requerido: 3 palabras.
                    </div>

                  <select class="form-control input_login icon-arrow-country" required>
                    <option disabled selected>Nacionalidad</option>
                    <option>Argentina</option>
                    <option>Bolivia</option>
                    <option>Perú</option>
                  </select>

                  <input type="text" class="form-control input_login" id="validationCustomUsername" placeholder="Correo electrónico" aria-describedby="inputGroupPrepend"  required>
                    <div class="invalid-feedback">
                      No se ha encontrado cuenta para este correo. Vuelve a intentarlo o regístrate en Experendia. 
                    </div>

                  <input type="text" class="form-control input_login" id="validationCustomUsername" placeholder="Contraseña" aria-describedby="inputGroupPrepend"  required>
                    <div class="invalid-feedback">
                      Escribe tu dirección de correo y pulsa “Olvidaste tu contraseña”
                    </div>

          
                  <div class="col-12 text-right margin-top-15">
                    <img src="images/captcha.gif" alt=""><p></p>
                  </div>
                  <button class="btn-green">Continuar con Email</button>
                </form>
              </div>
            </div>
          </div>
        
        </form>
        <div class="cnt-btn-publish">
          <div class="text_terms_conditions text-muted" id="terms_conditions_publish">
            Al publicar acepto los <a href="#" class="btn-link">Términos y Condiciones</a> de Experendia.
          </div>
          <div class="btn-publish_comment_file"><a onclick="saveExperience()" style="color:  white; cursor: pointer;">Publicar</a></div>
          <!--<div class="btn-cancel_clean"> <a onclick="CloseRegisterRRSS()">Cancelar </a> </div>-->
        </div>

        <p></p>
        <div class="color-date-exp text-12" style="text-align: center;">© Experendia - 2019. Todos los derechos reservados.</div>
      </div>
    </section>
  </div>


<!--********************************* END CONTENT ******************************************-->
<script src="js/jquery-3.3.1.slim.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>

<script src="ckeditor/ckeditor.js"></script>

<script src="/js/sections/common/common.js"></script>
<script src="/js/sections/common/axios.min.js"></script>
<script src="/js/sections/experience/experience.js"></script>

<script>
  //initSample();
  localStorage.tempPath = makeid(100);

  ClassicEditor
    .create( document.querySelector('#experienceBody'), {
      ckfinder: {
        uploadUrl: '/api/ui/experiences/experience_body_image_upload?path='+localStorage.tempPath
      }
    })
    .then(newEditor => {
      editor = newEditor;
    })
    .catch();
</script>

<!--SCRIPT HIDDEN SPAM "EXPRESE UNA EXPERIENCIA..."-->
<script>
  function hidden_leyend(){
    document.getElementById("hidden_leyend").style.display="none";
  }
</script>


</body>
</html>
