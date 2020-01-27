import { Component } from '../Core/Component.js';

const renderMarkup = (options) =>
    `
    <div class="footer-wrap">
    <footer class="footer">
        <div class="brand">
            <div class="logo">
                <div class="logo__image"></div>
                <span class="logo__name">MUSIC BLOG</span>
            </div>
            <h3 class="slogan">Music is life.</h3>
        </div>

        <div class="footer-menu">

            <div class="footer-menu__item">
                <h4><a href="./genres.html">Genres</a></h4>

                <ul>
                    <li><a href="#">Trip-hop</a></li>
                    <li><a href="#">Experimental</a></li>
                    <li><a href="#">Electronic</a></li>
                    <li><a href="#">Dancehall</a></li>
                    <li><a href="#">Ambient</a></li>
                </ul>
            </div>

            <div class="footer-menu__item">
                <h4><a href="./reviews.html">Reviews</a></h4>

                <ul>
                    <li><a href="#">Interviews</a>
                        <ul>
                            <li><a href="#">Nicolas Jaar</a></li>
                            <li><a href="#">СБПЧ</a></li>
                            <li><a href="#">Massive Attack</a></li>
                            <li><a href="#">Glue Trip</a></li>
                            <li><a href="#">DakhaBrakha</a></li>
                        </ul>
                    </li>

                    <li><a href="#">Albums</a>
                        <ul>
                            <li><a href="#">"Вассерваага": Вагоновожатые</a></li>
                            <li><a href="#">"Так закалялась сталь": Shortparis</a></li>
                            <li><a href="#">"":</a></li>
                        </ul>
                    </li>

                </ul>
            </div>

            <div class="footer-menu__item">
                <h4><a href="./concerts.html">Concerts</a></h4>

                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                </ul>
            </div>

            <div class="footer-menu__item">
                <h4><a href="#">About Us</a></h4>

                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

        </div>

        <hr>
        <div class="signature">

            <div class="signature__socs">

                <ul>
                    <li><a href="https://github.com/ohexus" class="signature__socs-github" target="_blank"><i></i></a></li>
                    <li><a href="https://t.me/ohexuse" class="signature__socs-telegram" target="_blank"><i></i></a></li>
                    <li><a href="https://vk.com/ohexus" class="signature__socs-vk" target="_blank"><i></i></a></li>
                    <li><a href="https://www.facebook.com/ohexus" class="signature__socs-facebook" target="_blank"><i></i></a></li>
                    <li><a href="https://www.instagram.com/ohexuse/" class="signature__socs-instagram" target="_blank"><i></i></a></li>
                    <li><a href="https://www.linkedin.com/in/taras-moskalenko-7ab943179/" class="signature__socs-linkedin" target="_blank"><i></i></a></li>
                </ul>

            </div>

            <div class="signature__author-wrap">
                <p class="signature__author">Made by <a href="https://t.me/ohexuse" target="_blank">Taras Moskalenko</a></p>
            </div>

        </div>

    </footer>
</div>
`

export class Footer extends Component {
    constructor(options = {}) {
        super(options, renderMarkup(options));
    }
}