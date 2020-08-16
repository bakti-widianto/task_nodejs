var express = require('express');
var router = express.Router();
var moment = require('moment');

module.exports = (db) => {
  router.get('/', function (req, res, next) {
    let remind = []
    const sql = `SELECT * FROM task LEFT JOIN tag ON task.id = tag.id ORDER BY date ASC`
    db.query(sql, (err, data) => {
      if (err) return res.status(500).json({
        error: true,
        message: err
      })
      for (let i = 0; i < data.rows.length; i++) {
        data.rows[i].date = moment(data.rows[i].date).format('MMM Do YYYY')

        if (data.rows[i].date == moment().format('MMM Do YYYY')) {
          remind.push(data.rows[i])
        }
      }
      res.json({
        error: false,
        data: data.rows,
        remind
      })
    })
  });

  router.post('/', function (req, res) {
    let task = req.body.task.split(' ')
    let time = ''
    let date = ''
    let result = ''

    task.forEach(item => {
      //time
      for (let i = 0; i <= 12; i++) {
        if (item == `${i}pm`) {
          time = item
        } else if (item == `${i}am`) {
          time = item
        }
      }
      //date
      for (let x = 0; x <= 12; x++) {
        for (let y = 0; y <= 31; y++) {

          if (item == 'tomorrow') {
            date = moment().add(1, 'days').format('YYYY-MM-DD')

          } else if (item == `2020-${x}-${y}`) {
            date = item
          }
        }
      }
      //task
      if (item !== time && item !== date && item !== 'tomorrow') {
        result += item + ' '
      }
    });


    let sql = `INSERT INTO task(task, time, date) VALUES($1,$2,$3)`
    let values = [result, time, date]
    db.query(sql, values, (err) => {
      if (err) return res.status(500).json({
        error: true,
        message: err
      })
      res.send('ADD SUCCESS')
    })
  })









  return router;
}
