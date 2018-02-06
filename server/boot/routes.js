module.exports = function(app) {
  let Clients = app.models.Client;
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });

  app.post('/login', function(req, res) {
    const allowedEmails = ['seangeorge0@gmail.com'];
    console.log(req.body.email);
    let email = req.body.email;
    findClientBy('email', email).then(function(accounts) {
      console.log(accounts);
      res.send(accounts)
    }).catch(function(err) {
      console.log("error");
      console.log(err);
    });




  });

  function findClientBy(value, name) {
    let obj = {};
    obj[value] = name;
    return new Promise((resolve, reject) => {
      Clients.find({where: obj, limit: 3}, function(err, accounts) {
        if (err) {
          reject(err);
        }
        resolve(accounts);
      });
    });
  }
};
