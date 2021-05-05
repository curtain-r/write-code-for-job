const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class promise {
    constructor(executor) {
        this.status = PENDING;

        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];

        let resolve = value => {
            if (this.status === PENDING) {
                this.status === FULFILLED;
                this.value = value;
                this.onFulfilledCallback.forEach(callback => callback());
            }
        }
        let reject = reason => {
            if (this.status === REJECTED) {
                this.status === REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach(callback => callback());
            }
        }

        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;


        let nextPromise = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        promiseResolutionProcedure(nextPromise, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        promiseResolutionProcedure(nextPromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            } else {
                this.onFulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            promiseResolutionProcedure(nextPromise, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    })
                });
                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            promiseResolutionProcedure(nextPromise, x, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    })
                })
            }
        })
        return nextPromise;
    }
}


// 最难的promiseResolutionProcedure
function promiseResolutionProcedure(promise, x, resolve, reject) {
    if (x === promise) {
        reject(new TypeError('chaining cycle'));
    }
    if (x && typeof x === 'object' || typeof x === 'function') {
        let used = false;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (used) return;
                    used = true;
                    promiseResolutionProcedure(promise, y, resolve, reject);
                }, reason => {
                    if(used) return;
                    used = true;
                    reject(reason);
                })
            } else {
                if(used) return;
                used = true;
                resolve(x);
            }
        } catch (e) {
            if (used) return;
            used = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

Promise.defer = Promise.deferred = function() {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};

module.exports = Promise;