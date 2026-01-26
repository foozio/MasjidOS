"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/layout",{

/***/ "(app-pages-browser)/./src/lib/actions.ts":
/*!****************************!*\
  !*** ./src/lib/actions.ts ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authenticate: function() { return /* binding */ authenticate; },
/* harmony export */   createAsset: function() { return /* binding */ createAsset; },
/* harmony export */   createDocument: function() { return /* binding */ createDocument; },
/* harmony export */   createEvent: function() { return /* binding */ createEvent; },
/* harmony export */   createTransaction: function() { return /* binding */ createTransaction; },
/* harmony export */   handleSignOut: function() { return /* binding */ handleSignOut; },
/* harmony export */   updateTenantLogo: function() { return /* binding */ updateTenantLogo; }
/* harmony export */ });
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/client/app-call-server */ "(app-pages-browser)/./node_modules/next/dist/client/app-call-server.js");
/* harmony import */ var next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! private-next-rsc-action-client-wrapper */ "(app-pages-browser)/./node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js");



function __build_action__(action, args) {
  return (0,next_dist_client_app_call_server__WEBPACK_IMPORTED_MODULE_0__.callServer)(action.$$id, args)
}

/* __next_internal_action_entry_do_not_use__ {"128d209e5edc437f34b67714146d66210efc89cf":"handleSignOut","23788e1788e26020b184170218f4fb694208b850":"updateTenantLogo","3abebb0c97bffdfef620802fc775126d7d886153":"authenticate","4a586b07fe25f7f5ba3ccdf27357cf8bbca57c5e":"createEvent","5d4fc481c336474429edb2ad46d880192c3e1832":"createDocument","acf9746474dd0c284486a19a0e0a91cfd677b99a":"createAsset","cd912837e938d3bd0949452e08a813ae5a0fd3ee":"createTransaction"} */ var updateTenantLogo = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("23788e1788e26020b184170218f4fb694208b850");

var authenticate = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("3abebb0c97bffdfef620802fc775126d7d886153");
var handleSignOut = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("128d209e5edc437f34b67714146d66210efc89cf");
var createTransaction = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("cd912837e938d3bd0949452e08a813ae5a0fd3ee");
var createEvent = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("4a586b07fe25f7f5ba3ccdf27357cf8bbca57c5e");
var createDocument = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("5d4fc481c336474429edb2ad46d880192c3e1832");
var createAsset = (0,private_next_rsc_action_client_wrapper__WEBPACK_IMPORTED_MODULE_1__.createServerReference)("acf9746474dd0c284486a19a0e0a91cfd677b99a");



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ })

});