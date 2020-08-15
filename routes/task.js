var express = require('express');
var router = express.Router();
var moment = require('moment');

module.exports = (db) => {
  router.get('/', function (req, res, next) {
    const sql = `SELECT * FROM task LEFT JOIN tag ON task.id = tag.id`
    db.query(sql, (err, data) => {
      if (err) return res.status(500).json({
        error: true,
        message: err
      })
      console.log(data.rows[1].starttime)
      for (let i = 0; i < data.rows.length; i++) {
        data.rows[i].date = moment(data.rows[i].date).format('MMM Do YY')

        
      }
      res.json({
        error: false,
        data: data.rows
      })
    })

  });

  return router;
}
