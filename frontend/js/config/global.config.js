const Global = (() => {
    let self = {};

    self.protocol = "https";
    self.hostname = "orinoco-back.herokuapp.com";
    self.typeData = "cameras";
    self.maxQuantityCart = 99;

    return self;
})();

export default Global;