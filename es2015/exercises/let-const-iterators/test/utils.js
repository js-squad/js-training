'use strict';
const assert = require("assert");
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const utilsCode = fs.readFileSync(path.resolve(
    __dirname,
    '..',
    'lib',
    'utils.js'
    ), 'utf8');
const utils = require(path.resolve(
    __dirname,
    '..',
    'lib'
    ));

const esprima = require('esprima');
const estraverse = require('estraverse');

function traverseAndFindNodeType(ast, nodeType, filter) {
    function contains(obj1, obj2) {
        if(typeof obj2 === 'function') return obj2(obj1);
        if(!obj2 || _.isEmpty(obj2)) {
            return true;
        }

        return _.isEqual(_.pick(obj1, _.keys(obj2)), obj2);
    }
    let found = false;
    estraverse.traverse(ast, {
        enter(node) {
            if (node && node.type === nodeType &&
                contains(node, filter)) {
                found = true;
                this.break();
            }
        }
    });
    return found;
}

const ast = esprima.parse(utilsCode);

describe("utils", () => {

    it('shouldn\'t use arguments. use rest parameters instead', () => {
        assert(!traverseAndFindNodeType(ast, 'Identifier', (node) => {
            return node.name === 'arguments';
        }));
    });

    it('shouldn\'t be using "this" as the right side of a variable declaration.'
        + ' use the lexical binding of arrow functions', () => {
        assert(!traverseAndFindNodeType(ast, 'variableDeclarator', (node) => {
            return node.init.type === 'ThisExpression';
        }));
    });

    it('shouldn\'t be using "var" statement. use let or const instead', () => {
        assert(!traverseAndFindNodeType(ast, 'VariableDeclaration', (node) => {
            return node.kind === 'var';
        }));
    });

    it('shouldn\'t be using "forEach", "map" or "reduce". stick with "for...of"', () => {
        assert(!traverseAndFindNodeType(ast, 'MemberExpression', (node) => {
            return node.property.name === 'forEach' ||
                   node.property.name === 'map' ||
                   node.property.name === 'reduce';
        }));
    });

    describe('forEach', () => {
        it.skip('should throw if it doesn\'t receives an iterable', () => {
            assert.throws(() => utils.forEach(undefined));
            assert.throws(() => utils.forEach(1));
            assert.throws(() => utils.forEach(true));
            assert.throws(() => utils.forEach(null));
            assert.throws(() => utils.forEach({}));
        });

        it.skip('should iterate the elements correctly', () => {
            const expected = ['a', 'b', 'c'];
            let i = 0, called = false;

            utils.forEach('abc', (elem) => {
                called = true;
                assert(elem === expected[i]);
                i++;
            });
            i = 0;
            utils.forEach(['a', 'b', 'c'], (elem) => {
                assert(elem === expected[i]);
                i++;
            });

            assert(called);
        });
    });

    describe('multiply', () => {
        it.skip('should throw when no parameter is received', () => {
            assert.throws(() => utils.multiply());
        });
        it.skip('should return 0 when passing 0 as parameter', () => {
            assert(utils.multiply(0) === 0);
        });

        it.skip('should throw when passing a string, boolean, or object', () => {
            assert.throws(() => utils.multiply(true));
            assert.throws(() => utils.multiply("foo"));
            assert.throws(() => utils.multiply({}));
            assert.throws(() => utils.multiply(1,2, undefined, 4));
        });

        it.skip('should multiply correctly', () => {
            assert(utils.multiply(1,2,3) === 6);
        });
    });

    describe('makeIterable', () => {
        it.skip('should add the key Symbol.iterator to the object', () => {
            assert(utils.makeIterable({})[Symbol.iterator] !== undefined);
        });

        it.skip('should return an interator with "value" and "done" properties', () => {
            const obj = utils.makeIterable({}),
                  iterator = obj[Symbol.iterator]();
            assert(typeof iterator === 'object');
            assert(iterator !== null);
            assert(typeof iterator.next === 'function');

            const next = iterator.next();
            assert(next.done !== undefined);
            assert(next.value !== undefined);
        });

        it.skip('should return a correct iterator', () => {
            let i = 0;
            const expected = [['a', 5],['b', 8],['c', 13]];
            for(const x of utils.makeIterable({a:5, b: 8, c:13})) {
                assert(_.isEqual(x, expected[i]));
                i++;
            }
        });

        it.skip('should return the object passed as parameter', () => {
            const expected = {},
                  actual = utils.makeIterable(expected);
            assert(expected === actual);
        });
    });

    describe('entries', () => {
        it.skip('should throw if receives a non-object or null argument', () => {
            assert.throws(() => utils.entries(1));
            assert.throws(() => utils.entries(0));
            assert.throws(() => utils.entries(null));
            assert.throws(() => utils.entries(undefined));
            assert.throws(() => utils.entries(''));
            assert.doesNotThrow(() => utils.entries([]));
            assert.doesNotThrow(() => utils.entries({}));
            assert.doesNotThrow(() => utils.entries(() =>{}));
        });

        it.skip('should return an array of entries', () => {
            const expected = [['a', 5],['b', 8],['c', 13]];
            const actual = utils.entries({a:5, b:8, c:13});

            assert(_.isEqual(expected, actual));
        });
    });

});