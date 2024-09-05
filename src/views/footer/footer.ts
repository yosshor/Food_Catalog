import { renderNewDivElement } from "../header/header";


/// Render Footer
export function renderFooter() {
    let footer = document.querySelector("#footer");
    if (!footer) {
        renderNewDivElement('footer');
        footer = document.querySelector('#footer');
    }

    footer!.innerHTML = `
        <div class="footer">
            <p>© 2024 TOY-Food. All rights reserved.</p>
        </div>
    `;
}
