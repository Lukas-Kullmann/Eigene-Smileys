<?php

$numlines = isset($_GET['lines']) ? (int)$_GET['lines'] : 20;

$contents = file_get_contents('.'.DIRECTORY_SEPARATOR.'headers').PHP_EOL.parseFile('run.js', $numlines);

if(!isset($_GET['dontsave']))
    file_put_contents('.'.DIRECTORY_SEPARATOR.'autocomiled.user.js', $contents);

function parseFile($filename, $compress = 1, $functions = array('/include\(([^)]+)\)/ei' => 'parseFile(\'$1\')', '#//.*#' => '', '#/\*.*?\*/#s' => '')){
    $compiled = '';
    if(file_exists('.'.DIRECTORY_SEPARATOR.$filename)){
        // datei exitiert überhaupt
        $compiled = file_get_contents('.'.DIRECTORY_SEPARATOR.$filename);

        // alle benutzerfunktinen anwenden
        foreach ($functions as $exp => $replace)
            $compiled = preg_replace($exp, $replace, $compiled);

        // überflüssige leerzeichen entfernen
        if($compress > 1 || isset($_GET['trim']))
            $compiled = preg_replace("/(\s)\s{1,}/", "$1", $compiled);

        if(substr($filename, -3) == 'tpl'){
            $compress = PHP_INT_MAX;
            $compiled = str_replace("'", "\'", $compiled);
        }

        // datei komprimieren
        if($compress > 1){
            $nl = chr(ord(PHP_EOL));
            // zeilenumbruch vereinheitlichen
            $compiled = str_replace(array("\r\n", "\r", "\n"), $nl, $compiled);

            // an zeilenumbruch teilen
            $parts = explode($nl, $compiled);
            // ausgabe zurücksetzen
            $compiled = '';

            for($i = 0; $i < count($parts); $i++){
                if($i !== 0 && $i%$compress == 0) // zeilenumbruch einfügen
                    $compiled .= $nl;
                $compiled .= $parts[$i]; // datei zusammenfügen
            }
        }
    }
    return $compiled;
}
?><!DOCTYPE HTML>
<html>
    <head>
        <title>Eigene Smileys - Autocompiled Version</title>
        <meta charset="utf-8">
    </head>
    <body>
        <p>Dies ist die automatisch generierte Version des "Eigene Smileys"-Userscriptes.</p>
        <?php if(!isset($_GET['dontsave'])) { ?><p>Die Datei wurde generiert. Sie kann hier erreicht werden: <a href="./autocomiled.user.js">autocomiled.user.js</a></p><?php } ?>
        <p>Folgender Inhalt wurde generiert:</p>
        <pre><?=htmlspecialchars($contents)?></pre>
    </body>
</html>