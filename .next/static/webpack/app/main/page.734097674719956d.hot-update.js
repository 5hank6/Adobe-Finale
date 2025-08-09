/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/main/page",{

/***/ "(app-pages-browser)/./app/main/page.tsx":
/*!***************************!*\
  !*** ./app/main/page.tsx ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MainPage)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_add_sources_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/add-sources-modal */ \"(app-pages-browser)/./components/add-sources-modal.tsx\");\n/* harmony import */ var _components_studio_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/studio-layout */ \"(app-pages-browser)/./components/studio-layout.tsx\");\n/* harmony import */ var _components_studio_layout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_components_studio_layout__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction MainPage() {\n    _s();\n    const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const [sources, setSources] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const handleFilesAdded = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)({\n        \"MainPage.useCallback[handleFilesAdded]\": (files)=>{\n            // Map selected files into sidebar entries\n            const next = files.map({\n                \"MainPage.useCallback[handleFilesAdded].next\": (f)=>({\n                        id: \"\".concat(f.name, \"-\").concat(crypto.randomUUID()),\n                        name: f.name,\n                        status: \"processing\"\n                    })\n            }[\"MainPage.useCallback[handleFilesAdded].next\"]);\n            setSources({\n                \"MainPage.useCallback[handleFilesAdded]\": (prev)=>[\n                        ...prev,\n                        ...next\n                    ]\n            }[\"MainPage.useCallback[handleFilesAdded]\"]);\n            // Simulate processing -> ready\n            setTimeout({\n                \"MainPage.useCallback[handleFilesAdded]\": ()=>{\n                    setSources({\n                        \"MainPage.useCallback[handleFilesAdded]\": (prev)=>prev.map({\n                                \"MainPage.useCallback[handleFilesAdded]\": (s)=>next.find({\n                                        \"MainPage.useCallback[handleFilesAdded]\": (n)=>n.id === s.id\n                                    }[\"MainPage.useCallback[handleFilesAdded]\"]) ? {\n                                        ...s,\n                                        status: \"ready\"\n                                    } : s\n                            }[\"MainPage.useCallback[handleFilesAdded]\"])\n                    }[\"MainPage.useCallback[handleFilesAdded]\"]);\n                }\n            }[\"MainPage.useCallback[handleFilesAdded]\"], 1200);\n        }\n    }[\"MainPage.useCallback[handleFilesAdded]\"], []);\n    const onOpenAdd = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)({\n        \"MainPage.useCallback[onOpenAdd]\": ()=>setOpen(true)\n    }[\"MainPage.useCallback[onOpenAdd]\"], []);\n    const title = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)({\n        \"MainPage.useMemo[title]\": ()=>{\n            var _sources_;\n            return ((_sources_ = sources[0]) === null || _sources_ === void 0 ? void 0 : _sources_.name) ? sources[0].name.replace(/\\.[^.]+$/, \"\") : \"Your Project\";\n        }\n    }[\"MainPage.useMemo[title]\"], [\n        sources\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-[100dvh] bg-[rgb(20,21,23)] text-white\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_add_sources_modal__WEBPACK_IMPORTED_MODULE_2__.AddSourcesModal, {\n                open: open,\n                onOpenChange: setOpen,\n                onFilesAdded: handleFilesAdded\n            }, void 0, false, {\n                fileName: \"/Users/shashank/Downloads/Adobe-Finale/app/main/page.tsx\",\n                lineNumber: 38,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_studio_layout__WEBPACK_IMPORTED_MODULE_3__.StudioLayout, {\n                title: title,\n                sources: sources,\n                onOpenAdd: onOpenAdd\n            }, void 0, false, {\n                fileName: \"/Users/shashank/Downloads/Adobe-Finale/app/main/page.tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/shashank/Downloads/Adobe-Finale/app/main/page.tsx\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, this);\n}\n_s(MainPage, \"yFM0nppkSa8CToIQmTgWyJceHoM=\");\n_c = MainPage;\nvar _c;\n$RefreshReg$(_c, \"MainPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9tYWluL3BhZ2UudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVzRDtBQUNVO0FBQ1A7QUFRMUMsU0FBU0s7O0lBQ3RCLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHTCwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNNLFNBQVNDLFdBQVcsR0FBR1AsK0NBQVFBLENBQVcsRUFBRTtJQUVuRCxNQUFNUSxtQkFBbUJWLGtEQUFXQTtrREFBQyxDQUFDVztZQUNwQywwQ0FBMEM7WUFDMUMsTUFBTUMsT0FBT0QsTUFBTUUsR0FBRzsrREFBQyxDQUFDQyxJQUFPO3dCQUM3QkMsSUFBSSxHQUFhQyxPQUFWRixFQUFFRyxJQUFJLEVBQUMsS0FBdUIsT0FBcEJELE9BQU9FLFVBQVU7d0JBQ2xDRCxNQUFNSCxFQUFFRyxJQUFJO3dCQUNaRSxRQUFRO29CQUNWOztZQUNBVjswREFBVyxDQUFDVyxPQUFTOzJCQUFJQTsyQkFBU1I7cUJBQUs7O1lBQ3ZDLCtCQUErQjtZQUMvQlM7MERBQVc7b0JBQ1RaO2tFQUFXLENBQUNXLE9BQVNBLEtBQUtQLEdBQUc7MEVBQUMsQ0FBQ1MsSUFBT1YsS0FBS1csSUFBSTtrRkFBQyxDQUFDQyxJQUFNQSxFQUFFVCxFQUFFLEtBQUtPLEVBQUVQLEVBQUU7bUZBQUk7d0NBQUUsR0FBR08sQ0FBQzt3Q0FBRUgsUUFBUTtvQ0FBUSxJQUFJRzs7O2dCQUN0Rzt5REFBRztRQUNMO2lEQUFHLEVBQUU7SUFFTCxNQUFNRyxZQUFZekIsa0RBQVdBOzJDQUFDLElBQU1PLFFBQVE7MENBQU8sRUFBRTtJQUVyRCxNQUFNbUIsUUFBUXpCLDhDQUFPQTttQ0FBQztnQkFBT087bUJBQUFBLEVBQUFBLFlBQUFBLE9BQU8sQ0FBQyxFQUFFLGNBQVZBLGdDQUFBQSxVQUFZUyxJQUFJLElBQUdULE9BQU8sQ0FBQyxFQUFFLENBQUNTLElBQUksQ0FBQ1UsT0FBTyxDQUFDLFlBQVksTUFBTTs7a0NBQWlCO1FBQUNuQjtLQUFRO0lBRXBILHFCQUNFLDhEQUFDb0I7UUFBSUMsV0FBVTs7MEJBRWIsOERBQUMxQiwwRUFBZUE7Z0JBQUNHLE1BQU1BO2dCQUFNd0IsY0FBY3ZCO2dCQUFTd0IsY0FBY3JCOzs7Ozs7MEJBRWxFLDhEQUFDTixtRUFBWUE7Z0JBQUNzQixPQUFPQTtnQkFBT2xCLFNBQVNBO2dCQUFTaUIsV0FBV0E7Ozs7Ozs7Ozs7OztBQUcvRDtHQTlCd0JwQjtLQUFBQSIsInNvdXJjZXMiOlsiL1VzZXJzL3NoYXNoYW5rL0Rvd25sb2Fkcy9BZG9iZS1GaW5hbGUvYXBwL21haW4vcGFnZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcblxuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IEFkZFNvdXJjZXNNb2RhbCB9IGZyb20gXCJAL2NvbXBvbmVudHMvYWRkLXNvdXJjZXMtbW9kYWxcIlxuaW1wb3J0IHsgU3R1ZGlvTGF5b3V0IH0gZnJvbSBcIkAvY29tcG9uZW50cy9zdHVkaW8tbGF5b3V0XCJcblxudHlwZSBTb3VyY2UgPSB7XG4gIGlkOiBzdHJpbmdcbiAgbmFtZTogc3RyaW5nXG4gIHN0YXR1czogXCJwcm9jZXNzaW5nXCIgfCBcInJlYWR5XCJcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpblBhZ2UoKSB7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKHRydWUpXG4gIGNvbnN0IFtzb3VyY2VzLCBzZXRTb3VyY2VzXSA9IHVzZVN0YXRlPFNvdXJjZVtdPihbXSlcblxuICBjb25zdCBoYW5kbGVGaWxlc0FkZGVkID0gdXNlQ2FsbGJhY2soKGZpbGVzOiBGaWxlW10pID0+IHtcbiAgICAvLyBNYXAgc2VsZWN0ZWQgZmlsZXMgaW50byBzaWRlYmFyIGVudHJpZXNcbiAgICBjb25zdCBuZXh0ID0gZmlsZXMubWFwKChmKSA9PiAoe1xuICAgICAgaWQ6IGAke2YubmFtZX0tJHtjcnlwdG8ucmFuZG9tVVVJRCgpfWAsXG4gICAgICBuYW1lOiBmLm5hbWUsXG4gICAgICBzdGF0dXM6IFwicHJvY2Vzc2luZ1wiIGFzIGNvbnN0LFxuICAgIH0pKVxuICAgIHNldFNvdXJjZXMoKHByZXYpID0+IFsuLi5wcmV2LCAuLi5uZXh0XSlcbiAgICAvLyBTaW11bGF0ZSBwcm9jZXNzaW5nIC0+IHJlYWR5XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRTb3VyY2VzKChwcmV2KSA9PiBwcmV2Lm1hcCgocykgPT4gKG5leHQuZmluZCgobikgPT4gbi5pZCA9PT0gcy5pZCkgPyB7IC4uLnMsIHN0YXR1czogXCJyZWFkeVwiIH0gOiBzKSkpXG4gICAgfSwgMTIwMClcbiAgfSwgW10pXG5cbiAgY29uc3Qgb25PcGVuQWRkID0gdXNlQ2FsbGJhY2soKCkgPT4gc2V0T3Blbih0cnVlKSwgW10pXG5cbiAgY29uc3QgdGl0bGUgPSB1c2VNZW1vKCgpID0+IChzb3VyY2VzWzBdPy5uYW1lID8gc291cmNlc1swXS5uYW1lLnJlcGxhY2UoL1xcLlteLl0rJC8sIFwiXCIpIDogXCJZb3VyIFByb2plY3RcIiksIFtzb3VyY2VzXSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtWzEwMGR2aF0gYmctW3JnYigyMCwyMSwyMyldIHRleHQtd2hpdGVcIj5cbiAgICAgIHsvKiBNb2RhbCBvcGVucyBvbiBmaXJzdCBsb2FkOyBjbG9zZXMgb24gdXBsb2FkIG9yIG1hbnVhbCBjbG9zZSAqL31cbiAgICAgIDxBZGRTb3VyY2VzTW9kYWwgb3Blbj17b3Blbn0gb25PcGVuQ2hhbmdlPXtzZXRPcGVufSBvbkZpbGVzQWRkZWQ9e2hhbmRsZUZpbGVzQWRkZWR9IC8+XG5cbiAgICAgIDxTdHVkaW9MYXlvdXQgdGl0bGU9e3RpdGxlfSBzb3VyY2VzPXtzb3VyY2VzfSBvbk9wZW5BZGQ9e29uT3BlbkFkZH0gLz5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl0sIm5hbWVzIjpbInVzZUNhbGxiYWNrIiwidXNlTWVtbyIsInVzZVN0YXRlIiwiQWRkU291cmNlc01vZGFsIiwiU3R1ZGlvTGF5b3V0IiwiTWFpblBhZ2UiLCJvcGVuIiwic2V0T3BlbiIsInNvdXJjZXMiLCJzZXRTb3VyY2VzIiwiaGFuZGxlRmlsZXNBZGRlZCIsImZpbGVzIiwibmV4dCIsIm1hcCIsImYiLCJpZCIsImNyeXB0byIsIm5hbWUiLCJyYW5kb21VVUlEIiwic3RhdHVzIiwicHJldiIsInNldFRpbWVvdXQiLCJzIiwiZmluZCIsIm4iLCJvbk9wZW5BZGQiLCJ0aXRsZSIsInJlcGxhY2UiLCJkaXYiLCJjbGFzc05hbWUiLCJvbk9wZW5DaGFuZ2UiLCJvbkZpbGVzQWRkZWQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/main/page.tsx\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/studio-layout.tsx":
/*!**************************************!*\
  !*** ./components/studio-layout.tsx ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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