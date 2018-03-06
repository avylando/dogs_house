<?php
/**
 * This example shows settings to use when sending via Google's Gmail servers.
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require '../PHPMailerAutoload.php';

$name = $_POST['name'];
$surname = $_POST['surname'];
// $phone = $_GET['phone'];
$email = $_POST['email'];
$upload = $_POST['upload'];


//Create a new PHPMailer instance
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 0;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'smtp.mail.ru';
// use
// $mail->Host = gethostbyname('smtp.mail.ru');
// if your network does not support SMTP over IPv6

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 465;

//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'ssl';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "roadtoawe@mail.ru";

//Password to use for SMTP authentication
$mail->Password = "supernatural123";

//Set who the message is to be sent from
$mail->setFrom('roadtoawe@mail.ru', 'First Last');

//Set an alternative reply-to address
$mail->addReplyTo('replyto@example.com', 'First Last');

//Set who the message is to be sent to
$mail->addAddress('anatoldd@list.ru', 'John Doe');

//Set the subject line
$mail->Subject = 'Заявка с тестового сайта';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
// $mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));

//Replace the plain text body with one created manually
$mail->Body = 'Привет! ' .$name. '&nbsp;' .$surname. ' оставил заявку! Его почта: ' .$email. ' телефон: ' .$phone;

//Attach an image file
$mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);

//send the message, check for errors
if (!$mail->send()) {
   echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}

