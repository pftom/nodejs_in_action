const redis = require('redis');
const bcrypt = require('bcrypt');
const db = redis.createClient();

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  save(cb) {
    if (this.id) {
      this.update(cb);
    } else {
      db.incr('user:ids', function handleIncr(err, id) {
        if (err) return cb(err);
        this.id = id;
        this.hashPassword(function handleHashPassword(err, id) {
          if (err) return cb(err);
          this.update(cb);
        });
      });
    }
  }

  update(cb) {
    const id = this.id;
    db.set(`user:id:${this.name}`, id, function handleSetProp(err) {
      if (err) return cb(err);
      db.hmset(`user:${id}`, this, function handleHmset() {
        cb(err);
      });
    });
  }

  hashPassword(cb) {
    bcrypt.genSalt(12, function handleGenSalt(err, salt) {
      if (err) return cb(err);
      this.salt = salt;
      bcrypt.hash(this.pass, salt, function handleHash(err, hash) {
        if (err) {
          return cb(err);
        }

        this.pass = hash;
        cb();
      })
    })
  }
}

module.exports = User;
