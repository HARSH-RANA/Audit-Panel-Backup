<?
class SafeCrypto{
	private static $salt = '';
	
	private static $default_salt = '92182736';	
	public function safeEncrypt($message=''){
		$iv = mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128 , MCRYPT_MODE_CBC), MCRYPT_DEV_URANDOM);
		return base64_encode( $iv . mcrypt_encrypt( MCRYPT_RIJNDAEL_128 , hash('sha256', self::$salt, true), utf8_encode($message), MCRYPT_MODE_CBC, $iv ) );
	}
	
	public function safeDecrypt($encrypted_message=''){
		$data = base64_decode($encrypted_message);
		$iv = substr($data, 0, mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128 , MCRYPT_MODE_CBC));
		try{
		return rtrim( mcrypt_decrypt( MCRYPT_RIJNDAEL_128 , hash('sha256', self::$salt, true), substr($data, mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128 , MCRYPT_MODE_CBC)), 		MCRYPT_MODE_CBC, $iv ), "\0" ); 	
		}catch(Exception $enex){
			return "";
		}
	}
	
	public function __construct($key=null){
		self::$salt = ($key==null)? $default_salt: $key;
	}
	
	public function __destruct(){
		self::$salt = null;
	}	
}
?>