const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const { Product } = require('./models');
const { Commandes } = require('./models')

app.use(bodyParser.json());

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching products' });
    }
});

// Insert a new product
app.post('/products/insert', async (req, res) => {
    try {
        const { nom, description, prix, image } = req.body;
        const product = await Product.create({
            nom,
            description,
            prix,
            image
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting the product' });
    }
});

// Update an existing product
app.put('/products/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, prix, image } = req.body;
        const [updated] = await Product.update({ nom, description, prix, image }, {
            where: { id }
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
});

// Delete a product
app.delete('/products/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({
            where: { id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the product' });
    }
});

// Get all commandes
app.get('/commandes', async (req, res) => {
    try {
        const commandes = await Commandes.findAll();
        res.json(commandes);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching commandes' });
    }
});

// Insert a new commande
app.post('/commandes/insert', async (req, res) => {
    try {
        const { num, email, prix, nop, detail } = req.body;
        const commande = await Commandes.create({ num, email, prix, nop, detail });
        res.status(201).json(commande);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while inserting the commande' });
    }
});

// Update an existing commande
app.put('/commandes/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { num, email, prix, nop, detail } = req.body;
        const [updated] = await Commandes.update({ num, email, prix, nop, detail }, { where: { id } });
        if (updated) {
            const updatedCommande = await Commandes.findByPk(id);
            res.status(200).json(updatedCommande);
        } else {
            res.status(404).json({ error: 'Commande not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the commande' });
    }
});

// Delete a commande
app.delete('/commandes/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Commandes.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Commande not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the commande' });
    }
});

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server started on http://localhost:3000');
    });
});
