const express = require('express');
const exphbs = require('express-handlebars');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set up middleware for handling form data
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('form');
});

app.post('/submit', upload.single('image'), (req, res) => {
    // Handle form submission here
    const formData = req.body;
    const image = req.file;

    // Process the data and store it as needed

    res.render('confirmation', { formData, image });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
