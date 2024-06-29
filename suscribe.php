<?PHP
//inicializo variables con los datos que necesito traer de la superglobal
echo "<pre>";
print_r($_POST);
echo "</pre>"; 


$nombre = $_POST['nombre'];
$email=$_POST['email'];




function soloLetras($str){
    return preg_match('/^([^0-9]*)$/', $str) and preg_match('/^[a-zA-Z0-9]{4,10}$/', $str);
}

if (!(soloLetras($name))){
    
    echo("<div>
            <h2>Ooops</h2>
            <p>El campo nombre  no puede contener número o caracteres especiales.</p>
        </div>");

}

if ((isset($name) and !empty(trim($name))) and
    (isset($email) and !empty(trim($email))) and
    (soloLetras($name))

) {
    echo "<pre>";
    print_r("<div>
            <h2>Muchas gracias por tu mensaje!</h2>
                <p>Te contactaremos a la brevedad.</p>
    
                <h3>Estos son los datos que nos enviaste:</h3>
                <ul>
                    <li><p>Nombre: $name </p></li>
                    <li><p>Email: $email </p></li>
               </ul>
         </div>");
    echo "</pre>";
    
}


