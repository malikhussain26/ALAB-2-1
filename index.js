const express = require("express")
const app = express()
const PORT = 3000;
const fs = require("fs")
const morgan = require("morgan");
const router = require('./routes/routes.js')
const path = require('path');

// Part 1 - Routes, Templates, and Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", (req, res) => {
  res.render("index")
});

app.get("/about", (req, res) => {
  res.render("about")
});

// Route handler for the home page
app.get('/download-image', (req, res) => {
  const filePath = './public/image.jpg';
  res.download(filePath, 'image.jpg');
});

// form
app.post("/submit", (req, res) => {
  console.log(req.body.search);
  res.send('Form submitted');
});

// Route parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
res.send('user', { user: userData})
});

////////////
// Section 2 - Middleware
app.use((req, res, next) => {
  console.log("Middleware is running")
  console.log(`${req.method} request was made to ${req.url}`)
  next()
})
// Third Party request logger
app.use(morgan("tiny"))
///////////

/////////////////////////////
// Section 3 - Sending Content
// Static Middleware
// serve static files from the assets directory
// app.use(express.static("./assets"));

// Part 3: Exploring Response Options
// Serve static files from the public folder
app.use(express.static('public'));

// Route to serve the image file
app.get('/image', (req, res) => {
  res.sendFile(__dirname + '/public/image.jpg');
});

// define the template engine
// take a file, read it, and render an output
// this engine's callback fn is fired/called/invoked when we use res.render(filePath, options(raw data))
// app.engine("perscholas", (filePath, options, callback) => {
//   fs.readFile(filePath, (err, content) => {
//     if (err) return callback(err);

//     // Here, we take the content of the template file,
//     // convert it to a string, and replace sections of
//     // it with the values being passed to the engine.
//     const rendered = content
//       .toString()
//       .replaceAll("#title#", `${options.title}`)
//       .replace("#content#", `${options.content}`);
//     return callback(null, rendered);
//   });
// });

// app.set("views", "./views"); // specify the views directory
// app.set("view engine", "perscholas"); // register the template engine



const routerMW = (req, res, next) => {
  console.log("*************ROUTER MIDDLEWARE*************")
  next()
}

app.get("/something-unique", (req, res) => {
  res.send('blah')
})

// Router Setup
app.use("/", routerMW, router)
// app.use("/books", bookRouter)



// Error-Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).send(err)
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}. You better go catch it!`)
})