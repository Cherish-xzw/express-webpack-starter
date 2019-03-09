import {
  validationResult
} from 'express-validator/check';

export default {
  async message(req, res) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }

    function getMessage() {
      return new Promise(resolve => resolve(req.body.message));
    }

    const message = await getMessage();
    res.json({
      message,
    });
  },
};
