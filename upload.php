<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
if($_SERVER['REQUEST_METHOD']==='OPTIONS'){http_response_code(200);exit;}
if($_SERVER['REQUEST_METHOD']!=='POST'){echo json_encode(['ok'=>false,'error'=>'POST only']);exit;}

$to='kontakt@reusing-factory.de';
$subject=isset($_POST['subject'])?$_POST['subject']:'Website-Anfrage';
$boundary='----=_Part_'.md5(time());

// Build text body from all POST fields except subject and files
$body='';
foreach($_POST as $k=>$v){
  if($k==='subject')continue;
  $body.=$k.': '.$v."\n";
}

// Build MIME message
$headers="From: noreply@reusing-factory.de\r\n";
$headers.="Reply-To: ".(isset($_POST['Email'])?$_POST['Email']:(isset($_POST['Kunden-Email'])?$_POST['Kunden-Email']:'noreply@reusing-factory.de'))."\r\n";
$headers.="MIME-Version: 1.0\r\n";
$headers.="Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$msg="--$boundary\r\n";
$msg.="Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$msg.=$body."\r\n";

// Attach uploaded files
if(!empty($_FILES['photos'])){
  $files=$_FILES['photos'];
  $count=is_array($files['name'])?count($files['name']):1;
  for($i=0;$i<$count;$i++){
    $name=is_array($files['name'])?$files['name'][$i]:$files['name'];
    $tmp=is_array($files['tmp_name'])?$files['tmp_name'][$i]:$files['tmp_name'];
    $err=is_array($files['error'])?$files['error'][$i]:$files['error'];
    if($err!==UPLOAD_ERR_OK)continue;
    $size=filesize($tmp);
    if($size>10*1024*1024)continue; // max 10MB per file
    $data=chunk_split(base64_encode(file_get_contents($tmp)));
    $mime=mime_content_type($tmp)?:'application/octet-stream';
    $msg.="--$boundary\r\n";
    $msg.="Content-Type: $mime; name=\"$name\"\r\n";
    $msg.="Content-Transfer-Encoding: base64\r\n";
    $msg.="Content-Disposition: attachment; filename=\"$name\"\r\n\r\n";
    $msg.=$data."\r\n";
  }
}

$msg.="--$boundary--\r\n";

$ok=mail($to,$subject,$msg,$headers);
echo json_encode(['ok'=>$ok]);
