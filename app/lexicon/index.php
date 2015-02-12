<?php

$baseDir = '../../';
$templateDir = $baseDir . 'views';

require_once __DIR__ . '/' . $baseDir . 'vendor/autoload.php';

use Jadu\Pulsar\Twig\Extension\ConfigExtension;
use Jadu\Pulsar\Twig\Extension\RelativeTimeExtension;
use Jadu\Pulsar\Twig\Extension\UrlParamsExtension;
use Jadu\Pulsar\Twig\Extension\TabsExtension;

$loader = new Twig_Loader_Filesystem($templateDir);
$loader->addPath($templateDir, 'pulsar');

$twig = new Twig_Environment($loader,
	array(
		'debug' => true,
		'strict_variables' => true
	)
);

// $profile = new Twig_Profiler_Profile();

$twig->addExtension(new ConfigExtension($baseDir . 'pulsar.json'));
$twig->addExtension(new RelativeTimeExtension());
$twig->addExtension(new UrlParamsExtension($_GET));
$twig->addExtension(new TabsExtension());
$twig->addExtension(new Twig_Extension_Debug());
//$twig->addExtension(new Twig_Extension_Profiler($profile));

$template = $twig->loadTemplate('lexicon/main.html.twig');

$toolbar = array(
    '<i class="icon-file"></i> Docs' => '#',
    '<i class="icon-file"></i> Lexicon' => '#',
    );

$breadcrumb = array(
    'Pulsar' => '/',
    'Documentation' => '/docs',
    'Lexicon' => null
    );

$flashMessage = array(
    'type' => 'success',
    'message' => 'This is a flash message, it lets users know that something happened. <a href="#tab_4" data-toggle="tab">read more</a>.'
    );

print $template->render(array(
    'breadcrumb' => $breadcrumb,
    'notifications' => 3,
    'toolbar' => $toolbar
    ));

// $dumper = new Twig_Profiler_Dumper_Text();
// echo '<pre>' . $dumper->dump($profile) . '</pre>';
