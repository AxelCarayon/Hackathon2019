var express = require('express');
var app = express();
var dateFormat = require('dateformat');

var sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./database.db');

app.use('/', express.static(__dirname + '/public/'));

app.use('/packages', express.static(__dirname + '/node_modules/'));

app.get('/personnels', function(req, res) {
	let sql = 'SELECT * FROM Personnels';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/postes', function(req, res) {
	let sql = 'SELECT * FROM Postes';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/types', function(req, res) {
	let sql = 'SELECT * FROM Types';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/evenements', function(req, res) {
	let sql = 'SELECT * FROM Evenements';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/test_evenements', function(req, res) {
	let sql = 'SELECT Personnels.Nom,Personnels.Prenoms,Services.libelle as Service ,Postes.libelle as Poste,Evenements.date_ev,Types.description FROM Evenements '+
	'INNER JOIN Types,Personnels,Postes,Services '+
	'WHERE Types.id = Evenements.fk_type '+
	'AND Personnels.id = Evenements.fk_employe '+
	'AND Postes.id = Personnels.fk_emploi '+
	'AND Services.id = Personnels.service';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send({evenement: rows});
	});
});

app.get('/all_evenements', function(req, res) {
	let sql = 'SELECT Personnels.Nom,Personnels.Prenoms,Services.libelle as Service , Postes.libelle as Poste,Evenements.date_debut,Evenements.date_fin,Types.description,Evenements.details FROM Evenements '+
	'INNER JOIN Types,Personnels,Postes,Services '+
	'WHERE Types.id = Evenements.fk_type '+
	'AND Personnels.id = Evenements.fk_employe '+
	'AND Postes.id = Personnels.fk_emploi '+
	'AND Services.id = Personnels.service ' +
	'ORDER BY Evenements.date_debut DESC';
	db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});

app.get('/evenement_salarie', function(req, res) {
	let sql = 'SELECT Personnels.Nom,Personnels.Prenoms,Services.libelle as Service , Postes.libelle as Poste,Evenements.date_debut,Evenements.date_fin,Types.description,Evenements.details FROM Evenements '+
	'INNER JOIN Types,Personnels,Postes,Services '+
	'WHERE Types.id = Evenements.fk_type '+
	'AND Personnels.id = Evenements.fk_employe '+
	'AND Postes.id = Personnels.fk_emploi '+
	'AND Services.id = Personnels.service ' +
	'AND Personnels.id = ?'
	'ORDER BY Evenements.date_debut DESC';
	db.all(sql, req.query.id, (err, rows) => {
		if (err) {
			throw err;
		}
		res.send(rows);
	});
});


var port = 8080;
var server = app.listen(port, function(){
  console.log('listening on *:'+port);
});

