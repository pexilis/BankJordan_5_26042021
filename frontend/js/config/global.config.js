const Global = (() => {
    let self = {};

    self.protocol = process.env.PROTOCOL;
    self.hostname = process.env.HOSTNAME;
    self.typeData = "cameras";
    self.maxQuantityCart = 99;

    return self;
})();

export default Global;