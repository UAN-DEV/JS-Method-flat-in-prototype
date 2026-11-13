"use strict";

// Необходимо реализовать собственный метод массива flat в прототипе.
// Можно использовать другие методы прототипа, которые мы уже реализовали. Например concat и forEach.
// Используйте рекурсию.
// При выполнении задания, для упрощения, не нужно учитывать стандартные массивы. Только наши собственные "массивы".

function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) this[this.length++] = args[i];
}

MyArray.prototype.flat = function (depth = 1) {
  if (!(this instanceof MyArray) && !Array.isArray(this)) return this;

  const numDepth = Number(depth);
  const dep = Number.isNaN(numDepth) || numDepth < 0 ? 0 : numDepth;

  const arr = new MyArray();
  for (let i = 0; i < this.length; i++)
    if (i in this && this[i] !== undefined) arr[arr.length++] = this[i];

  if (dep < 1) return arr;

  const arrFlat = new MyArray();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (item instanceof MyArray || Array.isArray(item)) {
      const arrDepth = MyArray.prototype.flat.call(item, dep - 1);
      for (let j = 0; j < arrDepth.length; j++) arrFlat[arrFlat.length++] = arrDepth[j]
    } else {arrFlat[arrFlat.length++] = item}
  }

  return arrFlat;
};

/// Test of custome flat method
const myArr = new MyArray(1, 11);
const myArr2 = new MyArray(2, 22);
const myArr3 = new MyArray(3, 33);
const myArr4 = new MyArray(4, 44);
const arr = [
  1,
  ,
  ,  ,
  ,
  "String",
  23,
  ,
  [12, 63, [1, , , 2, [3, 4, myArr]],
  15,
  ,[123, 125,myArr],
  myArr,],
  ,
  myArr,
  ,
  ,
  [2, myArr2, [3, [myArr3, 34, myArr4]]],
  [3, 31, [myArr2, 4, 45, myArr2]],
  myArr,
];
const myArr1 = new MyArray(...arr);
console.log(myArr1.flat(7));
