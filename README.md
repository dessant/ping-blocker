<p align="center"><img src="https://i.imgur.com/UUGTmeg.png"></p>
<h1 align="center">Ping Blocker</h1>

<p align="center">
  </br></br>
  <a href="https://chrome.google.com/webstore/detail/ping-blocker/jkpocifanmihboebfhigkjcdihgfcdnb">
    <img src="https://i.imgur.com/B0i5sn3.png" alt="Chrome Web Store"></a>
  </br></br>
</p>

## Supporting the Project

The continued development of Ping Blocker is made possible
thanks to the support of awesome backers. If you'd like to join them,
please consider contributing with
[Patreon](https://armin.dev/go/patreon?pr=ping-blocker&src=repo),
[PayPal](https://armin.dev/go/paypal?pr=ping-blocker&src=repo) or
[Bitcoin](https://armin.dev/go/bitcoin?pr=ping-blocker&src=repo).
 
## Description

Ping Blocker is a browser extension that prevents sites from tracking
the links you visit through
[hyperlink auditing](https://html.spec.whatwg.org/multipage/links.html#hyperlink-auditing).

The extension blocks ping requests sent in the background when you click on links.
Firefox disables ping requests by default, and other privacy-focused extensions
may also block these requests, such as uBlock Origin and uMatrix.

Verify if ping requests are currently sent by your browser by visiting
[this](https://jsfiddle.net/wdgs28a0/) demo page. Open the developer tools
of the browser and switch to the network panel, then click the link on
the page. A request to `example.com/ping` may be listed in the network panel,
possibly marked as blocked.

## Screenshots

<p>
  <img width="420" src="https://i.imgur.com/wusrp3m.png">
</p>

## License

Copyright (c) 2019 Armin Sebastian

This software is released under the terms of the GNU General Public License v3.0.
See the [LICENSE](LICENSE) file for further information.
