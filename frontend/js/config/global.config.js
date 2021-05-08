const Global = (() => {
    let self = {};

    self.protocol = "http";
    self.hostname = "localhost:3000";
    self.typeData = "cameras";

    return self;
})();

export default Global;