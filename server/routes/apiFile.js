
var router = require('express').Router();
var path = require('path');
var fs = require('fs');


// -------------------------------------------------------------------------
// File api
// -------------------------------------------------------------------------


/* GET download
  *
  * Receives: req.body should be a user json object.
  * Required: user.email, and user.password.
  * Returns:  User
*/
router.get('/download/:fileName', (req, res) => {
  let fileName = req.params.fileName;

  if (fileName && path.basename(fileName)) {
    fileName = path.basename(fileName);
    fileExt = path.extname(fileName);

    // TODO: Make this path not relative
    let serverPath = path.join(__dirname, '../', 'public/files', fileName);

    if (fs.existsSync(serverPath)) {
      res.set({ fileExt: fileExt })
      res.set({ fileName: fileName })
      res.download(serverPath);
    }
  }
});

module.exports = router;