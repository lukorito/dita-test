const express = require("express");
const cors = require("cors");

const formidable = require("formidable");

const exec = require("child_process").exec;
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the beginning");
});

const port = process.env.PORT || 5000;

app.post("/upload", (req, res, next) => {
  // parse form data with formidable
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const { docType, publishType } = fields;
    console.log("====begins====");
    const { file } = files;
    // call dita function
    exec(
      `dita -i ${file.path} --clean.temp="no" -f ${publishType} --args.output.base=${file.name} -o ./processed/${publishType}`,
      function(err, stdout, stderr) {
        if (err) {
          console.log(err, "error");
        }
        console.log("====ends====");
        res.send("upload success");
      }
    );
  });
});

app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
