<?php
 function api_notice_increment($url, $data)
{
    $ch = curl_init();        
    curl_setopt($ch, CURLOPT_HEADER,0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    $data = http_build_query($data);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    $result =  curl_exec($ch);
//    $lst['rst'] = curl_exec($ch);
//    $lst['info'] = curl_getinfo($ch);
    curl_close($ch); 
    return $result;
}
if($_POST){
	echo json_encode(array('status'=>'1'));
	//print_r($_POST);
}else{
	define('HASH_KEY', 'fromai');
	$comp_id = '121212121212112';
	$cmc_id = '22222222222222222222';
	$ans_key = md5($comp_id.HASH_KEY);
	$url = "http://127.0.0.1:3000/crontab/test";
    $data = array (
    	  'comp_id'  =>$comp_id,
    	  'ans_key'=>$ans_key,
    	  'cmc_id' =>$cmc_id,
    	  'cron_time'=>'{"2014/08/13":{"28800":"43200","46800":"64800"},"2014/08/14":{"28800":"43200","46800":"64800"},"2014/08/15":{"28800":"64800"}}'
	);
//	print_r($data);    
	print_r(api_notice_increment($url,$data));

}


//{"2014-08-13":{"28800":"43200","46800":"64800"},"2014-08-14":{"28800":"43200","46800":"64800"},"2014-08-15":{"28800":"64800"}}
