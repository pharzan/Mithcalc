<?php
/**
 * Created by PhpStorm.
 * User: Farzan
 * Date: 9/4/2015
 * Time: 5:34 PM
 */

header("Access-Control-Allow-Origin: *");

include 'assets\lib\wa_wrapper\WolframAlphaEngine.php';
$response = 'Nothing here';
$appID    = 'API-CODE-GOES-HERE';
$qArgs    = array();
if (isset($_GET['str'])) {
    // echo json_encode($_GET['str']);
    $engine   = new WolframAlphaEngine($appID);
    $response = $engine->getResults($_GET['str'], $qArgs);

    $ans      = array();
    //echo json_encode($response);
    //the if to see if the request suceeded:
    if ($response->attributes['success']) {
        if (count($response->getPods()) > 0) {
            foreach ($response->getPods() as $pod) {

                array_push($ans, $pod->attributes['title']);
                // each pod can contain multiple sub pods but must have at least one
                foreach ($pod->getSubpods() as $subpod) {
                    // if format is an image, the subpod will contain a WAImage object
                    //echo '"'.$subpod->image->attributes['src'].'",';
                    array_push($ans, $subpod->image->attributes['src']);
                }
            }
        }
        echo (json_encode($ans));
        //echo '["Input","http:\/\/www4b.wolframalpha.com\/Calculate\/MSP\/MSP151iac346h8915gfg500001630h0249f5dci06?MSPStoreType=image\/gif&s=7","Result","http:\/\/www4b.wolframalpha.com\/Calculate\/MSP\/MSP161iac346h8915gfg5000040dah7b92616458h?MSPStoreType=image\/gif&s=7","Number name","http:\/\/www4b.wolframalpha.com\/Calculate\/MSP\/MSP171iac346h8915gfg500002dd1a8c158947igg?MSPStoreType=image\/gif&s=7","Visual representation","http:\/\/www4b.wolframalpha.com\/Calculate\/MSP\/MSP181iac346h8915gfg500004dc0e451abib9i2f?MSPStoreType=image\/gif&s=7","Number line","http:\/\/www4b.wolframalpha.com\/Calculate\/MSP\/MSP191iac346h8915gfg500000ff99bcb7h7bi59i?MSPStoreType=image\/gif&s=7","Illustration","http:\/\/www4b.wolframalpha.com\/Calculate\/MSP\/MSP201iac346h8915gfg500003fii278bae8d87cg?MSPStoreType=image\/gif&s=7"]';
    }

} else {
    echo json_encode($response);
}
