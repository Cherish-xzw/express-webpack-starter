export default {
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
