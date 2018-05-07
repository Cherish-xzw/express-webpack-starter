export default {
  login(req, res){
    res.json({"code":20000,"data":{"token":"admin"}})
  },
  logout(req, res){
    res.json({"code":20000,"data":"success"});
  },
  info(req, res){
    res.json({"code":20000,"data":{"roles":["admin"],"role":["admin"],"name":"admin","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"}})
  }
}
