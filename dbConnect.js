const mongoose = require('mongoose');

exports.dbConnect = () => {
  const mongoConnectionUrl = process.env.MONGODB_URL;
  mongoose
    .connect(mongoConnectionUrl)
    .then(() => {
      console.log('Database Connection Success');
    })
    .catch((err) => {
      // show error in console
      console.error('Database connection error:', err);
    });
};
