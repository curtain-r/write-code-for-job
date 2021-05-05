/**
 * call
 * apply
 * bind
 */

Function.prototype._call = function() {
  let context = arguments[0];
  context = context || window;
  let args = Array.slice(this.arguments)
}