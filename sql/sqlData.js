const initSqlJs = require('sql.js');
async function SQL(){
    const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}`
      })
      const db=new SQL.Database()
      console.log('db',db)
      let sqlstr = "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');";
db.run(sqlstr);
      return db
}
module.exports.SQL=SQL;