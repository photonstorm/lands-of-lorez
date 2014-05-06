<!DOCTYPE HTML>
<html>
<head>
    <title>ArcadeStorm</title>
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
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="57x57" href="icons/app_icon_57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="icons/app_icon_60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="icons/app_icon_72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="icons/app_icon_76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="icons/app_icon_114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="icons/app_icon_120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="icons/app_icon_144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="icons/app_icon_152x152.png">
    <link rel="apple-touch-icon" sizes="256x256" href="icons/app_icon_256x256.png">
    <link rel="apple-touch-icon" sizes="512x512" href="icons/app_icon_512x512.png">
    <link rel="apple-touch-icon" sizes="1024x1024" href="icons/app_icon_1024x1024.png">
    <link rel="stylesheet" href="css/stylesheet.css" type="text/css" charset="utf-8" />
    <?php
        if ($_SERVER['SERVER_NAME'] == '192.168.0.100' && isset($_GET['single']) == false)
        {
            $path = '../../phaser';
            require('../../phaser/build/config.php');
    ?>
    <script src="src/Boot.js"></script>
    <script src="src/Preloader.js"></script>
    <script src="src/MainMenu.js"></script>

    <script src="src/bomber/Preloader.js"></script>
    <script src="src/bomber/MainMenu.js"></script>
    <script src="src/bomber/City.js"></script>
    <script src="src/bomber/Game.js"></script>

    <script src="src/missile/Preloader.js"></script>
    <script src="src/missile/MainMenu.js"></script>
    <script src="src/missile/City.js"></script>
    <script src="src/missile/Explosion.js"></script>
    <script src="src/missile/Missile.js"></script>
    <script src="src/missile/MissileLauncher.js"></script>
    <script src="src/missile/Rocket.js"></script>
    <script src="src/missile/RocketLauncher.js"></script>
    <script src="src/missile/Silo.js"></script>
    <script src="src/missile/Game.js"></script>

    <script src="src/snake/Preloader.js"></script>
    <script src="src/snake/MainMenu.js"></script>
    <script src="src/snake/Game.js"></script>

    <?php
        }
        else
        {
    ?>
    <script src="js/phaser.min.js"></script>
    <script src="js/arcadestorm.min.js?u=<?php echo time() ?>"></script>
    <?php
        }
    ?>
</head>
<body>

    <div id="game"></div>
    <div id="orientation"></div>

</body>
</html>