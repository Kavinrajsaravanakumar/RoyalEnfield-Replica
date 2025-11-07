document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu li[data-category]');
    const categories = document.querySelectorAll('.category');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const categoryName = item.dataset.category; // get clicked category

            categories.forEach(cat => {
                if (cat.classList.contains(categoryName + 'models')) {
                    cat.style.display = 'flex'; // show clicked category
                } else {
                    cat.style.display = 'none'; // hide others
                }
            });
        });
    });
});
// Select all menu items
const menuItems = document.querySelectorAll('.menu li');
const box = document.querySelector('.cardcontainer');

// Function to reset all active styles
function resetActive() {
    menuItems.forEach(item => {
        item.style.backgroundColor = '';
    });
}

// Set "Classic" as default active on page load
const defaultItem = document.querySelector('.menu li[data-category="classic"]');
defaultItem.style.backgroundColor = '#d6d6d6ff';

// Set active style on clicked menu item
menuItems.forEach(item => {
    item.addEventListener('click', function(event) {
        resetActive();                 // Clear previous active
        item.style.backgroundColor = '#d6d6d6ff'; // Highlight clicked
        event.stopPropagation();       // Prevent document click from firing
    });
});

// Click outside both menu items and box removes active
document.addEventListener('click', function(event) {
    let clickedInsideMenu = Array.from(menuItems).some(item => item.contains(event.target));
    if (!clickedInsideMenu && !box.contains(event.target)) {
        resetActive();
    }
});
