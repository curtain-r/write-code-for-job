all(promises) {
  let resolves = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(
        value => {
          resolves.push(value);
          if(resolves.length === promise.length) {
            resolve(resolves);
          }
        },
        reason => {
          reject(reason);
        }
      )
    })
  })
}