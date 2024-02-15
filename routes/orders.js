const express = require('express');
const pool = require('../shared/pool');
const orders = express.Router();
const checkToken = require('../shared/checktoken');

orders.post('/add', checkToken, (req, res) => {
  try {
    let userName = req.body.userName;
    let userEmail = req.body.userEmail;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let pin = req.body.pin;
    let total = req.body.total;
    let orderDetails = req.body.orderDetails;

    pool.query(
      `select id from users where email ='${userEmail}'`,
      (error, user) => {
        if (error) {
          res.status(500).send({
            error: error.code,
            message: error.message,
          });
        } else {
          if (user.length > 0) {
            let userId = user[0].id;
            const query = `insert into orders (userId, userName,address,city,state,pin,total)
            values
            (${userId},'${userName}','${address}','${city}','${state}','${pin}',${total});select LAST_INSERT_ID()`;
            pool.query(query, (error, result) => {
              if (error) {
                res.status(401).send({
                  error: error.code,
                  message: error.message,
                });
              } else {
                let orderId = result[0].insertId;
                orderDetails.forEach((item) => {
                  const detailsQuery = `insert into orderdetails 
            (orderId,productId,qty,price,amount) values
            (${orderId},${item.productId},${item.qty},${item.price},${item.amount})`;
                  pool.query(detailsQuery, (detailsError, detailsResult) => {
                    if (detailsError) {
                      res.status(401).send({
                        error: detailsError.code,
                        message: detailsError.message,
                      });
                    }
                  });
                });
              }
            });
            res.status(201).send({ message: 'success' });
          } else {
            res.status(401).send({ message: `User doesn't exist.` });
          }
        }
      }
    );
  } catch (error) {
    res.status(400).send({
      error: error.code,
      message: error.message,
    });
  }
});

module.exports = orders;
