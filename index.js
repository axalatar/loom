const LA =  require('./linearAlgebra.js');
const drawer = require('./drawMatrix.js');
const image = require('./imageHelper.js');
const multer  = require('multer');
var express = require('express')


const upload = multer();
var app = express()


app.use(express.json())


app.get("/", (req, res) => {
  res.sendFile('routes/default (working).html', {root: __dirname })
  // res.sendFile('routes/default.html', {root: __dirname })
  // res.status(200).sendFile(path.join(__dirname, '/routes/default.html'));
})



app.post("/image", upload.single('image'), async (req, res) => {
  if(req.file == undefined) {
    res.status(400).send("No image uploaded");
  }
  var img = (await image.imageToMatrix(req.file, 40, 40)).contents
  res.status(200).send(img)
})

app.post("/api", async (req, res) => {
  res.status(200).send()
  let contents = req.body.gridValues;
  let row = req.body.row;

  
  let repeat = 40 / contents.length;

  let newContents = [];

  for(let i = 0; i < repeat; i++) {
    for(let j = 0; j < contents.length; j++) {
      let newRow = []
      for(let k = 0; k < repeat; k++) {
        for(let l = 0; l < contents.length; l++) {
          newRow.push(contents[j][l])
        }
      }
      newContents.push(newRow)
    }
  }

  

  let matrix = new LA.Matrix(newContents)


  await drawer.drawMatrix(matrix, row)
  
})

app.use((err, req, res, next) => {
  //if something breaks, this gets called
  console.error("\n***** ERROR START *****\n", err)
  console.error(err.stack)
  console.error("\n***** ERROR END *****\n")
  res.status(500).send('Something broke!')
})


app.use((req, res) => {
  //if you don't go to any of the above routes,
  //you go to the 404 page
  res.status(404).send("Where did you go?")
})

var server = app.listen(4000, async () => {
  await drawer.initialize();
  console.log("app running on port.", server.address().port);
});