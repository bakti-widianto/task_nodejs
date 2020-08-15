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







  return router;
}
