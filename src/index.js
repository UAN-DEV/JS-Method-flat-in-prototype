"use strict";

// Необходимо реализовать собственный метод массива flat в прототипе.
// Можно использовать другие методы прототипа, которые мы уже реализовали. Например concat и forEach.
// Используйте рекурсию.
// При выполнении задания, для упрощения, не нужно учитывать стандартные массивы. Только наши собственные "массивы".

function MyArray() {
  this.length = 0;
  for (let i = 0; i < arguments.length; i++) this[this.length++] = arguments[i];
}

MyArray.prototype.flat = function (depth = 1) {
  if (!(this instanceof MyArray) && !Array.isArray(this)) return this;

  const dep = Number.isNaN(depth) || Number(depth) < 0 ? 0 : Number(depth);
  const resArr = new MyArray();
  for (let i = 0; i < this.length; i++) {
    const item = this[i];
    if (item === undefined) continue;
    if (dep >= 1 && (item instanceof MyArray || Array.isArray(item))) {
      const arrInArr = MyArray.prototype.flat.call(item, dep - 1);
      for (let j = 0; j < arrInArr.length; j++) resArr[resArr.length++] = arrInArr[j];
    } else {
      resArr[resArr.length++] = item;
    }
  }
  return resArr;
};

/// Test of custome flat method
const myArr = new MyArray(1, 2);
const myArr2 = new MyArray(3, myArr, 4);
const myArr3 = new MyArray(5, 6, myArr2);
const myArr4 = new MyArray(7, 8, myArr3, 9);
const arr = [
  10,
  ,
  ,
  myArr,
  ,
  "L1",
  11,
  ,
  ["L2", 12, 13],
  [14, , , 15, [16, 17, myArr]],
  18,
  ,
  [19, 20, myArr],
  myArr2,
  ,
  null
  ,
  myArr3,
  ,
  ,
  [21, myArr2, [22, [myArr3, 23, myArr4]]],
  [24, 25, [myArr2, 26, 27, myArr2]],
  myArr4,
];

const myArr1 = new MyArray(...arr);

console.log(myArr1.flat(Infinity));
