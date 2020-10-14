<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?> - Blog</title>
    <base href="/">
    <script src="/assets/js/vendor/beautiful-router/beautiful-router.min.js" defer></script>
    <script src="/assets/js/app.js" defer></script>
</head>
<body>
    <header>
        <nav>
            <ul>
                <a href="index.php">
                    <li>Home</li>
                </a>
                <a href="article.php">
                    <li>Article</li>
                </a>
                <a href="contact.php">
                    <li>Contact</li>
                </a>
            </ul>
        </nav>
    </header>
    <div id="root">