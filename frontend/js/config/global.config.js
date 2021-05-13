const Global = (() => {
    let self = {};

    self.protocol = process.env.PROTOCOL;
    self.hostname = process.env.HOSTNAME;
    self.typeData = "cameras";
    self.maxQuantityCart = process.env.MAX_QUANTITY;

    return self;
})();

export default Global;