import React, {Component} from "react"
import "./navigtation.scss"

const menuItems = [
    {path: '#articles', label: 'הופעות אחרונות בתקשורות'},
    {path: '#blogs', label: 'אנליות אחרונות'},
    {path: '#who-we-are', label: 'מי אנחנו'},
]

export class Navigation extends Component {

    componentDidMount() {
        this.handleScroll(null);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        const header = document.querySelector("header");
        const personalZone = document.querySelector(".personal-zone");
        const headerMoney = document.querySelector(".header-money");
        const scrollTrashHold = 1;

        if (window.pageYOffset > personalZone.offsetTop + personalZone.offsetHeight) {
            header.classList.add("sticky");

            if (window.pageYOffset > (headerMoney.offsetHeight - header.offsetHeight - scrollTrashHold)) {
                header.classList.add("bordered");
            }
            else {
                header.classList.remove("bordered");
            }
        } else {
            header.classList.remove("sticky");
            header.classList.remove("bordered");
        }
    }

    scrollToAnchor = (event) => {
        // Scrolling to element with calculating the height of the top menu.
        event.preventDefault();
    };

    render() {
        return <nav>
            {menuItems.map((menuItem, key) => <>
                <a key={key} onClick={this.scrollToAnchor} href={menuItem.path}>{menuItem.label}</a>
                {key !== (menuItems.length - 1) && <> | </>}
            </>)}
        </nav>
    }
}
