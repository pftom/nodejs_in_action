const express = require('express');
const bodyParser = require('body-parser');
const read = require('node-readability');

// user module
const Article = require('./db').Article;

// build a app
const app = express();

// construct fake data
const articles = [{title: 'Example'}];
const port = process.env.PORT || 3000;

app.set('port', port);

// add midlleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  './css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css'),
);

app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) {
      return next(err);
    }
    res.format({
      html: () => {
        res.render('article.ejs', {articles: articles});
      },
      json: () => {
        res.send(articles);
      },
    });
  })
});

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) {
      return next(err);
    }
    res.send(article);
  })
});

app.post('/articles', (req, res, next) => {
  const url = req.body.url;

  read(url, (err, result) => {
    Article.create(
      {title: result.title, content: result.content},
      (err, article) => {
        if (err) {
          return next(err);
        }
        res.send('Successfully created!');
      }
    )
  });
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Article.delete(id, (err) => {
    if (err) {
      return next(err);
    }
    res.send({message: 'Deleted'});
  })
});

app.listen(app.get('port'), () => {
  console.log(`Express web app available at http://localhost:${port}`);
});

module.exports = app;
