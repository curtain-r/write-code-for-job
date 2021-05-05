function deepClone(obj) {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}

const a = {
  name: "sanguine",
  age: 20,
  like: [
    "game",
    "video",
    {
      a: 1,
      b: 2,
    },
  ],
  obj: {
    a: 1,
    b: 2,
  },
};
console.log(deepClone(a) == a);
