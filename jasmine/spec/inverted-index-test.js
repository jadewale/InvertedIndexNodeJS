/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global expect */
'use strict'

var invertedindex;

describe("Read book data", function() {


  describe('test something', function() {
    beforeEach( function (){
      invertedindex = new Index();
      invertedindex.createIndex(invertedindex.getHostAddress()+'/books.json');
      }) ;
    it('Checks if datasource is populated ', function(done) {
        setTimeout(function() {
            expect(invertedindex.emptyDatasource.isEmpty).toBe(false);
            //check is empty datasource flag is empty
            expect(invertedindex.emptyDatasource.isEmpty).toBe(false);
            //check taht datasource file is not empty array
            expect(invertedindex.jsonDocument.jsonfile).not.toBe([]);
            //check document length > 0
            expect(invertedindex.documentLength).toBeGreaterThan(0);
            done();
        },1000);
    });
});


});



describe("Populate Index", function() {
  it("Index are created when json file is read", function() {
    //check index created is true
    expect(invertedindex.indexCreated.isCreated).toBe(true);
  });
});

describe("Index Mapping", function() {
  it("Index are mapped to correct strings", function() {

    //set keyword to alice and test index
    expect(invertedindex.getIndex('alice')).toEqual([0, 1]);

    //set keyword to and then test index
    expect(invertedindex.getIndex("and")).toEqual([1]);

    //add upper case A and test index
    expect(invertedindex.getIndex("AliCe")).toEqual([0, 1]);

    //search empty word and test index
    expect(invertedindex.getIndex("")).toEqual(undefined);
  });
});
/*
describe("Search Index", function() {
  it("Search index returns object with search query", function() {

    //test search with alice
    invertedindex.keyword = "alice";
    expect(invertedindex.lowerCaseTransform(invertedindex.document.jsonfile[0].title)).
    toContain(invertedindex.lowerCaseTransform(invertedindex.keyword));

      //test search upper case
    invertedindex.keyword = "alIce";
    expect(invertedindex.lowerCaseTransform(invertedindex.document.jsonfile[0].title)).
    toContain(invertedindex.lowerCaseTransform(invertedindex.keyword));


      //test search with non words
    invertedindex.keyword = "alIce..";
    expect(invertedindex.lowerCaseTransform(invertedindex.document.jsonfile[0].title)).
    toContain(replaceNonWord(invertedindex.lowerCaseTransform(invertedindex.keyword)));
  });
});
*/