export class Router {

    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;
        this.hashChanged();
        window.onhashchange = this.hashChanged;
    }

    hashChanged = () => {
        const routeName = window.location.hash.length > 0 ?
            window.location.hash.substr(1).split('/')[0] :
            'default';
        this.navigate(routeName);
        console.log(`routeName: ${routeName}`);
    }

    navigate = (routeName) => {
        this.rootElement.innerHTML = "";
        this.rootElement.appendChild(this.routes[routeName].getElement());
    }

}