const Global = (() => {
    let self = {};

    self.protocol = "https";
    self.hostname = "orinoco-back.herokuapp.com";
    self.typeData = "cameras";
    self.imgName = "vcam";
    
    return self;
})();

export default Global;