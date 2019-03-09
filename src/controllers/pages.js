export default {
  index(req, res) {
    res.render('home', {
      title: 'home',
      script: 'home',
    });
  },
  about(req, res) {
    res.render('about', {
      title: 'about',
    });
  },
};
