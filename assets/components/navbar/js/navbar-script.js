class NavbarItem {
    constructor(url, title) {
        this.url = url;
        this.title = title;
    }

    render() {
        return `
            <h3><a href="${this.url}">${this.title}</a></h3>
        `;
    }
}
// Index page
const IndexPage = new NavbarItem('/example-url', 'Example Title');

// Fetch and render navbar items
fetch('/assets/components/navbar/navbar.json')
    .then(response => response.json())
    .then(navbarItems => {
        navbarItems.forEach(item => {
            const url = `/pages/projects/${item}/index.html`;
            const title = item.charAt(0).toUpperCase() + item.slice(1);
            const navbarItem = new NavbarItem(url, title);
            document.getElementById('navbar-container').innerHTML += navbarItem.render();
        });
    })
    .catch(error => console.error('Error loading navbar items:', error));