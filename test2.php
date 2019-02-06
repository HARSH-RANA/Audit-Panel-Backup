<?

include_once('/var/www/html/support/SafeCrypto.php');
$bs = 32;
function _pad($s){
	global $bs;
	return $s.str_repeat(chr($bs - strlen($s)), max(0, $bs - strlen($s)));
}

$passphrase = '92182736';
$text = "JRMCA4Xuh3";
$key = hash('sha256', $passphrase, true);
$raw = _pad($text);
$cipher = "AES-256-CBC";
$ivlen = openssl_cipher_iv_length($cipher);
$iv = openssl_random_pseudo_bytes($ivlen);
$ciphertext = base64_encode($iv.openssl_encrypt($text, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv));
echo $ciphertext."<br/>";

?>