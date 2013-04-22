<?php
    header('Content-type: text/html; charset=utf-8');

    $promo_vars = '{"elementSelector": "img", "animation": "slide", "duration": 0.5, "interval": 5000}';
    $menu_vars = '{"elementSelector": "> div", "animation": "slide", "duration": 0.5, "interval": 5000}';

    $defaultDayart = 'lunch';

    $daypart = isset($_GET['daypart']) && !empty($_GET['daypart']) ? $_GET['daypart'] : $defaultDayart;
    $path = 'templates/' . $daypart . '.php';

    if (!empty($_GET)) {
        ob_start();
        include($path);
        $output = ob_get_clean();

        echo $output;
        exit;
    }
?>

<!DOCTYPE html>
<html>
	<head>
		<title></title>
        <meta charset='utf-8'>
		<link rel="stylesheet" type="text/css" href="css/new-mcd.css" />

		<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="js/TweenMax.js"></script>
		<script type="text/javascript" src="js/promo-animator.js"></script>
		<script type="text/javascript" src="js/timeline-builder.js"></script>
		<script type="text/javascript" src="js/swfobject.js"></script>
		<script type="text/javascript" src="js/icg-MCDV2.js"></script>
        <script type="text/javascript" src="js/ajaxHandler.js"></script>
        <script type="text/javascript" src="js/daypart-controller-MCDV3.js"></script>
        <script type="text/javascript" src="js/evm-animations.js"></script>
		<script type="text/javascript" src="js/mcd-controller-MCDV3.js"></script>
        <script type="text/javascript" src="js/columnizer.js"></script>

	</head>

	<body id="five-by-one">
        <div id="menu-content" class="dn-5panel-menu-board">

            <?php include($path); ?>

        </div>
	</body>
</html>