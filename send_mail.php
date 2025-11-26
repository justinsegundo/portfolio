<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = trim($_POST['name']);
  $email = trim($_POST['email']);
  $subject = trim($_POST['subject']);
  $message = trim($_POST['message']);

  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'justinian.segundo1@gmail.com';
    $mail->Password   = 'xnzb loac utur nlnh';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('justinian.segundo1@gmail.com', 'Portfolio Website');
    $mail->addReplyTo($email, $name);
    $mail->addAddress('justinian.segundo1@gmail.com');

    $mail->Subject = $subject ?: "New message from portfolio website";
    $mail->Body    = "Name: $name\nEmail: $email\n\n$message";

    $mail->send();
    echo 'success';
    } catch (Exception $e) {
     echo 'Error: ' . $mail->ErrorInfo;
    }
}
?>