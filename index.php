<!DOCTYPE html>
<!-- BLAH BLAH-->
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
		<script type="text/javascript" src="js/mcd-controller-MCDV3.js"></script>
        <script type="text/javascript" src="js/columnizer.js"></script>

	</head>

    <?php $promo_vars = '{"elementSelector": "img", "animation": "slide", "duration": 0.5, "interval": 5000}'; ?>
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
        
        <script>
            
        $(document).ready(function(){
            $(document).keypress(function(e){
                keyPressed = e.charCode;
                //breakfast refresh pressed (b)
                if(keyPressed==98)
                {
                    var singleText = "breakfast";
                    switchDaypart(singleText);
                }
                //lunch refresh pressed (l)
                else if(keyPressed==108)
                {
                    var singleText = "lunch";
                    switchDaypart(singleText);
                    
                }
                else
                {
                    //misc key pressed
                }
            });
            
//            setInterval(switchDaypartAuto, 20000)
        });
        
        //switch daypart on the fly, if the current board is not showing the daypart pressed
        function switchDaypart(singleText) {
            var s = window.location.search;

                if (s.indexOf(singleText) == -1) {
                    queryIndex = window.location.href.indexOf('?');
                    if(queryIndex!=-1){
                        url = window.location.href.substring(0, queryIndex);
                        window.location.href = url + "?daypart=" + singleText;
                    }
                    else {
                        window.location.href = window.location.href + "?daypart=" + singleText;
                    }
                }

        }
        
        function switchDaypartAuto(){
            s = window.location.search;
            
            if (s.indexOf('breakfast') == -1) {
                    queryIndex = window.location.href.indexOf('?');
                    if(queryIndex!=-1){
                        url = window.location.href.substring(0, queryIndex);
                        window.location.href = url + "?daypart=" + 'breakfast';
                    }
                    else {
                        window.location.href = window.location.href + "?daypart=" + 'breakfast';
                    }
            }
            else if (s.indexOf('lunch') == -1) {
                queryIndex = window.location.href.indexOf('?');
                if(queryIndex!=-1){
                    url = window.location.href.substring(0, queryIndex);
                    window.location.href = url + "?daypart=" + 'lunch';
                }
                else {
                    window.location.href = window.location.href + "?daypart=" + 'lunch';
                }
            }
            else{
                window.location.href = window.location.href + "?daypart=" + 'lunch';
            }
        }
            
        </script>
	</body>
</html>