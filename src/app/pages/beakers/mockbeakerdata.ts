import { ObjectId } from 'bson'
const ISODate = (datestr) => new Date(datestr);

export const mockdata = [{
  '_id': ObjectId.createFromHexString('472fb14c1675ee762ed2dc10'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:35:08.359Z'),
  'creditInfo': {
    'credit': 15,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-08T13:51:31.715Z'),
    'recoverTime': 14400,
  },
  'paid': true,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 8176653400,
  'totalTimes': 10131,
},
{
  '_id': ObjectId.createFromHexString('472fb1531675ee762ed2dc11'),
  '__v': 0,
  'group': 30,
  'createdAt': ISODate('2014-11-06T17:35:15.136Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 1412089100,
  'totalTimes': 1449,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1581675ee762ed2dc12'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:35:20.472Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 14400,
  },
  'paid': true,
  'unlimited': true,
  'useLegacy': false,
},
{
  '_id': ObjectId.createFromHexString('472fb1611675ee762ed2dc13'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:35:29.268Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 53417896850,
  'totalTimes': 40538,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb16c1675ee762ed2dc14'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:35:40.649Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 544118950,
  'totalTimes': 514,
  'unlimited': true,
  'useLegacy': false,
},
{
  '_id': ObjectId.createFromHexString('472fb1711675ee762ed2dc15'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:35:45.990Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 6998200000,
  'totalTimes': 6254,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1781675ee762ed2dc16'),
  '__v': 0,
  'group': 30,
  'createdAt': ISODate('2014-11-06T17:35:52.228Z'),
  'creditInfo': {
    'credit': 1,
    'creditMax': 10,
    'lastUpdate': ISODate('2015-10-10T04:52:07.871Z'),
    'recoverTime': 14400,
  },
  'paid': true,
  'unlimited': false,
  'useLegacy': true,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 404616900,
  'totalTimes': 339,
},
{
  '_id': ObjectId.createFromHexString('472fb17c1675ee762ed2dc17'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:35:56.394Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 1233595400,
  'totalTimes': 1160,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1ad1675ee762ed2dc18'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:36:45.877Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 14400,
  },
  'paid': true,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 2848911750,
  'totalTimes': 2366,
},
{
  '_id': ObjectId.createFromHexString('472fb1b21675ee762ed2dc19'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:36:50.447Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 36680594250,
  'totalTimes': 26944,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1b71675ee762ed2dc1a'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:36:55.523Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 14400,
  },
  'paid': true,
  'unlimited': true,
  'useLegacy': false,
},
{
  '_id': ObjectId.createFromHexString('472fb1bc1675ee762ed2dc1b'),
  '__v': 0,
  'group': 30,
  'createdAt': ISODate('2014-11-06T17:37:00.027Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 9520592450,
  'totalTimes': 10234,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1c41675ee762ed2dc1c'),
  '__v': 0,
  'group': 8,
  'createdAt': ISODate('2014-11-06T17:37:08.752Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 14400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
  'totalScore': 57000000,
  'totalTimes': 57,
},
{
  '_id': ObjectId.createFromHexString('472fb1c91675ee762ed2dc1d'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:37:13.023Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 14400,
  },
  'paid': true,
  'unlimited': true,
  'useLegacy': false,
},
{
  '_id': ObjectId.createFromHexString('472fb1cd1675ee762ed2dc1e'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:37:17.686Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 36000,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 133350000,
  'totalTimes': 114,
  'unlimited': true,
  'useLegacy': false,
},
{
  '_id': ObjectId.createFromHexString('472fb1d21675ee762ed2dc1f'),
  '__v': 0,
  'group': 48,
  'createdAt': ISODate('2014-11-06T17:37:22.140Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 4808910000,
  'totalTimes': 4298,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1d71675ee762ed2dc20'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:37:27.248Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 9276420000,
  'totalTimes': 7668,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1e91675ee762ed2dc21'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:37:45.266Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-08T18:22:17.817Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 2954061800,
  'totalTimes': 13422,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1ee1675ee762ed2dc22'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:37:50.357Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 51426690700,
  'totalTimes': 44863,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
},
{
  '_id': ObjectId.createFromHexString('472fb1f31675ee762ed2dc23'),
  '__v': 0,
  'group': -1,
  'createdAt': ISODate('2014-11-06T17:37:55.443Z'),
  'creditInfo': {
    'credit': 30,
    'creditMax': 20,
    'lastUpdate': ISODate('2014-11-06T17:30:21.235Z'),
    'recoverTime': 86400,
  },
  'paid': true,
  'arrData': Array.apply(null, {length: 20}).map(o => Math.random()),
  'qqq': { a: true, b: false},
  'empty': null,
  'totalScore': 7593210000,
  'totalTimes': 7190,
  'unlimited': true,
  'useLegacy': false,
  'promoteInfo': {
    'incValue': 1,
    'maxTimes': 20,
  },
}]
