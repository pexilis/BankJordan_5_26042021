const DOMApi = (() => {
    let self = {};

    self.findParentNode = (node, className) => {
        let current = node;
        let containClass = current.classList.contains(className);
    
        while (!containClass){
            current = current.parentNode;
            containClass = current.classList.contains(className);
        }
        
        return current;
    }

    return self;
})();

export default DOMApi;