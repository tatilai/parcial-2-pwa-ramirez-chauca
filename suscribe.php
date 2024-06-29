<?PHP
//inicializo variables con los datos que necesito traer de la superglobal
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] :'';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>
<body>
<h1>Resultado de los datos ingresados</h1>

<div class="row">
    <div class="col s12 m5">
      <div class="card-panel teal">
      <ul class="list-unstyled mx-3">
                <li class="white-text" style="font-weight:bold"> El  nombre es: <?=$nombre?> </li>
                <li class="white-text" style="font-weight:bold">  El correo electrónico  es: <?=$email?></li>
               </ul>
      </div>
    </div>
  </div>

</body>
</html>