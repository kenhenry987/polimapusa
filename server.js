const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
host : 'localhost', 
user : 'rroot',
password : 'password1',
database : 'polimap'
});
    
db.connect((err) => {
if(err){ 
    throw err;
}
console.log('mysql connected...');
});

const app = express();

 app.get('/apig/:ids', (req,res) => {
    //req.params.id , req.query.color
    let sname = req.query.sname; 
    let sql= "select * from persons where family_name > 'aa' order by family_name Limit 10 ";
    if( sname != '')   sql = sql.replace( 'aa', sname);
    let query = db.query(sql, (err,results) => {
        if(err) throw err;
        let resultx = Object.values(JSON.parse(JSON.stringify(results)));
        let sbuf ="";
        resultx.forEach((v) => sbuf+=JSON.stringify(v) + '<br>');
       res.header('Access-Control-Allow-Origin',"*");
       res.send('post fetched..' + sbuf);
      // res.send("post fetched simple..");
    });
});

app.get('/apidate/:idd' , (req,res) => {
    res.header('Access-Control-Allow-Origin',"*");
      let s = "{time : " + Date() + "}" ;
      //let s = "time = " + Date() ;
      res.send(s);
});

app.listen(process.env.PORT || 3000 , () => {
 console.log('Server started on port 3000');
});

