const express = require('express');
const pool = require('../shared/pool');
const bcryptjs = require('bcryptjs');
const users = express.Router();

users.post('/signup', (req, res) => {
  try {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let city = req.body.city;
    let state = req.body.state;
    let pin = req.body.pin;
    let email = req.body.email;
    let password = req.body.password;

    pool.query(
      `select count(*) as count from users where email like '${email}'`,
      (error, resultCount) => {
        if (error) {
          res.status(500).send({error: error.code, message: error.message});
        } else {
          if (resultCount[0].count > 0) {
            res.status(200).send({message: 'Email already exists'});
          } else {
            bcryptjs.hash(password, 10).then((hashedPassword) => {
              const query = `Insert into users (email,firstName,lastName,address,city,state,pin,password)
                    values
                    ('${email}','${firstName}','${lastName}','${address}','${city}','${state}','${pin}','${hashedPassword}')`;
              pool.query(query, (error, result) => {
                if (error) {
                  res.status(401).send({error: error.code, message: error.message});
                } else {
                  res.status(201).send( {message: 'success'});
                }
              });
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(400).send({error: error.code, message: error.message});
  }
});

module.exports = users;
