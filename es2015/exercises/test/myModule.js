'use strict';
var assert = require("assert");
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var myModuleCode = fs.readFileSync(path.resolve(
    __dirname,
    '..',
    'lib',
    'myModule.js'
    ), 'utf8');
var myModule = require(path.resolve(
    __dirname,
    '..',
    'lib'
    ));

var esprima = require('esprima');
var estraverse = require('estraverse');

function traverseAndFindNodeType(ast, nodeType, filter) {
    function contains(obj1, obj2) {
        if(typeof obj2 === 'function') return obj2(obj1);
        if(!obj2 || _.isEmpty(obj2)) {
            return true;
        }

        return _.isEqual(_.pick(obj1, _.keys(obj2)), obj2);
    }
    var found = false;
    estraverse.traverse(ast, {
        enter: function (node) {
            if (node && node.type === nodeType &&
                contains(node, filter)) {
                found = true;
                this.break();
            }
        }
    });
    return found;
}

var ast = esprima.parse(myModuleCode);

describe("myModule", function () {

    it.skip('should use default parameters', function() {
        var filter = function(node) {
            return node.defaults && node.defaults.length !== 0;
        };
        var fnDeclaration = traverseAndFindNodeType(ast, 'FunctionDeclaration', filter);
        var fnExpression = traverseAndFindNodeType(ast, 'FunctionExpression', filter);
        var arrowExpression = traverseAndFindNodeType(ast, 'ArrowFunctionExpression', filter);

        assert(fnDeclaration || fnExpression || arrowExpression);
    });

    describe('sum', function() {
        it.skip('should sum correctly', function() {
            assert(myModule.sum(0,1,2) === 3);
            assert(myModule.sum() === 0);
        });

        it.skip('should use rest', function() {
            assert(traverseAndFindNodeType(ast, 'RestElement'));
        });
    });

    describe('sumArray', function() {
        it.skip('should sum arrays correctly', function() {
            assert(myModule.sumArray([0,1,2]) === 3);
            assert(myModule.sumArray([]) === 0);
            assert(myModule.sumArray() === 0);
        });

        it.skip('should use spread', function() {
            assert(traverseAndFindNodeType(ast, 'SpreadElement'));
        });
    });

    describe('sumArrayOfArrays', function() {
        it.skip('should sum arrays of arrays correctly', function() {
            assert(myModule.sumArrayOfArrays([[0],[1],[2]]) === 3);
            assert(myModule.sumArrayOfArrays([]) === 0);
            assert(myModule.sumArrayOfArrays() === 0);
        });

        it.skip('should use arrow functions', function() {
            assert(traverseAndFindNodeType(ast, 'ArrowFunctionExpression'));
        });

        it.skip('shouldn\'t be using "this" as the right side of a variable declaration', function() {
            assert(!traverseAndFindNodeType(ast, 'VariableDeclarator', function(node) {
                return node.init.type === 'ThisExpression';
            }));
        });
    });

    describe('pluck', function() {
        it.skip('should pluck correctly', function() {
            assert(_.isEqual(myModule.pluck([{a:3}, {a:5}, {a:8}], 'a'), [3,5,8]));
            assert(_.isEqual(myModule.pluck([]), []));
            assert(_.isEqual(myModule.pluck([{}, {}], 'b'), [undefined, undefined]));
        });

        it.skip('should use destructuring', function() {
            assert(traverseAndFindNodeType(ast, 'ObjectPattern'));
        });

        it.skip('should use enhanced object literals', function() {
            assert(traverseAndFindNodeType(ast, 'Property', function(node) {
                return node.shorthand || node.computed;
            }));
        });
    });

});