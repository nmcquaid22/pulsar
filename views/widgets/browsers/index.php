<?php

$baseDir = '../../../';

require_once __DIR__ . '/' . $baseDir . 'vendor/autoload.php';

use Jadu\Pulsar\Twig\Extension\TabsExtension;

$loader = new Twig_Loader_Filesystem('../../');
$loader->addPath('../../', 'pulsar');

$twig = new Twig_Environment($loader, array('debug' => true));
$twig->addExtension(new TabsExtension());
$twig->addExtension(new Twig_Extension_Debug());

$template = $twig->loadTemplate('widgets/browsers/main.html.twig');

print $template->render(array());
