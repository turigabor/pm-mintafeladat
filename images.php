<?php
header('Content-Type: text/plain; charset=UTF-8');
if (empty($_REQUEST{'q'})) {
    die('[]');
}
$username = '<your-username>';
$key = '<your-key>';
$q = urlencode($_REQUEST{'q'});
$url = 'http://pixabay.com/api/?username=' . $username . '&key=' . $key. '&q=' . $q . '&image_type=photo';
$data = json_decode(file_get_contents($url), true);
$result = array();
foreach ($data{'hits'} as $image) {
    $result[] = array(
        'id' => $image{'id'},
        'url' => $image{'previewURL'},
        'width' => $image{'previewWidth'},
        'height' => $image{'previewHeight'}
    );
}
echo json_encode($result);