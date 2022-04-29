const fs= require("fs");
const util= require("util");
const path= require("path");
const express= require("express");

const PORT= process.env.PORT || 3001;


const app= express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsed = JSON.parse(data);
      parsed.push(content);
      writeToFile(file, parsed);
    }
  });
};



app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req,res)=>{
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/notes/api/notes", (req,res)=>{
    readFromFile("./db/db.json").then((data)=> res.json(json.parse(data)));
});

app.listen(PORT, ()=>{
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});