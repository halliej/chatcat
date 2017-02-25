'use strict';
const express = require('express');

const chatCat = require('./app');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(chatCat.session);
app.use('/', chatCat.router);

app.listen(app.get('port'), () => {
  console.log('ChatCat listening on port', app.get('port'));
});
