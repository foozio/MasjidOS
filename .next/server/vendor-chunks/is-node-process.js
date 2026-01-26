"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-node-process";
exports.ids = ["vendor-chunks/is-node-process"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-node-process/lib/index.mjs":
/*!****************************************************!*\
  !*** ./node_modules/is-node-process/lib/index.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isNodeProcess: () => (/* binding */ isNodeProcess)\n/* harmony export */ });\n// src/index.ts\nfunction isNodeProcess() {\n  if (typeof navigator !== \"undefined\" && navigator.product === \"ReactNative\") {\n    return true;\n  }\n  if (typeof process !== \"undefined\") {\n    const type = process.type;\n    if (type === \"renderer\" || type === \"worker\") {\n      return false;\n    }\n    return !!(process.versions && process.versions.node);\n  }\n  return false;\n}\n\n//# sourceMappingURL=index.mjs.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtbm9kZS1wcm9jZXNzL2xpYi9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHRTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFzamlkb3MvLi9ub2RlX21vZHVsZXMvaXMtbm9kZS1wcm9jZXNzL2xpYi9pbmRleC5tanM/MDBkYSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvaW5kZXgudHNcbmZ1bmN0aW9uIGlzTm9kZVByb2Nlc3MoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSBcIlJlYWN0TmF0aXZlXCIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCB0eXBlID0gcHJvY2Vzcy50eXBlO1xuICAgIGlmICh0eXBlID09PSBcInJlbmRlcmVyXCIgfHwgdHlwZSA9PT0gXCJ3b3JrZXJcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gISEocHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmV4cG9ydCB7XG4gIGlzTm9kZVByb2Nlc3Ncbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5tanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-node-process/lib/index.mjs\n");

/***/ })

};
;