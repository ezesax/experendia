<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/contact.css">
  <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
</head>
<body>
  
<!--********************************START CONTENT***************************************-->
  <div class="container-fluid bg-body">
    <section class="container">
      <div class="row">
        <article class="col-xs-12 col-md-6 padding_messages_send" style="margin: auto">
          <div class="cnt_main_contact" style="text-align: center;">
            <div style="margin:auto">
             <img src="images/mail.gif" width="143px" height="78px" alt="">
            </div>
            <b style="font-size:24px; line-height:60px;"">¡Solo un paso más!</b>
            <span style="font-size: 14px;display: block;">
              Haz click en el boton para verificar tu cuenta de correo electrónico
            </span>
            <br>
          </div>
          <div style="margin:40px 15px; overflow: hidden;">
            <div class="btn-publish" style="float:none"><a href="{{ $urlConfirm }}" style="color:  white; cursor: pointer;"> Verificar Email </a></div>
          </div>
        </article>
      </div>
    </section>
  </div>


<!--********************************* END CONTENT ******************************************-->

</body>
</html>