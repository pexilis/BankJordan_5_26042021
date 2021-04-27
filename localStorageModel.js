class localStorageModel {
    constructor(name) {
        this.name = name;
    }

    getArray() {
        return JSON.parse(localStorage.getItem(this.name));
    }

    isInitialized() {
        return localStorage.getItem(this.name) !== null;
    }

    isEmpty() {
        return JSON.parse(localStorage.getItem(this.name)).length === 0;
    }

    clearArray() {
        localStorage.setItem(this.name, "[]");
    }

    getById(id) {
        const arrArticle = this.getArray(this.name);
        const item = arrArticle.find(article => article.id === id);
        return item;
    }

    addItem(item) {
        const arrArticle = this.getArray(this.name);
        arrArticle.push(item);
        localStorage.setItem(this.name, JSON.stringify(arrArticle));
    }

    setById(id, newItem) {
        let arrArticle = this.getArray(name);
        
        for (let i = 0 ; i < arrArticle.length ; i++) {
            const currentArticle = arrArticle[i];
            if (currentArticle.id === id){
                arrArticle[i] = newItem;
            }
        }

        localStorage.setItem(this.name, JSON.stringify(arrArticle));
    }
}

export default localStorageModel; 