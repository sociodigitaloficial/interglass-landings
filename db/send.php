<?php

// ---------------------------------------- VARIABLES
	
	$nombre = $_POST["form-name"];
	$correo = $_POST["form-email"];
	$whatsapp = $_POST["form-whatsapp"];
	$mensaje = $_POST["form-message"];
	$servicio = $_POST["form-service"];
	
	date_default_timezone_set('America/Santiago');
	$fecha=date("Y-m-d H:i:s");

// ---------------------------------------- BASE DE DATOS

    $server = "localhost";
    $user = "sociodig_user_interglass";
    $password ="S+IA?q3kZs[0";
    $database = "sociodig_interglass";
    
    $conexion = new mysqli($server, $user, $password, $database);
    
    if($conexion -> connect_errno){
        echo "No conectado";
    }else{
        mysqli_query($conexion, "INSERT INTO contactos VALUES('$nombre','$correo','$whatsapp','$mensaje','$fecha','$servicio')");
    }
    
// ---------------------------------------- MAILS

    use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;
	
	require 'PHPMailer/PHPMailer.php';
	require 'PHPMailer/SMTP.php';
	require 'PHPMailer/Exception.php';
	
// >>> Cliente Interno
	
	$mail = new PHPMailer(true);
	
	try {

    $mail->SMTPDebug = 0;                      
    $mail->isSMTP();
    $mail->Host       = 'blue107.dnsmisitio.net';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'notificaciones@sociodigital.cl';
    $mail->Password   = '5!mE_SCs*s.d';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;   
	$mail->CharSet = 'UTF-8';
		
	$mail->setFrom('notificaciones@sociodigital.cl', 'Socio Digital');
    $mail->addAddress('contacto@interglass.cl');
    $mail->addAddress('spizarro@sociodigital.cl');
	
	$mail->isHTML(true);
    $mail->Subject = 'Interglass has recibido un NUEVO CONTACTO';
	
$message = '<html><body>';
	$message .= "<p>Hola Interglass, gracias a la campaña de publicidad digital que actualmente tienes online has recibido un nuevo contacto interesado en tus servicios:</p>";
	$message .= '<table rules="all" border="1" style="border-color: #666;" cellpadding="10">';
	$message .= "<tr style='background: #eee;'><td><strong>Nombre:</strong> </td><td>" . strip_tags($nombre) . "</td></tr>";
	$message .= "<tr><td><strong>Email:</strong> </td><td>" . strip_tags($correo) . "</td></tr>";
	$message .= "<tr><td><strong>Whatsapp:</strong> </td><td>" . strip_tags($whatsapp) . "</td></tr>";
	$message .= "<tr><td><strong>Servicio:</strong> </td><td>" . strip_tags($servicio) . "</td></tr>";
	$message .= "<tr><td><strong>¿En qué podemos ayudarte?:</strong> </td><td>" . strip_tags($mensaje) . "</td></tr>";
	$message .= "<tr><td><strong>Fecha:</strong> </td><td>" . strip_tags($fecha) . "</td></tr>";
	$message .= "</table>";
	$message .= "<p>Recomendaciones para hacer más exitosa la gestión de los nuevos contactos:</p>";
	$message .= "<ul>";
	$message .= "<li>Llama a los  contactos tan rápido como sea posible.</li>";
	$message .= "<li>Siempre prefiere la llamada telefónica antes que un correo o whatsapp (a menos que no haya otra opción).</li>";
	$message .= "<li>Utiliza un CRM para gestionar mejor tus contactos.</li>";
	$message .= "<li>Utiliza correos corporativos de G-Suite antes que los gratuitos de hosting.</li>";
	$message .= "<li>Si presionas responder a este mail estarás respondiendo a tu potencial cliente automáticamente.</li>";
	$message .= "<li>Revisa constantemente tu bandeja de spam, hay ocaciones en que las notificaciones de nuevos contactos caeran ahí.</li>";
	$message .= "<li>Si este correo cayó en la bandeja de spam o aparece como no seguro, debes marcarlo como no es spam o como correo seguro, así las notificaciones llegarán a tu bandeja principal constantemente.</li>";
	$message .= "<li>Si encuentras un error o sientes que algo no está funcionando con la campaña publicitaria debes dar aviso inmediatamente.</li>";
	$message .= "</ul>";
	$message .= "</body></html>";
	
	$mail->Body    = $message;
	
	$mail->send();
    
    } catch (Exception $e) {
    echo "Mail NO enviado";
    }
	
// >>> Cliente Externo	

    $mail2 = new PHPMailer(true);
    
    try {

    $mail2->SMTPDebug = 0;                      
    $mail2->isSMTP();
    $mail2->Host       = 'blue107.dnsmisitio.net';
    $mail2->SMTPAuth   = true;
    $mail2->Username   = 'notificaciones@interglass.cl';
    $mail2->Password   = 'v_UK,0}&{,0T';
    $mail2->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail2->Port       = 465;   
	$mail2->CharSet = 'UTF-8';
		
	$mail2->setFrom('notificaciones@interglass.cl', 'Interglass');
    $mail2->addAddress($correo);
    $mail2->addReplyTo('contacto@interglass.cl');
	
	$mail2->isHTML(true);
    $mail2->Subject = 'Hemos recibido tu solicitud exitosamente';
	
	$message = '<html><body>';
	$message .= "<p>Hola " . strip_tags($nombre) . ", gracias por confiar en nosotros y haber mandado tu mensaje, durante la jornada nos contactaremos contigo para responder tu solicitud de la mejor manera posible y con toda la información pertinente. ¡Hablamos pronto!.</p>";

	$message .= "<p>Si deseas contactar inmediatamente con nosotros, dispones de los siguientes métodos de comunicación:</p>";
	$message .= "<ul>";
	$message .= "<li>Llámanos o escríbenos un whatsapp al número +56946115930.</li>";
	$message .= "<li>Envíanos un correo directamente a contacto@interglass.cl o respondiendo este mail.</li>";
	$message .= "</ul>";
	
	$message .= "<p>Ante cualquier duda o consulta estaremos atentos. ¡Saludos!.</p>";
	
	$message .= "</body></html>";
	
	$mail2->Body    = $message;
	
	$mail2->send();
    
    } catch (Exception $e) {
    echo "Mail NO enviado";
    }
?>