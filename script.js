window.addEventListener('DOMContentLoaded', function() {
    // a function to update pages' visibility according to button clicked
    function updateVisibility(btnName) {
        // hide all pages
        let pages = document.querySelectorAll('.page');
        for (let p of pages) {
            p.classList.replace('show', 'hidden');
        }
        const pageName = btnName.substring(0, btnName.length - 3);
        // show denguePage only
        document.querySelector(`#${pageName}`).classList.replace('hidden', 'show');
    }

    document.querySelector('#mapPageBtn').addEventListener('click', function() {
        updateVisibility('mapPageBtn');
    });

    document.querySelector('#howToPageBtn').addEventListener('click', function() {
        updateVisibility('howToPageBtn');
    });

    document.querySelector('#covidPageBtn').addEventListener('click', function() {
        updateVisibility('covidPageBtn');
    });

    document.querySelector('#denguePageBtn').addEventListener('click', function() {
        updateVisibility('denguePageBtn');
    });

    document.querySelector('#dataSourcePageBtn').addEventListener('click', function() {
        updateVisibility('dataSourcePageBtn');
    });

})