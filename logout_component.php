<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
header("Access-Control-Allow-Credentials: true");

try {
    $_SESSION = array();

    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }

    session_destroy();

    http_response_code(200);
    echo json_encode(array(
        'ok' => true,
        'message' => 'Successfully logged out'
    ));
} catch (Exception $e) {

    http_response_code(500);
    echo json_encode(array(
        'ok' => false,
        'message' => 'Error during logout: ' . $e->getMessage()
    ));
}
?>