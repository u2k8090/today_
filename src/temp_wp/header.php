<?php ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo( 'charset' ); ?>">
<title><?php wp_title(''); ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, user-scalable=yes">
<meta name="format-detection" content="telephone=no">
<link rel="apple-touch-icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/img/apple-touch-icon.png">
<link rel="icon" type="image/vnd.microsoft.icon" href="<?php echo get_template_directory_uri(); ?>/img/favicon.ico">

<link rel="stylesheet" type="text/css" media="all" href="<?php echo get_template_directory_uri(); ?>/style.css">
<link rel="stylesheet" type="text/css" media="all" href="<?php echo get_template_directory_uri(); ?>/css/font-awesome/css/all.css">
<!-- wp_head -->
<?php wp_head(); ?>



<!-- ie -->
<!--[if lt IE 9]>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/selectivizr-min.js"></script>
<![endif]-->


<!-- タグマネ -->

</head>

<body>
<!-- タグマネ -->

<header id="header" class="header">
  <div class="inr">
    <div class="header-logo"><a href="<?php echo home_url(); ?>">
      <!-- <img src="<?php echo get_template_directory_uri(); ?>/assets/img/logo.svg" alt="<?php bloginfo('name'); ?>"> -->
    </a></div>
    <div class="gnav" :class="{open: menuFlag}">
      <nav class="gnav__list">
         <ul>
           <li><a href="<?php echo home_url(); ?>">Top <i class="fa fa-home"></i></a></li>
           <li><a href="<?php echo home_url(); ?>/about/">About us</a></li>
           <li><a href="<?php echo home_url(); ?>/recruit/">Recruit</a></li>
           <li><a href="<?php echo home_url(); ?>/blog/">Blog</a></li>
           <li><a href="<?php echo home_url(); ?>/contact/">Contact</a></li>
        </ul>
      </nav>
    </div>
    <div class="menu" v-if="spFlag" v-on:click="menuToggle">
      <div class="menu-line"></div>
      <div class="menu-line"></div>
      <div class="menu-line"></div>
    </div>
  </div>
</header>
