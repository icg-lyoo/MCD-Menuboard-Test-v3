<!DOCTYPE html>
<!-- CLAUDIO -->
<html>
	<head>
		<title></title>
        <meta charset='utf-8'> 
		<link rel="stylesheet" type="text/css" href="css/new-mcd.css" />

		<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="js/TweenMax.js"></script>
		<script type="text/javascript" src="js/promo-animator.js"></script>
		<script type="text/javascript" src="js/timeline-builder.js"></script>
		<script type="text/javascript" src="js/swfobject.js"></script>
		<script type="text/javascript" src="js/icg-MCDV2.js"></script>
        <script type="text/javascript" src="js/daypart-controller-MCDV3.js"></script>
        <script type="text/javascript" src="js/evm-animations.js"></script>
		<script type="text/javascript" src="js/mcd-controller-MCDV3.js"></script>
        <script type="text/javascript" src="js/columnizer.js"></script>

	</head>

    <?php $promo_vars = '{"elementSelector": "img", "animation": "fadeInOut", "duration": 0.5, "interval": 5000}'; ?>
    <?php $menu_vars = '{"elementSelector": "> div", "animation": "fadeInOut", "duration": 0.5, "interval": 5000}'; ?>

	<body id="five-by-one">
        <div id="menu-content" class="dn-5panel-menu-board">

            <?php
                if(!empty($_GET)){
                    $daypart = (isset($_GET['daypart'])?$_GET['daypart']:'lunch');
                }
                else{
                    $daypart = 'lunch';
                }
            ?>

            <?php
                if($daypart == 'breakfast') {
                    include('templates/breakfast.php');
                }
                else {
                    include('templates/lunch.php');
                }
            ?>

        </div>
	</body>
</html>