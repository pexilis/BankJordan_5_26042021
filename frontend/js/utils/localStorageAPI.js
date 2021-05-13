class ErrorStorage {
    constructor(name) {
        this.name = name;
    }

    errorUndefined(command) {
        if (command === undefined)
            throw {error:"UNDEFINED_ERROR"};
    }
    
    errorInit() {
        const isInit =  !this.isInitialized();
        if (isInit) throw {error:"INITIALIZATION_ERROR"};
    }

    errorEmpty() {
        this.errorInit();
        const isEmpty = this.isEmpty();
        if (isEmpty) throw {error:"EMPTY_ERROR"};
    }

    errorAccess(id) {
        const arrItem = this.getArray(this.name);
        let item = arrItem.find(item => item._id === id);
        const notExist = (item === undefined);
        
        if (notExist) throw {error:"ACCESS_ERROR"};
    }
}

class localStorageAPI extends ErrorStorage{
    isInitialized() {
        return localStorage.getItem(this.name) !== null;
    }

    getArray() {
        this.errorInit();
        return JSON.parse(localStorage.getItem(this.name));
    }

    isEmpty() {
        this.errorInit();
        return JSON.parse(localStorage.getItem(this.name)).length === 0;
    }

    clearArray() {
        this.errorInit();
        this.errorEmpty();
        localStorage.setItem(this.name, "[]");
    }

    getById(id) {
        this.errorInit();
        const arrItem = this.getArray(this.name);
        const item = arrItem.find(item => item._id === id);
        return item;
    }

    addItem(item) {        
        const arrArticle = this.getArray(this.name);
        arrArticle.push(item);
        localStorage.setItem(this.name, JSON.stringify(arrArticle));
    }

    setById(id, newItem) {
        this.errorInit();
        this.errorAccess(id);
        let arrArticle = this.getArray(name);
        
        for (let i = 0 ; i < arrArticle.length ; i++) {
            const currentArticle = arrArticle[i];
            if (currentArticle._id === id){
                arrArticle[i] = newItem;
            }
        }

        localStorage.setItem(this.name, JSON.stringify(arrArticle));
    }

    removeItem(id) {
        this.errorInit();
        this.errorEmpty();
        this.errorAccess(id);

        let array = this.getArray();
        array = array.filter(item => item._id !== id);
        localStorage.setItem(this.name, JSON.stringify(array));
    }
}

export default localStorageAPI; 