const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;


// Fetch and process data from API
async function fetchData() {
    try {
        const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
        let products = Object.values(response.data.products);
        // Sort products by popularity
        products.sort((a, b) => b.popularity - a.popularity);
        return products;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Endpoint to display data
app.get('/', async (req, res) => {
    const products = await fetchData();
    res.render('index', { products }); // Pass the products array to the EJS template
    // let htmlContent = '<h1>Products</h1><ul>';
    // products.forEach(product => {
    //     htmlContent += `<li>${product.title} - $${product.price}</li>`;
    // });
    // htmlContent += '</ul>';
    // res.send(htmlContent);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.set('view engine', 'ejs');
app.set('views', 'views'); // 'views' is the directory where EJS templates will be stored