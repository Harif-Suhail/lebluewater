<?php
	
	$name   =   trim($_POST['name']);	 
	$mail  =   trim($_POST['mail']);
	$phone    =   trim($_POST['phone']);
	$products   =   trim($_POST['products']);
  $quantity  =  trim($_POST['quantity']);

		


	$table =   "";
	$table.=   "Name  :     $name \r\n";
	$table.=   "Email :     $mail \r\n";
	$table.=   "Phone :     $phone \r\n";
  $table.=   "Products :  $products \r\n";
	$table.=   "Quantity :  $quantity";


   $to = "info@lebluewater.com";
   $subject = "Order from Le Blue Website";
   $message = $table;
    	
   $header = 'MIME-Version: 1.0' . "\r\n"; 	
   $header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
   $header = "From:www.lebluewater.com \r\n";
   $retval = mail ($to,$subject,$message,$header);
   if( $retval == true )  
   {
      echo "<script>alert('Order Send Successfully. Will contact you soon')</script>";
      echo "<script>window.location='index.html'</script>";
   }
   else
   {
     echo "<script>alert('Email Not send ,Please try later')</script>";
      echo "<script>window.location='index.html'</script>";
   }
?>