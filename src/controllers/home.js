export default {
  index(req, res) {
    res.render('home', {
      title: 'home',
    });
  },
  about(req, res) {
    res.render('about', {
      title: 'about',
    });
  },
  async message(req, res) {
    function getMessage() {
      return new Promise(resolve => resolve('hello world'));
    }

    const message = await getMessage();
    res.json({
      message,
    });
  },
};
