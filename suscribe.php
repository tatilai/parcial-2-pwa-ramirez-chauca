<?PHP
//inicializo variables con los datos que necesito traer de la superglobal
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] :'';

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <!-- Compiled and minified CSS materialize-->
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <!--materilize icons-->
    <link  href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--boostsrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <!--css-->
    <link rel="stylesheet" href="style.css">
    <!--Font-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
    <title>envio de datos por POST</title>

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

  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

</body>
</html>