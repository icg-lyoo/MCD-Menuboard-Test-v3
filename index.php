<?php
    $promo_vars = '{"elementSelector": "img", "animation": "slide", "duration": 0.5, "offset": -0.5, "overlap": 1, "delay": 8, "interval": 5}';
    $menu1_vars = '{"elementSelector": ".menu-content-container", "animation": "fadeInOut", "duration": 0.5, "interval": 20}';
    $menu2_vars = '{"elementSelector": ".menu-content-container", "animation": "fadeInOut", "duration": 0.5, "delay": 0, "interval": 20}';

    $defaultDayart = 'lunch';

    $daypart = isset($_GET['daypart']) && !empty($_GET['daypart']) ? $_GET['daypart'] : $defaultDayart;
    $path = 'templates/' . $daypart . '.php';

    if (isset($_GET['daypart']) && !empty($_GET['daypart'])) {
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
        <meta http-equiv="X-UA-Compatible" content="IE=10" />
        <meta charset='utf-8'>

		<title></title>

		<link rel="stylesheet" type="text/css" href="css/new-mcd.css" />

		<script type="text/javascript" src="js/jquery-1.7.1.js"></script>
		<script type="text/javascript" src="js/TweenMax.js"></script>
		<script type="text/javascript" src="js/carousel-animator.js"></script>
		<script type="text/javascript" src="js/timeline-builder.js"></script>
		<script type="text/javascript" src="js/swfobject.js"></script>
		<script type="text/javascript" src="js/icg-MCDV2.js"></script>
        <script type="text/javascript" src="js/ajaxHandler.js"></script>
        <script type="text/javascript" src="js/daypart-controller-MCDV3.js"></script>
        <script type="text/javascript" src="js/evm-animations.js"></script>
        <script type="text/javascript" src="js/intro-animations.js"></script>
        <script type="text/javascript" src="js/outro-animations.js"></script>
		<script type="text/javascript" src="js/mcd-controller-MCDV3.js"></script>
        <script type="text/javascript" src="js/columnizer.js"></script>

	</head>

	<body id="five-by-one">
        <div id="menu-content" class="dn-5panel-menu-board">

            <?php include($path); ?>

        </div>
	</body>
</html>