<!DOCTYPE HTML>
<html>
<head>
    <title>Times of Lores - 32x32 LowRes Jam Entry</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1, IE=9">
    <meta name="format-detection" content="telephone=no">
    <meta name="HandheldFriendly" content="true" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="format-detection" content="telephone=no">
    <meta name="HandheldFriendly" content="true" />
    <meta name="robots" content="noindex,nofollow" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-title" content="ArcadeStorm">
    <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" />
    <link rel="stylesheet" href="css/stylesheet.css" type="text/css" charset="utf-8" />
    <?php
        if ($_SERVER['SERVER_NAME'] == '192.168.0.100' && isset($_GET['single']) == false)
        {
            $path = '../../phaser';
            require('../../phaser/build/config.php');
    ?>
    <script src="../../phaser-plugins/TilemapWalker/TilemapWalker.js"></script>
    <script src="src/Boot.js"></script>
    <script src="src/Preloader.js"></script>
    <script src="src/MainMenu.js"></script>

    <?php
        }
        else
        {
    ?>
    <script src="js/phaser-arcade-physics.min.js?u=<?php echo time() ?>"></script>
    <script src="js/timeoflores.min.js?u=<?php echo time() ?>"></script>
    <?php
        }
    ?>
        <style>
            #game {
                display: none;
            }
        </style>
</head>
<body>

    <h2>Times of Lores - #lowrez game jam entry</h2>

    <div id="actual-canvas"><canvas id="pixel" width="256" height="256" /></div>
    <div id="game"></div>

    <h2>Keyboard Controls</h2>

    <p>Up to Move Forwards.</p>
    <p>Left / Right to turn 90 degrees.</p>
    <p>Down to bring up the Map.</p>

    <h2>Xbox Joypad Controls</h2>

    <p>Press A button to enable Xbox controller support, and then:</p>

    <p>D-PAD UP and DOWN to move Forwards and Backwards</p>
    <p>D-PAD LEFT and RIGHT to side-step left and right</p>
    <p>LEFT and RIGHT bumpers to turn 90 degrees</p>
    <p>X button to display the map</p>

</body>
</html>