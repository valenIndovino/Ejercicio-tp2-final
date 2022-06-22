const chai = require('chai');
const chaiFetch = require('chai-fetch');
chai.use(chaiFetch);
const axios = require('axios');
const { assert } = require('chai');
const {Repository} = require("../db/models");

describe("Repository Test", () => {

    it("Repository private", (done) =>{
        axios({
            method: "get",
            url: "http://localhost:6001/repositories/2",
        }).catch(err => {
            assert.equal(err.response.data.message, "REPOSITORY_PRIVATE");
            done();
        })
    })

    it("Repository name repeated", (done) =>{
        axios({
            method: "post",
            url: "http://localhost:6001/repositories",
            data: {name: "Customer Metrics Technician", visibility: true, userId: 1},
        }).catch(err => {
            assert.equal(err.response.data.message, "REPOSITORY_NAME_REPEATED");
            done();
        })
    })

    let nameBegin = "FINAL TP2 SLUG";

    it("Slug created correctly", (done) =>{
        axios({
            method: "post",
            url: "http://localhost:6001/repositories",
            data: {name: nameBegin, visibility: true, userId: 1},
        }).then(response => {
            assert.equal(response.data.message, "SLUG_CREATED");
            done();
        })
    })

    after(function () {
        return Repository.destroy({
            where: { name: nameBegin},
        });
      });

})