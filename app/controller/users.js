const BaseController = require("./base");

class UsersController extends BaseController {
  async signup() {
    let { ctx } = this;
    let user = ctx.request.body;

    try {
      user = await ctx.model.User.create(user);
      this.success(user);
      console.log("登录成功");
    } catch (error) {
      this.error(error);
    }
  }
  async signin() {
    let { ctx } = this;
    //拿到请求体
    let user = ctx.request.body;
    try {
      let doc = await ctx.model.User.findOne(user);
      if (doc) {
        //可以通过ctx.session.user是否为null来判断此用户是否登录过
        ctx.session.user = doc;
        this.success({ user: doc });
      } else {
        this.error("用户名或密码错误");
      }
    } catch (error) {
      this.error(error);
    }
  }
  async signout() {
    let { ctx } = this;
    ctx.session.user = null;
    this.success("退出成功");
  }
}
module.exports = UsersController;
