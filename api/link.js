const path = require('path');
const fs = require("fs");

module.exports = (req, res) => {
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });
  // res.send(req.query);

  // const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');
  // fs.readFile(indexPath, 'utf8', (err, htmlData) => {
  //   if (err) {
  //       console.error('Error during file reading', err);
  //       return res.status(404).end()
  //   }
  //   htmlData = htmlData.replace(/<title>.*<\/title>/, '<title>Dynamic Title</title>')
  //   console.log(htmlData);
  //   return res.send(htmlData);
  // });
};
