(function () {
  'use strict';
  var Index = require('../../src/inverted-index');
  var invertedIndex;
  var documentLength;

  describe('Initialises Index object', function () {
    beforeEach(function () {
      invertedIndex = new Index();
      invertedIndex.createIndex(true, require('../books'));
    });

    describe('Read book data', function () {
      it('Checks if datasource is populated ', function (done) {
        setTimeout (function () {
          expect(invertedIndex.emptyDatasource.isEmpty).toBe(false);
          expect(invertedIndex.jsonDocument.jsonFile).not.toBe([]);
          //asserts json file read are strings
          invertedIndex.jsonDocument.jsonFile.forEach(function (value) {
            value.map(function (obj) {
              expect(typeof obj.title).toEqual('string');
              expect(typeof obj.text).toEqual('string');
            });
          });
          expect(invertedIndex.documentLength).toBeGreaterThan(0);
          expect(invertedIndex.documentLength).toEqual(2);
          //assigns a value to documenlength
          documentLength = invertedIndex.documentLength;
          done();
        },500);
      });
    });
  });

  describe('Populate Index', function () {
    it('Index are created when json file is read', function (done) {
      expect(invertedIndex.indexCreated.isCreated).toBe(true);
      invertedIndex.createIndex(true, require('../read'));
      setTimeout (function () {
        // document length which shows create index did not overwrite previous
        expect(invertedIndex.documentLength).toBeGreaterThan(2);
        done();
      }, 500);
    });
  });

  describe('Index Mapping', function () {
    it('Index are mapped to correct strings', function (done) {
      expect(invertedIndex.getIndex().and).toEqual([0, 1]);
      expect(invertedIndex.getIndex().alice).toEqual([0]);
      expect(invertedIndex.getIndex('alice')).toEqual([0]);
      expect(invertedIndex.getIndex().seek).toEqual([1]);
      expect(invertedIndex.getIndex().of).toEqual([0, 1]);
      setTimeout (function () {
        // testing index mapping
        expect(invertedIndex.getIndex().and).toEqual([0, 1]);
        expect(invertedIndex.getIndex().concise).toEqual([3]);
        expect(invertedIndex.getIndex().pocahontas).toEqual([2]);
        expect(invertedIndex.getIndex().a).toEqual([0, 1, 2]);
        done();
      }, 500);
    });
  });

  describe('Search Index', function () {
    it('Search index returns object with search query', function (done) {
      setTimeout (function () {
        expect(invertedIndex.searchIndex('and')).toEqual([0, 1]);
        expect(invertedIndex.searchIndex('alice')).toEqual([0]);
        expect(invertedIndex.searchIndex('')).toEqual('');
        var pastDate = new Date();
        expect(invertedIndex.searchIndex('wonderland')).toEqual([0]);
        expect(invertedIndex.searchIndex('alice and wonderland in'))
          .toEqual([ [ 0 ], [ 0, 1 ], [ 0 ], [ 0 ] ] );
          // test complicated search works
        expect(invertedIndex.searchIndex('Wonderland ?  . concise in ' +
          '/ pocahontas, seek'))
          .toEqual([[ 0 ], [ 3 ], [ 0 ], [ 2 ], [ 1 ]] );
          // test an array passed into the search works
        expect(invertedIndex.searchIndex([['alice', 'and', 'wonderland']]))
          .toEqual([ [ 0 ], [ 0, 1 ], [ 0 ] ] );
        expect(invertedIndex.searchIndex(['wonderland'])).toEqual([0]);
        expect(invertedIndex.searchIndex('wonderland')).toEqual([0]);
        expect(invertedIndex.searchIndex('alice and wonderland in'))
          .toEqual([ [ 0 ], [ 0, 1 ], [ 0 ], [ 0 ] ] );
        var presentDate = new  Date();
        // test time to complete 7 search's will be less than 5 milliseconds
        expect(presentDate.getMilliseconds() - pastDate.getMilliseconds())
          .toBeLessThan(5);
        done();
      }, 500);
    });
  });

  }());