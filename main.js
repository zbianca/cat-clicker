/* ===== Model ===== */
const model = {
    currentCat: null,
    cats: [
        {
            name: 'Mel',
            imgSrc: 'img/mel.jpg',
            imgAttribution: 'https://unsplash.com/photos/-oSpTrUtvfY',
            clickCount: 0
        },
        {
            name: 'Honey',
            imgSrc: 'img/honey.jpg',
            imgAttribution: 'https://eu.udacity.com/',
            clickCount: 0
        },
        {
            name: 'Tiger',
            imgSrc: 'img/tiger.jpg',
            imgAttribution: 'https://unsplash.com/photos/VAPVKWm-dW8',
            clickCount: 0
        },
        {
            name: 'Juquinha',
            imgSrc: 'img/juquinha.jpg',
            imgAttribution: 'https://unsplash.com/photos/OcOYahwb6Zk',
            clickCount: 0
        },
        {
            name: 'Preta',
            imgSrc: 'img/preta.jpg',
            imgAttribution: 'https://unsplash.com/photos/FOTeSka0DUE',
            clickCount: 0
        }
    ]
};

/* ===== Views ===== */

const catListView = {

    init: function() {
        this.catListUl = document.getElementById('cat-list');
        this.render();
    },

    render: function() {
        const cat = octopus.getCats();
        const catsListHtml = cat.map((x, index) => `<li onclick="octopus.setCurrentCat(${index})">${x['name']}</li>`);
        this.catListUl.innerHTML = catsListHtml.join('');
    }

};

const catView = {

    init: function() {
        this.catHeader = document.getElementById('cat-name');
        this.catImg = document.getElementById('cat-img');
        this.catCounter = document.getElementById('cat-count');

        this.catImg.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        this.render();
    },

    render: function() {
        const currentcat = octopus.getCurrentCat();
        this.catHeader.innerHTML = currentcat.name;
        this.catImg.src = currentcat.imgSrc;
        this.catCounter.innerHTML = `Likes: ${currentcat.clickCount}`;
        this.adminButton = document.getElementById('admin');
        this.adminButton.addEventListener('click', function(){
            octopus.toggleAdminPanel();
        });
    }

};

const adminView = {

    init: function() {
        this.adminPanel = document.getElementById('admin-panel');
        this.adminPanel.classList.add('hidden');
        this.cancelButton = null;

    },

    render: function() {
        const currentcat = octopus.getCurrentCat();
        this.nameInput = document.getElementById('change-name');
        this.imgInput = document.getElementById('change-src');
        this.counterInput = document.getElementById('change-counter');

        this.nameInput.placeholder = currentcat.name;
        this.imgInput.placeholder = currentcat.imgSrc;
        this.counterInput.placeholder = currentcat.clickCount;

        this.cancelButton = document.getElementById('cancel');
        this.cancelButton.addEventListener('click', function(){
            adminView.init();
        });
    },

};

/* ===== Operator ===== */

const octopus = {
    init: function() {
        model.currentCat = model.cats[0];

        catListView.init();
        catView.init();
        adminView.init();
    },

    getCats: function() {
        return model.cats;
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    setCurrentCat: function(catIndex) {
        model.currentCat = model.cats[catIndex];
        catView.render();
        adminView.init();
    },

    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    toggleAdminPanel: function() {
        adminView.adminPanel.classList.toggle('hidden');
        adminView.render();
    },
}

octopus.init();