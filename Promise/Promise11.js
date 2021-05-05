const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];
    
    let resolve = value => {
      if (this.state === PENDING) {
        this.value = value;
        this.state = FULFILLED;
        this.onFulfilledCallback.forEach(callback => callback());
      }
    }
    let reject = reason => {
      if (this.state === PENDING) {
        this.reason = reason;
        this.state = REJECTED;
        this.onRejectedCallback.forEach(callback => callback());
      }
    }
    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    let nextPromise = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            promiseResolutionProcedure(nextPromise, x, reslove, reject);
          } catch (e) {
            reject(e);
          }
        })
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            promiseResolutiionProcedure(nextPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        })
      } else {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              let x = this.onFulfilled(this.value);
              promiseResolutionProcedure(nextPromise, x, resolve, rejct)
            }
          })
        })
      }
    })
  }
}