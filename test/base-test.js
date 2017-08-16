let User = require('../api/model/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('User', () => {
  /*beforeEach((done) => { //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });*/
/*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                console.log("Longitud: "+res.body.length)
                //res.body.length.should.be.eql(0);
              done();
            })
      });
  });

});