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
  if (!(this instanceof MyArray) && !(this instanceof Array)) return this;

  const numDepth = Number(depth);
  const dep = Number.isNaN(numDepth) || numDepth < 0 ? 0 : numDepth;

  const arr = new MyArray();
  for (let i = 0; i < this.length; i++) if (i in this) arr[arr.length++] = this[i]

  if (dep < 1) return arr;

  const arrFlat = new MyArray();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (item instanceof MyArray || Array.isArray(item)) {
      const arrDepth = item.flat(dep - 1);
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
  ,
  myArr,
  ,
  ,
  [2, myArr2, [3, [myArr3, 34, myArr4]]],
  [3, 31, [myArr2, 4, 45, myArr2]],
  myArr,
];
// const arr = [
//   ,
//   ,
//   "String",
//   23,
//   ,
//   [12, 63],
//   [1, , , 2, [3, 4, myArr]],
//   15,
//   ,[123, 125,myArr],
//   myArr,
//   ,
// ];
const myArr1 = new MyArray(...arr);
console.log(myArr1.flat(3));

const arr1 = [1, , , 2, [3, , 4, [123, , 125]]];
// console.log(arr1.flat(0)); // [1, 2, 3, 4]

// const arr2 = [1, 2, [3, 4, [5, 6]]];
// arr2.flat(); // [1, 2, 3, 4, [5, 6]]

// const arr3 = [1, 2, [3, 4, [5, 6]]];
// arr3.flat(2); // [1, 2, 3, 4, 5, 6]

// const arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
// arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const arr5 = [1, 2, , 4, 5];
// console.log(arr5.flat()); // [1, 2, 4, 5]

// const arr6 = [1, , 3, ["a", , "c"]];
// console.log(arr6.flat()); // [ 1, 3, "a", "c" ]

// const arr7 = [1, , 3, ["a", , ["d", , "e"]]];
// console.log(arr7.flat()); // [ 1, 3, "a", ["d", empty, "e"] ]
// console.log(arr7.flat(2)); // [ 1, 3, "a", "d", "e"]

// console.log({45}.flat(1))
