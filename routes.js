const routes = require("next-routes")();

routes
  .add("/campaigns/newcandidate", "/campaigns/newcandidate")
  .add("/campaigns/showstatus", "/campaigns/showstatus")
  .add("/components/Barchart", "/components/Barchart")
  .add("/campaigns/:address", "/campaigns/showcandidinfo");

module.exports = routes;

//routes
//  .add("/campaigns/newcandidates", "/campaigns/newcandidate")
//  .add("/campaigns/:address", "/campaigns/show")
//  .add("/campaigns/:address/requests", "/campaigns/requests/index")
//  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");
