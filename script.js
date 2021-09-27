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

    // add control to show/hide mapPage by clicking menu
    document.querySelector('#mapPageBtn').addEventListener('click', function() {
        updateVisibility('mapPageBtn');
    });

    // add control to show/hide howToPage by clicking menu
    document.querySelector('#howToPageBtn').addEventListener('click', function() {
        updateVisibility('howToPageBtn');
    });

    // add control to show/hide covidPage by clicking menu
    document.querySelector('#covidPageBtn').addEventListener('click', function() {
        updateVisibility('covidPageBtn');
    });

    // add control to show/hide denguePage by clicking menu
    document.querySelector('#denguePageBtn').addEventListener('click', function() {
        updateVisibility('denguePageBtn');
    });

    // add control to show/hide dataSourcePage by clicking menu
    document.querySelector('#dataSourcePageBtn').addEventListener('click', function() {
        updateVisibility('dataSourcePageBtn');
    });

})