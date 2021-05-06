const Global = (() => {
    let self = {};

    self.protocol = "http";
    self.hostname = "localhost";
    self.port = 3000;
    self.typeData = "cameras";
    self.imgName = "vcam";
    
    return self;
})();

export default Global;