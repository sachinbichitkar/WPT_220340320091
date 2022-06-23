
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');


const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'studydbt',
	port:3306
});

app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not



var result;

	app.get('/addBook', function (req, res) {
		let ibookid=req.query.bookid;
		let ibname=req.query.bookname;
		let iprice=req.query.price;
		console.log("reading input " + req.query.bookname +  "  second " + req.query.price);
		


		connection.query('insert into book values(?,?,?)',[ibookid,ibname,iprice],(err,rows)=>{

			if(err){
				console.log("error has occured ",err);
			}else{
				console.log(rows);
				//var xyz ={ bookid: ,bookname:37, price:35};
        		res.send(rows);
			}

		});


    	
    });

	app.get('/showAllBooks', function (req, res) {
		let ibookid=req.query.bookid;
		let ibname=req.query.bookname;
		let iprice=req.query.price;
		console.log("reading input " + req.query.bookname +  "  second " + req.query.price);
		


		connection.query('select * from book',(err,rows)=>{

			if(err){
				console.log("error has occured ",err);
			}else{
				console.log(rows);
				let xyz=[];
				for(let i=0;i<rows.length;i++){
				 xyz[i] ={ bookid:rows[i].bookid ,bookname:rows[i].bookname, price:rows[i].price};
				}
        		res.send(xyz);
			}

		});


    	
    });




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});