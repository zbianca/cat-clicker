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
        const catsListHtml = octopus.getCats().map((listObj, index) => `<li onclick="octopus.setCurrentCat(${index})">${listObj['name']}</li>`);
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

        this.adminButton = document.getElementById('admin');
        this.adminButton.addEventListener('click', function(){
            octopus.toggleAdminPanel();
        });

        this.render();
    },

    render: function() {

        const currentCat = octopus.getCurrentCat();
        this.catHeader.innerHTML = currentCat.name;
        this.catImg.src = currentCat.imgSrc;
        this.catCounter.innerHTML = `Likes: ${currentCat.clickCount}`;
    }

};

const adminView = {

    init: function() {
        this.adminPanel = document.getElementById('admin-panel');
        this.cancelButton = document.getElementById('cancel');
        this.cancelButton.addEventListener('click', function(){
            octopus.hideAdminPanel();
        });
        this.saveButton = document.getElementById('save');
        this.saveButton.addEventListener('click', function(){
            octopus.updateModel();
        });
    },

    render: function() {
        const currentCat = octopus.getCurrentCat();
        this.nameInput = document.getElementById('change-name');
        this.imgInput = document.getElementById('change-src');
        this.counterInput = document.getElementById('change-counter');

        this.nameInput.placeholder = currentCat.name;
        this.imgInput.placeholder = currentCat.imgSrc;
        this.counterInput.placeholder = currentCat.clickCount;
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
        this.hideAdminPanel();
    },

    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },

    toggleAdminPanel: function() {
        adminView.adminPanel.classList.toggle('hidden');
        adminView.render();
    },

    hideAdminPanel: function() {
        adminView.adminPanel.classList.add('hidden');
    },

    updateModel: function() {
        if (adminView.nameInput.value !== "") {
            model.currentCat.name = adminView.nameInput.value;
        }
        if (adminView.imgInput.value !== "") {
            model.currentCat.imgSrc = adminView.imgInput.value;
        }
        if (adminView.counterInput.value !== "") {
            model.currentCat.clickCount = adminView.counterInput.value;
        }
        catView.render();
    }
}

octopus.init();