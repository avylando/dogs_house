<?php
/**
 * This example shows settings to use when sending via Google's Gmail servers.
 */

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

require 'PHPMailerAutoload.php';

$name = $_POST['name'];
$surname = $_POST['surname'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$additionally = $_POST['additionally'];

// Принимаем UTM-метки

$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_campaign = $_POST['utm_campaign'];
$utm_content = $_POST['utm_content'];
$utm_term = $_POST['utm_term'];


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
$mail->setFrom('roadtoawe@mail.ru', 'SiteBot');

//Set an alternative reply-to address
$mail->addReplyTo('replyto@example.com', 'First Last');

//Set who the message is to be sent to
$mail->addAddress('avylando@gmail.com', 'Anatoly Dolgov');

//Set the subject line
$mail->Subject = 'Заявка из портфолио';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
// $mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));

//Replace the plain text body with one created manually
$mail->Body = "Привет! " .$name. " " .$surname. " оставил заявку!
<br>Его почта: " .$email. " телефон: " .$phone.
"<br>Дополнительная информация: " .$additionally.
// "<br><br>Пользователь пришел из: " .$utm_source.
// "<br>Тип трафика: " .$utm_medium.
// "<br>Название кампании: " .$utm_campaign.
// "<br>Идентификатор объявления: " .$utm_content.
// "<br>Ключевое слово: " .$utm_term;

//Attach an image file
$mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);

//Set email format to HTML
$mail->isHTML(true);

//send the message, check for errors
if (!$mail->send()) {
   echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}

// Telegram-бот

/* https://api.telegram.org/bot454235322:AAGdoQuXnC5ZvZgG0Mu_2aC7XoP0rVrwAok/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$token = "454235322:AAGdoQuXnC5ZvZgG0Mu_2aC7XoP0rVrwAok";
$chat_id = "-295872599";
$arr = array(
  "Имя пользователя: " => $name,
  "Фамилия:" => $surname,
  "Телефон: " => $phone,
  "Email: " => $email,
  "Дополнительно: " => $additionally
  // "Пользователь пришел из: " => $utm_source,
  // "Тип трафика: " => $utm_medium,
  // "Название кампании: " => $utm_campaign,
  // "Идентификатор объявления: " => $utm_content,
  // "Ключевое слово: " => $utm_term
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo "Message sent!";
} else {
  echo "Error";
}
