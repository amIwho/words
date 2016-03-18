// Generated by CoffeeScript 1.10.0
(function() {
  var nodemailer, transporter;

  nodemailer = require('nodemailer');

  transporter = nodemailer.createTransport(require('nodemailer-sendmail-transport')({
    path: '/usr/sbin/sendmail'
  }));

  'use strict';

  exports.send = function(req, res) {
    return transporter.sendMail({
      from: 'Itservice ✔ <words@oleg-sidorkin.ru>',
      to: "kalinon7@gmail.com",
      subject: "[Words]",
      text: req.body.callback_text
    }, function(err, info) {
      if (err) {
        console.error(err);
      }
      return console.log('Message sent: ' + JSON.stringify(info));
    });
  };

}).call(this);

//# sourceMappingURL=callback.server.controller.js.map
