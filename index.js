const express = require("express");
const { Pool } = require("pg");

const app = express();



const db = new Pool({
    user: 'nawal',
	host: 'localhost',
	database: 'cyf_ecommerce',
	password: 'open123',
	port: 5432
});


app.get("/",  (req, res) => {
    res.send("ecommerce server.  Ask for /customers, /suppliers, /products etc.");
  });

//endpoint /customers to return all the customers from the database

app.get("/customers",(req, res)=>{
db.query("SELECT * FROM customers order by name",
    (error, result) => {
      console.log(result)
      res.json(result.rows);
  });
})

app.get("/suppliers",(req, res)=>{
    db.query("SELECT * FROM suppliers",
        (error, result) => {
          console.log(result)
          res.json(result.rows);
      });
    })


    app.get("/products",(req, res)=>{
    const sql = 'SELECT p.product_name, pa.unit_price, s.supplier_name from product_availability pa join products p on pa.prod_id = p.id join suppliers s on pa.supp_id = s.id';
    
    db.query(sql, [],
        (error, result) => {
          console.log(result)
          res.json(result.rows);
      });
      
    })

  




app.listen(3000, function() {
	console.log("Server is listening on port 3000.");
});
