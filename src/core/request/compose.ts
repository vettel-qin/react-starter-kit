function compose(stack: any[]) {
  if (!Array.isArray(stack)) {
    throw new TypeError('Middlewares must be an array!');
  }
  if (stack.some(fn => typeof fn !== 'function')) {
    throw new TypeError('Middleware must be a functions!');
  }

  return function dispatch(context: any, done: any) {
    let index = -1;

    function next(i: number) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      index = i;

      let fn = stack[i];

      if (i === stack.length) fn = done;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, () => next(i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
   }

    return next(0);
  };
}

export default compose;
