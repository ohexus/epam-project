import { Component } from '../../Core/Component.js';

const renderMarkup = (options) => `
<div class="footer-wrap">
    <footer class="footer">
        <div class="brand">
            <div class="logo">
                <i class="logo__image"></i>
                <span class="logo__name">MUSIC BLOG</span>
            </div>
            <h3 class="slogan">Music is life.</h3>
        </div>

        <div class="footer-menu">

            <div class="footer-menu__item">
                <h5 class="footer-menu__item-header"><a class="footer-menu__link" href="${options.genres}">Genres</a></h5>
                <ul class="footer-menu__item-menu">
                    <li><a class="footer-menu__link" href="#">Trip-hop</a></li>
                    <li><a class="footer-menu__link" href="#">Experimental</a></li>
                    <li><a class="footer-menu__link" href="#">Electronic</a></li>
                    <li><a class="footer-menu__link" href="#">Dancehall</a></li>
                    <li><a class="footer-menu__link" href="#">Ambient</a></li>
                </ul>
            </div>

            <div class="footer-menu__item">
                <h5 class="footer-menu__item-header"><a class="footer-menu__link" href="${options.reviews}">Reviews</a></h5>
                <ul class="footer-menu__item-menu">
                    <li><a class="footer-menu__link" href="#">The Blaze</a></li>
                    <li><a class="footer-menu__link" href="#">Forest Swords</a></li>
                    <li><a class="footer-menu__link" href="#">The Prodigy</a></li>
                    <li><a class="footer-menu__link" href="#">Binkbeats</a></li>
                    <li><a class="footer-menu__link" href="#">DJ Shadow</a></li>
                </ul>
            </div>
            
            <div class="footer-menu__item">
                <h5 class="footer-menu__item-header"><a class="footer-menu__link" href="${options.interviews}">Interviews</a></h5>
                <ul class="footer-menu__item-menu">
                    <li><a class="footer-menu__link" href="#">Nicolas Jaar</a></li>
                    <li><a class="footer-menu__link" href="#">СБПЧ</a></li>
                    <li><a class="footer-menu__link" href="#">Massive Attack</a></li>
                    <li><a class="footer-menu__link" href="#">Glue Trip</a></li>
                    <li><a class="footer-menu__link" href="#">DakhaBrakha</a></li>
                </ul>
            </div>
            
            <div class="footer-menu__item">
                <h5 class="footer-menu__item-header"><a class="footer-menu__link" href="#">Albums</a></h5>
                <ul class="footer-menu__item-menu">
                    <li><a class="footer-menu__link" href="#">"Вассерваага": Вагоновожатые</a></li>
                    <li><a class="footer-menu__link" href="#">"Так закалялась сталь": Shortparis</a></li>
                </ul>
            </div>

            <div class="footer-menu__item">
                <h5 class="footer-menu__item-header"><a class="footer-menu__link" href="${options.concerts}">Concerts</a></h5>
                <ul class="footer-menu__item-menu">
                    <li><a class="footer-menu__link" href="#">Shortparis</a></li>
                    <li><a class="footer-menu__link" href="#">Дельфин</a></li>
                    <li><a class="footer-menu__link" href="#">Yuko</a></li>
                    <li><a class="footer-menu__link" href="#">Led Zeppelin</a></li>
                    <li><a class="footer-menu__link" href="#">Subcarpaţi</a></li>
                </ul>
            </div>

            <div class="footer-menu__item">
                <h5 class="footer-menu__item-header"><a class="footer-menu__link" href="#">About Us</a></h5>
            </div>
        </div>
        <hr>
        <div class="signature">

            <div class="signature__socs-wrap">
                <a href="https://github.com/ohexus" class="signature__socs github" target="_blank"><i></i></a></li>
                <a href="https://t.me/ohexuse" class="signature__socs telegram" target="_blank"><i></i></a></li>
                <a href="https://vk.com/ohexus" class="signature__socs vk" target="_blank"><i></i></a></li>
                <a href="https://www.facebook.com/ohexus" class="signature__socs facebook" target="_blank"><i></i></a></li>
                <a href="https://www.instagram.com/ohexuse/" class="signature__socs instagram" target="_blank"><i></i></a></li>
                <a href="https://www.linkedin.com/in/taras-moskalenko-7ab943179/" class="signature__socs linkedin" target="_blank"><i></i></a></li>
            </div>

            <div class="signature__author-wrap">
                <p class="signature__author">Made by <a class="footer-menu__link" href="https://t.me/ohexuse" target="_blank">Taras Moskalenko</a></p>
            </div>

        </div>

    </footer>
</div>
`

export class Footer extends Component {
    constructor(options = {
        genres: '#genres',
        concerts: '#concerts',
        reviews: '#reviews',
        interviews: '#interviews'
    }) {
        super(options, renderMarkup(options));
    }
}