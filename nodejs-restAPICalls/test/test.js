process.env.NODE_ENV = 'test';

const chai = require("chai");
const chaiHttp = require('chai-http');
const fetch = require('node-fetch');
let should = chai.should();
const url = 'http://localhost:3000';
chai.use(chaiHttp);

describe('Create new record', () => {
	describe('/POST db', () => {
		it('should POST new record', (done) => {
			let student = {
				id: "14",
				name: "Ferb",
				grade: "B"
			};
			chai.request(url)
				.post('/db')
				.send(student)
				.end((err, res) => {
					res.should.have.status(201);
					res.should.have.property('created').eql(true);
					res.body.should.have.property('id');
					res.body.should.have.property('name');
					res.body.should.have.property('grade');
					done();
				});
		});
	});
});

describe('Retrieve records', () => {
	describe('/GET db', () => {
		it('should GET all records', (done) => {
			chai.request(url)
				.get('/db')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('db');
					done();
				});
		});
	});
	describe('/GET db:id', () => {
		it('it should GET a record given the id', (done) => {
			let student = { id: "700", name: "Norris", grade: "B" };
			fetch(`${url}/db`, {
				method: 'POST',
				body: JSON.stringify(student),
				headers: { 'Content-Type': 'application/json' },
			}).then(chai.request(url)
				.get('/db/' + student.id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property('id').eql('700');
					done();
				})
			);
		});
	})
});

describe('Update a record', () => {
	it('it should UPDATE a record given the id', (done) => {
		let student = { id: "101", name: "Lando", grade: "A" };
		fetch(`${url}/db`, {
			method: 'POST',
			body: JSON.stringify(student),
			headers: { 'Content-Type': 'application/json' },
		}).then(chai.request(url)
			.put('/db/' + student.id)
			.send({ id: "101", name: "Lando", grade: "S" })
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('grade').eql('S');
				done();
			})
		);
	});
});

describe('Delete a record', () => {
	it('it should DELETE a record given the id', (done) => {
		let student = { id: "500", name: "Mike", grade: "X" };
		fetch(`${url}/db`, {
			method: 'POST',
			body: JSON.stringify(student),
			headers: { 'Content-Type': 'application/json' },
		}).then(chai.request(url)
			.delete('/db/' + student.id)
			.end((err, res) => {
				res.should.have.status(200);
				done();
			})
		);
	});
});


