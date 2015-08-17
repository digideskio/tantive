import {Addon} from './models/addon';


Addon.sync({
  force: true
}).then(function () {
  Addon.create({
    name: 'Awesome Screenshot Plus',
    description: 'Capture the whole page or any portion, annotate it with rectangles, circles, arrows, lines and text, blur sensitive info, one-click upload to share. And more!',
    developer: 'Diigo Inc.'
  });
  Addon.create({
    name: 'Copy As Plain Text',
    description: 'Removes formatting from copied text.',
    developer: 'mehtuus'
  });
  Addon.create({
    name: 'FireSSH',
    description: 'Mime Čuvalo',
    developer: 'FireSSH is a free, cross-platform SSH terminal client for Mozilla Firefox. Written entirely in Javascript!'
  });
  Addon.create({
    name: 'Stylish',
    description: 'Jason Barnabe',
    developer: 'Restyle the web with Stylish, a user styles manager. Stylish lets you easily install themes and skins for Google, Facebook, YouTube, Orkut, and many, many other sites. You can even customize Firefox and other programs themselves.'
  });
  Addon.create({
    name: 'Adblock Plus',
    description: 'Blocks annoying video ads on YouTube, Facebook ads, banners and much more.',
    developer: 'Wladimir Palant'
  });
  Addon.create({
    name: 'Video DownloadHelper',
    description: 'The easy way to download and convert Web videos from hundreds of YouTube-like sites.',
    developer: 'mig'
  });
  Addon.create({
    name: 'Firebug',
    description: 'Firebug integrates with Firefox to put a wealth of development tools at your fingertips while you browse. You can edit, debug, and monitor CSS, HTML, and JavaScript live in any web page...',
    developer: 'Joe Hewitt, Jan Odvarko, robcee, Firebug Working Group'
  });
});
