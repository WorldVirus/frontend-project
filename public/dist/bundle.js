/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Модуль, реализующий общее поведение для каждого блока
 * @module Block
 */
class Block {
    constructor(...args) {
        this._eventsListening = [];
        this._childBlocks = {};

        if (typeof args[0] === 'string') {
            let tagName = args[0];
            let classes = args[1] || [];
            let attrs = args[2] || {};

            this._element = document.createElement(tagName);
            classes.forEach(className => {
                this._element.classList.add(className);
            });
            for (let name in attrs) {
                this._element.setAttribute(name, attrs[name]);
            }
        } else if (args[0] instanceof Node) {
            this._element = args[0];
        }
        this.template = null;
    }

    setText(text) {
        this._element.textContent = text;
        return this;
    }

    appendChildBlock(blockName, block) {
        this._element.appendChild(block._element);
        this._childBlocks[blockName] = block;
        return this;
    }

    removeAllChildren() {
        for (let blockName in this._childBlocks) {
            this._element.removeChild(this._childBlocks[blockName]._element);
            delete this._childBlocks[blockName];
        }
    }

    on(event, callback) {
        console.log('on inside');
        if (this._eventsListening.indexOf(event) === -1) {
            this._element.addEventListener(event, callback);
            console.log('on works');

            this._eventsListening.push(event);
        }
    }

    hasAttribute(attribute) {
        return this._element.hasAttribute(attribute);
    }

    setAttribute(attribute, value) {
        this._element.setAttribute(attribute, value);
    }

    getAttribute(attribute) {
        return +this._element.getAttribute(attribute);
    }

    removeAttribute(attribute) {
        this._element.removeAttribute(attribute);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Block);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {class Utils {
  static resize(gl) {
    let displayWidth = window.screen.availWidth;
    let displayHeight = window.screen.availHeight;
    if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;
    }
    gl.viewport(0, 0, window.screen.availWidth, window.screen.availHeight);
  }

  static madeRectangle(x0, y0, width, height) {
    return [x0, y0, width, y0, x0, height, x0, height, width, y0, width, height];
  }

  static translationOnMap(i, j) {
    return [global.mapShiftX + j * (1.2 / 16), global.mapShiftY - i * (1.2 / 16) * 16 / 9];
  }

  static translationForUnits(unit) {
    return [global.mapShiftX - 0.08 + unit.xpos * (1.2 / 16), global.mapShiftY - unit.ypos * (1.2 / 16) * 16 / 9 + 1.2 / 12 * 16 / 9];
  }

  static transOnLowbar(i) {
    return [-0.95, 0.65 - i * 0.17];
  }

  static transOnLowbarHealth(i) {
    return [-0.95, 0.65 - i * 0.17 - 0.14];
  }

  static transActiveCircle(i) {
    return [-0.95 - 0.03, 0.65 - i * 0.17 - 0.05];
  }

  static transActionPoint(i) {
    return [-0.95 + 0.085, 0.65 - i * 0.17 - 0.032];
  }

  static transForHealthbar(unit) {
    return [global.mapShiftX + 0.003 + unit.xpos * (1.2 / 16), global.mapShiftY - unit.ypos * (1.2 / 16) * 16 / 9 + 1.2 / 17 * 16 / 9];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_main__ = __webpack_require__(8);


class Router {

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = new Map();

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.set(path, view);

        return this;
    }

    navigate() {
        window.onpopstate = event => {
            this.go(window.location.pathname);
        };

        document.body.addEventListener('click', event => {

            if (event.target.tagName.toLowerCase() === 'a') {

                event.preventDefault();
                const element = event.target;
                const pathname = element.getAttribute('value');

                if (pathname !== null) {
                    this.go(pathname);
                }
            }
        });
        this.go(window.location.pathname);
    }

    go(path) {
        let view = this.routes.get(path);
        if (!view) {
            document.body.innerHTML = '<h class="notfound"> We didnot do such page )';
            return;
        }

        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }

        view.creation();
        if (path === '/login') {

            Object(__WEBPACK_IMPORTED_MODULE_0__views_main__["signin"])(view);
        } else if (path === '/signup') {
            Object(__WEBPACK_IMPORTED_MODULE_0__views_main__["signup"])(view);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Router;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(26);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Константы для проверки размеров полей
 */
const MAX_LOGIN_LENGTH = 30;
const MIN_LOGIN_LENGTH = 3;

const MAX_PASSWORD_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 4;

/**
 * Класс для валидации полей
 * методы возвращают true если валидация прошла или строку с текстом ошибки
 * @class Validate
 */
class Validate {

    static userError() {
        let nameForm = 'form.login-form';
        if (document.querySelector('form.login-form') === null) {
            nameForm = 'form.registration-form';
        }
        let form = document.querySelector(nameForm);

        let div = document.createElement('div');
        div.className = "message-error";
        div.innerHTML = "<p> Sorry,user is already exist </p> ";
        if (form.getElementsByTagName('p').length === 0) {
            form.appendChild(div);
        }
    }
    static formError(formName) {
        let form = document.querySelector(formName);
        let div = document.createElement('div');
        div.className = "message-error";
        div.innerHTML = "<p> Hey,not valid data input :) </p> ";
        if (form.getElementsByTagName('p').length === 0) {
            form.appendChild(div);
        }
    }

    static validateLogin(login) {
        if (login.length < MIN_LOGIN_LENGTH || login.length > MAX_LOGIN_LENGTH || !isNaN(login)) {
            return;
        }
        return true;
    }

    static validateEmail(email) {
        if (!email.match(/@/)) {
            return;
        }
        return true;
    }

    static validatePassword(password) {
        if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
            return;
        }
        return true;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Validate);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./forms.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./forms.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signup", function() { return signup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signin", function() { return signin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_autheficate_registrationAuth__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_autheficate_loginAuth__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__servises_user_service__ = __webpack_require__(22);









const userService = new __WEBPACK_IMPORTED_MODULE_4__servises_user_service__["a" /* default */]();
const application = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */](document.getElementById('application'));

const wrapper = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['wrapper']);
const game = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['game']);

const images = "logo";
const imageWall = "wall";

application.appendChildBlock('application', wrapper);
application.appendChildBlock("logo", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('img', [images]));
application.appendChildBlock("wall", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('img', [imageWall]));
const logo = document.querySelector('img.logo');
logo.setAttribute('src', '../images/logo2.png');

const wall = document.querySelector('img.wall');
wall.setAttribute('src', '../images/banner.png');

function signin(login) {

    login.onSubmit(formdata => {
        const authValidation = Object(__WEBPACK_IMPORTED_MODULE_2__blocks_autheficate_loginAuth__["a" /* default */])(formdata[0], formdata[1]);
        console.log(formdata[0], formdata[1]);
        if (authValidation === false) {
            return;
        }
        userService.signin(formdata[0], formdata[1]).then(() => new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/multiplayer')).then(() => game.appendChildBlock('game', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['logout']).setText('logout'))).then(() => {
            let logout = document.querySelector('a.logout');
            logout.addEventListener('click', function () {
                userService.logout();
                new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
            });
        });
    });
}

function signup(registration) {
    registration.onSubmit(formdata => {
        const authValidation = Object(__WEBPACK_IMPORTED_MODULE_1__blocks_autheficate_registrationAuth__["a" /* default */])(formdata[0], formdata[1], formdata[2], formdata[3]);
        if (authValidation === false) {
            return;
        }
        userService.signup(formdata[0], formdata[1], formdata[2]).then(() => new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/multiplayer')).then(() => game.appendChildBlock('game', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['logout']).setText('logout'))).then(() => {
            let logout = document.querySelector('a.logout');
            logout.addEventListener('click', function () {
                userService.logout();
                new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
            });
        });
    });
}



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_forms_validation__ = __webpack_require__(6);


const baseUrl = `${window.location.protocol}//${window.location.host}`;

/**
 * Класс, предоставляющий методы для выполнения HTTP-запросов
 * @class Http
 */
class Http {
    /**
     * Выполняет GET-запрос с использованием fetch (по возможности) или XMLHttpRequest
     * @param {string} address - "ручка"
     * @return {Promise}
     */
    static Get(address) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            return this._FetchGet(url);
        }
        return this._GetXMLHttpRequest(url);
    }

    /**
     * Выполняет POST-запрос с использованием fetch (по возможности) или XMLHttpRequest
     * @param {string} address - "ручка"
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static Post(address, body) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            console.log("function post work");
            return this._FetchPost(body, url);
        }
        return false;
    }

    /**
     * Выполняет GET-запрос по указанному адресу с использованием XMLHttpRequest
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static _GetXMLHttpRequest(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    alert(xhr.responseText);
                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send();
        });
    }

    /**
     * Выполняет POST-запрос по указанному адресу с использованием XMLHttpRequest
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static _PostXMLHttpRequest(body, url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {

                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send(JSON.stringify(body));
        });
    }

    /**
     * Выполняет GET-запрос по указанному адресу с использованием fetch
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static _FetchGet(url) {
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        }).then(function (response) {
            let json = response.json();
            if (response.status >= 400) {
                return json.then(response => {
                    throw response;
                });
            }
            return json;
        });
    }

    /**
     * Выполняет POST-запрос по указанному адресу с использованием fetch
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static _FetchPost(body, url) {
        console.log(JSON.stringify(body));
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log("fetch post work\n");
            console.log(response.status);
            if (response.status === 200) {
                return;
            } else if (response.status >= 400) {
                __WEBPACK_IMPORTED_MODULE_0__blocks_forms_validation__["a" /* default */].userError();
                let json = response.json();
                return json.then(response => {
                    throw response;
                });
            }
        });
    }

}

Http.BaseUrl = null;

/* harmony default export */ __webpack_exports__["default"] = (Http);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Модуль, реализующий общее поведение для каждого блока
 * @module Block
 */
class Generator {
    constructor(...args) {
        this._eventsListening = [];
        this._childBlocks = {};

        if (typeof args[0] === 'string') {
            let tagName = args[0];
            let classes = args[1] || [];
            let attrs = args[2] || {};

            this._element = document.createElement(tagName);
            classes.forEach(className => {
                this._element.classList.add(className);
            });
            for (let name in attrs) {
                this._element.setAttribute(name, attrs[name]);
            }
        } else if (args[0] instanceof Node) {
            this._element = args[0];
        }
    }

    setText(text) {
        this._element.textContent = text;
        return this;
    }

    appendChildBlock(blockName, block) {
        this._element.appendChild(block._element);
        this._childBlocks[blockName] = block;
        return this;
    }

    removeAllChildren() {
        for (let blockName in this._childBlocks) {
            this._element.removeChild(this._childBlocks[blockName]._element);
            delete this._childBlocks[blockName];
        }
    }

    on(event, callback) {
        if (this._eventsListening.indexOf(event) === -1) {
            this._element.addEventListener(event, callback);
            this._eventsListening.push(event);
        }
    }

    hasAttribute(attribute) {
        return this._element.hasAttribute(attribute);
    }

    setAttribute(attribute, value) {
        this._element.setAttribute(attribute, value);
    }

    getAttribute(attribute) {
        return +this._element.getAttribute(attribute);
    }

    removeAttribute(attribute) {
        this._element.removeAttribute(attribute);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Generator);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forms_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forms_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__forms_scss__);



class Input extends __WEBPACK_IMPORTED_MODULE_0__block_block__["a" /* default */] {
    constructor(type = 'text', classes = [], attrs = {}) {
        attrs['type'] = type;
        super('input', classes, attrs);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Skill {
    constructor() {
        this.name = 'name';
        this.description = 'description';
        this.typeOfArea = 'point'; //point, circle
        this.area = 1;
        this.damage = [0, 0];
        this.cooldown = 0;
    }

    createSkill(name, description, typeOfArea, area, damage, cooldown) {
        this.name = name;
        this.description = description;
        this.typeOfArea = typeOfArea;
        this.area = area;
        this.damage = damage;
        this.cooldown = cooldown;
    }

    getDesciption() {
        if (damage[1] >= 0) {
            return this.name + '\nDam: ' + this.damage[0] + '-' + this.damage[1] + ' Type: ' + this.typeOfArea + ' with area: ' + this.area + '\n' + ' Cooldown: ' + this.cooldown + '\n' + this.description;
        }

        return name + '\nHeal: ' + Math.abs(this.damage[0]) + '-' + Math.abs(this.damage[1]) + ' Type: ' + this.typeOfArea + ' with area: ' + this.area + '\n' + ' Cooldown: ' + this.cooldown + '\n' + this.description;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Skill;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Pathfinding {
    constructor(start, tiledMap) {
        this.distance = new Map();
        this.WIDTH = 16;
        this.HEIGHT = 12;
        this.PARTYSIZE = 4;
        this.ENEMIESSIZE = 2;
        this.kek = 3;
        this.NOTWALL = 0;
        this.WALL = 1;
        this.tiledMap = tiledMap;
        this.path = new Map();
        this.sender = start.getInhabitant();
        this.frontier = [];
        this.frontier.push(start);
        this.path.set(start, null);
        this.distance.set(start, 0);
    }

    possibleMoves() {
        while (this.frontier.length > 0) {
            let current = this.frontier.shift();
            if (this.distance.get(current) === this.sender.speed) {
                break;
            }
            let currentNeighbors = this.tileNeighbors(current);
            for (let i = 0; i < currentNeighbors.length; i++) {
                if (!this.distance.has(currentNeighbors[i])) {
                    this.frontier.push(currentNeighbors[i]);
                    this.path.set(currentNeighbors[i], current);
                    this.distance.set(currentNeighbors[i], 1 + this.distance.get(current));
                }
            }
        }
        return this.path;
    }

    tileNeighbors(current) {
        let neighbors = [];
        if (current.xpos + 1 < this.WIDTH && this.tiledMap[current.xpos + 1][current.ypos].isWall === this.NOTWALL && !this.tiledMap[current.xpos + 1][current.ypos].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos + 1][current.ypos]);
        }

        if (current.ypos + 1 < this.HEIGHT && this.tiledMap[current.xpos][current.ypos + 1].isWall === this.NOTWALL && !this.tiledMap[current.xpos][current.ypos + 1].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos][current.ypos + 1]);
        }

        if (current.xpos - 1 >= 0 && this.tiledMap[current.xpos - 1][current.ypos].isWall === this.NOTWALL && !this.tiledMap[current.xpos - 1][current.ypos].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos - 1][current.ypos]);
        }

        if (current.ypos - 1 >= 0 && this.tiledMap[current.xpos][current.ypos - 1].isWall === this.NOTWALL && !this.tiledMap[current.xpos][current.ypos - 1].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos][current.ypos - 1]);
        }

        return neighbors;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pathfinding;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shaders__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Program__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sprite__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_js__ = __webpack_require__(45);





class GraphicEngine {
  constructor(idCanvas, loop) {
    this.sprites = [];
    this.loop = loop;
    this.gl = document.getElementById(idCanvas).getContext("webgl");
    if (!this.gl) {
      alert('Error in initializate ' + idCanvas + ': Беда, брат! Твой браузер не поддерживает WebGl, но ты держись :D');
      return;
    }
    this.programForSprite = new __WEBPACK_IMPORTED_MODULE_1__Program__["a" /* default */](this.gl, __WEBPACK_IMPORTED_MODULE_0__Shaders__["c" /* vertexShader */], __WEBPACK_IMPORTED_MODULE_0__Shaders__["a" /* fragmentShader */]).create();
    this.programForColorObj = new __WEBPACK_IMPORTED_MODULE_1__Program__["a" /* default */](this.gl, __WEBPACK_IMPORTED_MODULE_0__Shaders__["d" /* vertexShader1 */], __WEBPACK_IMPORTED_MODULE_0__Shaders__["b" /* fragmentShader1 */]).create();
    // this.time = performance.now() + 1;
  }

  addSprite(translation, texture, vertexs, blend, texCoord) {
    let attributes = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_position', vertexs), new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_texcoord', texCoord ? texCoord : __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].madeRectangle(0, 0, 1, 1))];
    let uniforms = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_translation', translation)];
    let sprite = new __WEBPACK_IMPORTED_MODULE_3__Sprite__["b" /* Sprite */](this.gl, this.programForSprite, attributes, uniforms, blend, texture);
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }

  addColorSprite(translation, vertexs, color, blend) {
    let attributes = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_position', vertexs)];
    let uniforms = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_translation', translation), new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_color', color)];
    let sprite = new __WEBPACK_IMPORTED_MODULE_3__Sprite__["b" /* Sprite */](this.gl, this.programForColorObj, attributes, uniforms, blend);
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }

  render(now) {
    // now *= 0.001;
    // let deltaTime = now - this.time;
    // this.time = now;
    // if (deltaTime != 0) {
    //   document.getElementById('fps').innerHTML = (1 / deltaTime).toFixed(0);
    //   document.getElementById('fps').style.color = 'white';
    // }

    __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].resize(this.gl);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    let lastProgram;
    this.sprites.forEach(sprite => {
      if (lastProgram === undefined) {
        this.gl.useProgram(sprite.program);
        lastProgram = sprite.program;
      } else if (lastProgram !== sprite.program) {
        this.gl.useProgram(sprite.program);
        lastProgram = sprite.program;
      }
      sprite.render();
    });

    if (this.loop) {
      requestAnimationFrame(this.render.bind(this));
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GraphicEngine;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tile {
	constructor() {
		this.xpos = null;
		this.ypos = null;
		this.unitOnTile = null;
		this.isWall = null;
	}

	getInhabitant() {
		return this.unitOnTile;
	}

	occupy(unit) {
		this.unitOnTile = unit;
	}

	unoccupy() {
		this.unitOnTile = null;
	}

	isOccupied() {
		return this.unitOnTile !== null;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tile;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Loader {
  constructor(paths, gl) {
    this.gl = gl;
    this.paths = paths;
    this.images = [];
  }

  loadImage(url, callback, i) {
    let image = new Image();
    image.src = url;
    image.onload = callback.bind(this, image, i);
    return image;
  }

  load(callback1, callback2) {
    let imagesToLoad = this.paths.length;
    let onImageLoad = function (image, i) {
      imagesToLoad--;
      let tex = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
      this.images[i] = tex;
      if (imagesToLoad === 0) {
        callback1(this.images);
        if (callback2) {
          callback2();
        }
      }
    }.bind(this);
    for (let i = 0; i < imagesToLoad; i++) {
      let image = this.loadImage(this.paths[i], onImageLoad, i);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Loader;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tile_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Skill_js__ = __webpack_require__(12);


class Action {
    constructor() {
        this.target = new __WEBPACK_IMPORTED_MODULE_0__Tile_js__["a" /* default */]();
        this.sender = new __WEBPACK_IMPORTED_MODULE_0__Tile_js__["a" /* default */]();
        this.ability = new __WEBPACK_IMPORTED_MODULE_1__Skill_js__["a" /* default */]();
        this.toPrepare = false;
    }

    isMovement() {
        // console.log(this.target + " - target and this.ability - " + this.ability);
        return this.target !== null && this.ability === null;
    }

    isSkip() {
        return this.target === null && this.ability === null;
    }

    isAbility() {
        return this.ability !== null;
    }

    isPrepareAbility() {
        return this.ability !== null && this.toPrepare === true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Action;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_mainpage_mainpage__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_login_login__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_signup_registration__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_info_info__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_multiplayer_game__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_singleplay_web__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_multiplayer_registration_module_registration_module__ = __webpack_require__(55);











function requireAll(r) {
    r.keys().forEach(r);
}
__webpack_require__(8);
__webpack_require__(58);

requireAll(__webpack_require__(59));
requireAll(__webpack_require__(60));
requireAll(__webpack_require__(61));
requireAll(__webpack_require__(63));

const login = new __WEBPACK_IMPORTED_MODULE_2__views_login_login__["a" /* default */]();
const mainMenu = new __WEBPACK_IMPORTED_MODULE_1__views_mainpage_mainpage__["a" /* default */]();
const signup = new __WEBPACK_IMPORTED_MODULE_3__views_signup_registration__["a" /* default */]();
const info = new __WEBPACK_IMPORTED_MODULE_4__views_info_info__["a" /* default */]();
const game = new __WEBPACK_IMPORTED_MODULE_5__views_multiplayer_game__["a" /* default */]();
const single = new __WEBPACK_IMPORTED_MODULE_6__views_singleplay_web__["a" /* default */]();
const choose = new __WEBPACK_IMPORTED_MODULE_7__views_multiplayer_registration_module_registration_module__["a" /* default */]();

/*
navigator.serviceWorker.register("/service_worker.js", { scope: "/" })
    .then((registration) => {
        console.log('ServiceWorker registration', registration);
    })
    .catch((error) => {
        throw new Error(`ServiceWorker error: ${error}`);
    });
*/
const router = new __WEBPACK_IMPORTED_MODULE_0__modules_router__["default"]();
router.register('/', mainMenu).register('/login', login).register('/signup', signup).register('/info', info).register('/multiplayer', game).register('/singleplay', single).register('/game', choose).navigate();

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_validation__ = __webpack_require__(6);


/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
let RegistrationValidate = (login, email, password, password_confirm) => {

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateLogin(login)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration-form');
        return false;
    }
    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateEmail(email)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration-form');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration-form');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password_confirm)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration-form');
        return false;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (RegistrationValidate);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_validation__ = __webpack_require__(6);


/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
let LoginValidate = (login, password) => {
    console.log('valide works');
    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateLogin(login)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.login-form');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.login-form');
        return false;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (LoginValidate);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_validation__ = __webpack_require__(6);



/**
 * Сервис для работы с пользователями
 * @class UserService
 */
class UserService {
    constructor() {
        /**
         * Закомментить для обращения к серверу node.js
         */
        __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].BaseUrl = 'https://kvvartet2017.herokuapp.com';
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @return {Promise}
     */
    signup(username, email, password) {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/signup', { username, email, password });
    }

    /**
     * Авторизация пользователя
     * @param {string} username
     * @param {string} password
     * @return {Promise}
     */
    login(username, password) {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/signin', { username, password });
    }

    /**
     * Проверяет, авторизован ли пользователь
     * @return {boolean}
     */
    isLoggedIn() {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/currentUser');
    }

    /**
     * Выход пользователя
     * @return {Promise}
     */
    logout() {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/signout', {});
    }

    /**
     * Загружает данные о текущем пользователе
     * @return {Promise}
     */
    /*getData() {
        return Http.Post('/session')
            .then(userdata => {
                return userdata;
            });
    }*/

}

/* harmony default export */ __webpack_exports__["a"] = (UserService);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_page_scss__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_page_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__main_page_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mainStyle__ = __webpack_require__(27);




const buttons = [{
    name: 'First',
    text: 'New Game',
    value: '/login'

}, {
    name: 'Second',
    text: 'Singleplayer',
    value: '/singleplayer'

}, {
    name: 'Third',
    text: 'Registration',
    value: '/signup'
}, {
    name: 'Four',
    text: 'Information',
    value: '/info'

}, {
    //name: 'Change-theme',
    name: 'Change-theme',
    text: 'Change Theme'
}];
/* unused harmony export buttons */


const blockClass = 'button';

class MainPage extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('div', ['main-menu'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
        buttons.forEach(button => {
            this.appendChildBlock(button.name, new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', [blockClass + button.name]).setText(button.text));
        });
    }
    creation() {

        const wrape = document.querySelector('div.wrapper');
        if (wrape.childNodes[0] !== undefined) {
            wrape.removeChild(wrape.childNodes[0]);
        }
        wrape.appendChild(this._element);

        const linkFirst = document.querySelector('a.buttonFirst');
        linkFirst.setAttribute('value', '/login');

        const linkSecond = document.querySelector('a.buttonSecond');
        linkSecond.setAttribute('value', '/singleplay');

        const linkThird = document.querySelector('a.buttonThird');
        linkThird.setAttribute('value', '/signup');
        const linkFour = document.querySelector('a.buttonFour');
        linkFour.setAttribute('value', '/info');

        let changer = document.querySelector('a.buttonChange-theme');
        changer.setAttribute('value', '/game');
        changer.addEventListener('click', () => {
            Object(__WEBPACK_IMPORTED_MODULE_2__mainStyle__["a" /* default */])();
        });

        const logo = document.querySelector('img.logo');
        logo.setAttribute('src', '../images/logo2.png');
    }
}
/* unused harmony export MainPage */

/* harmony default export */ __webpack_exports__["a"] = (MainPage);

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./main-page.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./main-page.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "@viewport {\n  width: 640px;\n  height: 440px;\n  zoom: 2;\n  user-zoom: fixed; }\n\n.buttonFirst {\n  display: inline-block;\n  /*   width: 150px;\n     height: 60px;*/\n  width: 12vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 45%;\n  left: 44%;\n  font-size: 150%; }\n\n.buttonFirst:hover {\n  color: white;\n  cursor: pointer; }\n\n.buttonFirst:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.buttonSecond {\n  display: inline-block;\n  /*   width: 150px;\n     height: 60px;*/\n  width: 12vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 55%;\n  left: 44%;\n  font-size: 150%; }\n\n.buttonSecond:hover {\n  color: white;\n  cursor: pointer; }\n\n.buttonSecond:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.buttonThird {\n  display: inline-block;\n  /*   width: 150px;\n     height: 60px;*/\n  width: 12vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  position: absolute;\n  border: 2px solid;\n  top: 66%;\n  left: 44%;\n  font-size: 150%; }\n\n.buttonThird:hover {\n  color: white;\n  cursor: pointer; }\n\n.buttonThird:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.buttonFour {\n  display: inline-block;\n  /*   width: 150px;\n     height: 60px;*/\n  width: 12vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 77%;\n  left: 44%;\n  font-size: 150%; }\n\n.buttonFour:hover {\n  color: white;\n  cursor: pointer; }\n\n.buttonFour:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.buttonChange-theme {\n  font-family: fantasy;\n  text-transform: uppercase;\n  outline: 0;\n  background: purple;\n  border: 0;\n  padding: 15px;\n  color: #fff;\n  font-size: 14px;\n  cursor: pointer;\n  right: 5%;\n  width: 120px;\n  top: 5%; }\n  .buttonChange-theme:hover {\n    background: green; }\n  .buttonChange-theme:active {\n    background: white; }\n", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ChangeTheme;
const createStylesheet = styles => {
    return styles.reduce((stylesheet, current) => {

        const properties = Object.entries(current.styles).map(prop => prop[0] + ':' + prop[1] + ';');
        stylesheet += `${current.selector}{${properties.join('')}}\n`;
        return stylesheet;
    }, '');
};

const buttonLogin = {
    selector: '.buttonFirst',
    styles: {
        'background-color': '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'

    }
};

const changeTheme = {
    selector: '.buttonChange-theme',
    styles: {
        'border-radius': '120px',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'

    }
};
const loginForm = {
    selector: '.login-form',
    styles: {
        'border-radius': '45px',
        'text-shadow': '-1px 0 #BDD9BF, 0 1px #BDD9BF, 1px 0 #BDD9BF, 0 -1px #BDD9BF'
    }
};

const buttonSingle = {
    selector: '.buttonSecond',
    styles: {
        'background-color': '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'
    }
};

const buttonSignup = {
    selector: '.buttonThird',
    styles: {
        'background-color': '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'
    }
};

const buttonInfo = {
    selector: '.buttonFour',
    styles: {
        'background-color': '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'
    }
};

const fieldsForms = {
    selector: '.field',
    styles: {
        'border-radius': '120px',
        'border-bottom-color': 'blue'
    }
};

const appendStylesheet = stylesheet => {
    let styleTag = document.getElementById('theme-styles');
    styleTag.innerHTML = stylesheet;
};

const registrationForm = {
    selector: '.registration-form',
    styles: {
        'border-radius': '120px',
        'border-bottom-color': 'blue'
    }
};

const text = {
    selector: '.textBlock',
    styles: {
        'border-radius': '40px',
        'border-bottom-color': 'blue'
    }
};

let hasTheme = false;
let styles = createStylesheet([buttonLogin, buttonInfo, buttonSignup, buttonSingle, changeTheme, loginForm, fieldsForms, registrationForm, text]);
function ChangeTheme() {
    let stylesheet = hasTheme ? '' : styles;
    appendStylesheet(stylesheet);
    hasTheme = !hasTheme;
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(3);





const fieldPrototypes = [{
    type: 'text',
    attributes: {
        name: 'username',
        placeholder: 'username'
    }
}, {
    type: 'password',
    attributes: {
        name: 'password',
        placeholder: 'password'
    }
}, {
    type: 'submit',
    attributes: {
        value: 'COMPLEATE'
    }
}];

class Login extends __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__["a" /* default */] {
    constructor() {
        super('form', ['login-form']);
        fieldPrototypes.forEach(fieldPrototype => {
            this.appendChildBlock(fieldPrototype.attributes.name, new __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__["a" /* default */](fieldPrototype.type, ['field'], fieldPrototype.attributes));
        });
        const buttonBack = "buttonBack";
        this.appendChildBlock("buttonBack", new __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__["a" /* default */]('a', [buttonBack]));
    }

    creation() {

        const wrappe = document.querySelector('div.wrapper');
        if (wrappe.childNodes[0] !== undefined) {
            wrappe.removeChild(wrappe.childNodes[0]);
        }
        wrappe.appendChild(this._element);

        const navigator = document.querySelector('a.buttonBack');
        navigator.addEventListener('click', () => {
            new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
        });
    }

    onSubmit(callback) {

        this.on('submit', event => {

            event.preventDefault();
            const formdata = {};
            const elements = this._element.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }

            callback(formdata);
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".field {\n  font-family: fantasy;\n  outline: 0;\n  background: #291b1f;\n  width: 100%;\n  margin: 0 0 15px;\n  padding: 15px;\n  box-sizing: border-box;\n  border: 2px solid #c58818;\n  font-size: 14px;\n  color: white; }\n\n.field:hover {\n  border-radius: 10px;\n  border: 2px solid white; }\n\n.message-error {\n  margin-left: 10px;\n  color: red;\n  font-size: 25px;\n  font-family: fantasy; }\n\n.login-form {\n  font-family: fantasy;\n  outline: 0;\n  /*background: #f2f2f2;*/\n  width: 100%;\n  max-width: 360px;\n  margin: 0 auto 100px;\n  padding: 15px;\n  box-sizing: border-box;\n  border: 2px red;\n  font-size: 14px;\n  position: absolute;\n  top: 38%;\n  left: 37.5%; }\n\n.registration-form {\n  font-family: fantasy;\n  outline: 0;\n  /*background: #f2f2f2;*/\n  width: 100%;\n  max-width: 360px;\n  margin: 0 auto 100px;\n  padding: 15px;\n  box-sizing: border-box;\n  border: 2px red;\n  font-size: 14px;\n  position: absolute;\n  top: 35%;\n  left: 37.5%; }\n\n/*\n@media screen and (min-width: 640px) and (max-width: 900px) and (min-height:1000px ) {\n.login-form{\n    margin: 45% auto 100px;\n  }\n}\n@media screen and (min-width: 640px) and (max-width: 900px) and (min-height:1000px ) {\n  .registration-form{\n    margin: 45% auto 100px;\n  }\n}\n*/\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(3);





const fieldPrototypes = [{
    type: 'text',
    attributes: {
        name: 'username',
        placeholder: 'username'
    }
}, {
    type: 'text',
    attributes: {
        name: 'email',
        placeholder: 'email'
    }
}, {
    type: 'password',
    attributes: {
        name: 'password',
        placeholder: 'password'
    }
}, {
    type: 'password',
    attributes: {
        name: 'passwordConfirm',
        placeholder: 'repeat passoword'
    }
}, {
    type: 'submit',
    attributes: {
        value: 'COMPLEATE'
        //formmethod:'post'

    }
}];

class Registration extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('form', ['registration-form']);

        fieldPrototypes.forEach(fieldPrototype => {
            this.appendChildBlock(fieldPrototype.attributes.name, new __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__["a" /* default */](fieldPrototype.type, ['field'], fieldPrototype.attributes));
        });
        const buttonBack = "buttonBack";
        this.appendChildBlock("buttonBack", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', [buttonBack]));
    }

    creation() {

        const wrappe = document.querySelector('div.wrapper');
        if (wrappe.childNodes[0] !== undefined) {
            wrappe.removeChild(wrappe.childNodes[0]);
        }
        wrappe.appendChild(this._element);

        const navigator = document.querySelector('a.buttonBack');
        navigator.addEventListener('click', () => {
            new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
        });
    }

    onSubmit(callback) {
        this.on('submit', event => {
            event.preventDefault();
            const formdata = {};
            const elements = this._element.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }
            callback(formdata);
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Registration);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__info_scss__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__info_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__info_scss__);



const buttonBack = "buttonBack";
const authors = [{
    name: "Kirill",
    link: "https://github.com/KCherkasov"
}, {
    name: "Veniamin",
    link: "https://github.com/WorldVirus"
}, {
    name: "Vlad",
    link: "https://github.com/torrentino555"
}, {
    name: "Artur",
    link: "https://github.com/zonder129"
}];
class Info extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('ul', ['info'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
        this.appendChildBlock('auth', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('h1', ['authors_header']).setText('Creators'));
        authors.forEach(i => {
            let value = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('li', ['authors']);
            this.appendChildBlock(i.name, value.setText(i.name));
            value.setAttribute("href", i.link);
        });
    }

    creation() {
        const wrappe = document.querySelector('div.wrapper');
        if (wrappe.childNodes[0] !== undefined) {
            wrappe.removeChild(wrappe.childNodes[0]);
        }
        wrappe.appendChild(this._element);
    }

}
/* harmony default export */ __webpack_exports__["a"] = (Info);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./info.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./info.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".info {\n  top: 40%;\n  left: 37.5%;\n  position: absolute; }\n\n.authors_header {\n  font-size: 160%;\n  margin: -11px 0px 7px;\n  width: 100%;\n  padding: 8px;\n  color: white; }\n\n.authors {\n  font-size: 160%;\n  margin: 0 20px 15px;\n  width: 100%;\n  padding: 15px;\n  color: #e9a818; }\n", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_scss__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__game_scss__);



const infoBlock = "textBlock";
const buttonBack = "buttonBack";

class Game extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('div', ['game'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
        this.appendChildBlock("first", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', [infoBlock]).setText("Game"));
        this.appendChildBlock('game', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['logout']).setText('logout'));
    }

    creation() {

        let test = document.querySelector('div.wrapper');
        if (test.childNodes[0] !== undefined) {
            test.removeChild(test.childNodes[0]);
        }
        test.appendChild(this._element);
    }

}
/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./game.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./game.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".game {\n  width: 400px;\n  height: 350px;\n  background: purple;\n  margin: -215px 0 0 -125px;\n  position: absolute;\n  top: 65%;\n  left: 45%;\n  padding: 10px;\n  border: solid 3px black;\n  color: white;\n  font-family: fantasy;\n  font-size: 150%;\n  background-size: cover; }\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DemoGameModule__ = __webpack_require__(38);



class SinglePlay extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super();

        this.template = __webpack_require__(54);
    }

    creation() {
        document.body.innerHTML = this.template;

        let game = new __WEBPACK_IMPORTED_MODULE_1__DemoGameModule__["a" /* default */]();
        game.gamePreRender();
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlay;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InitiativeLine__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Unit__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pathfinding__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Background__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GameManager__ = __webpack_require__(47);






/*export default */
class DemoGameModule {
    constructor() {
        this.gameManager = new __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */]();
        this.WIDTH = 16;
        this.HEIGHT = 12;
        this.PARTYSIZE = 4;
        this.ENEMIESSIZE = 2;
        this.kek = 3;
        this.NOTWALL = 0;
        this.WALL = 1;
        this.players = [];
        this.enemies = [];
        this.initiativeLine = new __WEBPACK_IMPORTED_MODULE_0__InitiativeLine__["a" /* default */]();
        this.activeUnit = null;
        this.timer = 30000;
        this.intervalId = 0;
        this.interval = 100;
    }

    gameStart() {
        this.gamePrepare();
        this.startGameLoop();
    }

    gamePreRender() {
        let numberSchene = 0;
        let back = new __WEBPACK_IMPORTED_MODULE_3__Background__["a" /* default */](numberSchene);
        back.render();
        this.gameManager.startGameRendering(this.gameStart.bind(this));
    }

    gamePrepare() {
        this.players = this.generatePlayers();
        this.enemies = this.generateEnemies();
        this.initiativeLine.PushEveryone(this.players, this.enemies);
        this.setPlayersPositions(this.players);
        this.setEnemiesPositions(this.enemies);
        console.log('Everyone on positions: ');
        //отрисовка персонажей

        for (let i = 0; i < this.PARTYSIZE + this.ENEMIESSIZE; i++) {
            console.log(this.enemies);
            this.gameManager.unitManager.addUnit(this.initiativeLine.queue[i]);
        }

        this.activeUnit = this.initiativeLine.CurrentUnit();
        console.log(this.activeUnit.name + ' - let\'s start with you!');
        this.gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
    }

    gameLoop() {
        if (!this.isPartyDead() && !this.isEnemiesDead()) {
            this.timer -= this.interval;
            let sec = Math.ceil(this.timer / 1000);
            if (sec < 10) {
                sec = '0' + sec;
            }
            document.getElementById('time').innerHTML = '00:' + sec;
            //где-то здесь есть работа с АИ
            //отрисовка скилов для каждого персонажа, информация для dropdown и позиций
            if (global.actionDeque.length > 0) {
                console.log('action begin');
                this.activeUnit.actionPoint--;
                let action = global.actionDeque.shift();
                if (action.isMovement() && !action.target.isOccupied()) {
                    this.makeMove(action);
                    // } else if (action.isPrepareAbility()) {
                    //     this.makePrepareAbility(action);
                } else if (action.isAbility()) {
                    console.log('this is ability: ' + action.ability.name);
                    if (action.ability.damage[1] < 0) {
                        this.makeHill(action);
                    } else if (action.ability.damage[1] > 0) {
                        this.makeDamage(action);
                    }
                } else if (action.isSkip()) {
                    this.skipAction();
                }

                if (this.activeUnit.actionPoint === 1) {
                    this.sendPossibleMoves();
                }
            }
            console.log('action point: ' + this.activeUnit.actionPoint);

            if (this.activeUnit.actionPoint === 0 || Math.ceil(this.timer / 1000) === 0 || this.activeUnit.isDead()) {
                this.skipAction();
            }
        } else {
            if (this.isPartyDead()) {
                this.loseGame();
            }

            if (this.isEnemiesDead()) {
                this.winGame();
            }
        }
    }

    // makePrepareAbility(action) {
    //     if (action.ability.typeOfArea === "circle") {
    //     }
    // }

    makeMove(action) {
        console.log(action.sender.getInhabitant().name + ' make move from [' + action.sender.xpos + ',' + action.sender.ypos + ']' + ' to [' + action.target.xpos + ',' + action.target.ypos + ']');
        let toMove = action.sender.getInhabitant();
        let pathfinding = new __WEBPACK_IMPORTED_MODULE_2__Pathfinding__["a" /* default */](action.sender, global.tiledMap);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        let currentTile = action.target;
        while (allMoves.get(currentTile) !== null) {
            path.push(currentTile);
            console.log('current tile - [' + currentTile.xpos + ']' + '[' + currentTile.ypos + ']');
            currentTile = allMoves.get(currentTile);
        }
        console.log(path);
        this.gameManager.animtaionManager.movingTo(action.sender, path);
        action.sender.unoccupy();
        action.target.occupy(toMove);
        this.activeUnit.xpos = action.target.xpos;
        this.activeUnit.ypos = action.target.ypos;
        console.log('check on unoccupy: ' + action.sender.isOccupied());
        console.log('check on occupy: ' + action.target.isOccupied());
    }

    makeHill(action) {
        let healedAllies = [];
        //AOE HILL
        if (action.ability.typeOfArea === 'circle') {
            console.log('THIS IS AOE HILL');
            for (let i = action.target.xpos - action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for (let j = action.target.ypos - action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    if (i >= 0 && j >= 0 && i < this.WIDTH && j < this.HEIGHT) {
                        console.log('WTF is ' + i + ' ' + j);
                        if (global.tiledMap[i][j].isOccupied() && global.tiledMap[i][j].getInhabitant().type === action.sender.getInhabitant().type) {
                            console.log('this is AOE hill on someone: ' + i + ' ' + j);
                            healedAllies.push(global.tiledMap[i][j].getInhabitant());
                            action.sender.getInhabitant().useHealSkill(global.tiledMap[i][j].getInhabitant(), action.ability);
                            console.log('health end: ' + global.tiledMap[i][j].getInhabitant().healthpoint);
                        }
                    }
                }
            }
        } else {
            action.sender.getInhabitant().useHealSkill(action.target.getInhabitant(), action.ability);
            healedAllies.push(action.target.getInhabitant());
            console.log('health end: ' + action.target.getInhabitant().healthpoint);
        }
        this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, healedAllies);
    }

    makeDamage(action) {
        let woundedEnemies = [];
        let deadEnemies = [];
        console.log(action.sender.getInhabitant().name + ' make damage');
        console.log('this is damage: ' + action.ability.name);
        // console.log("health begin: " + action.target.getInhabitant().healthpoint);

        //AOE DAMAGE
        if (action.ability.typeOfArea === 'circle') {
            console.log('THIS IS AOE DAMAGE');
            console.log('target on ' + action.target.xpos + ' ' + action.target.ypos);
            for (let i = action.target.xpos - action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for (let j = action.target.ypos - action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    console.log("i: " + i + " j: " + j);
                    if (i >= 0 && j >= 0 && i < this.WIDTH && j < this.HEIGHT) {
                        if (global.tiledMap[i][j].isOccupied() && global.tiledMap[i][j].getInhabitant().deadMark === false) {
                            console.log(global.tiledMap[i][j].getInhabitant().name + " IS WOUNDED");
                            action.sender.getInhabitant().useDamageSkill(global.tiledMap[i][j].getInhabitant(), action.ability);
                            if (global.tiledMap[i][j].getInhabitant().isDead()) {
                                deadEnemies.push(global.tiledMap[i][j].getInhabitant());
                                global.tiledMap[i][j].getInhabitant().deadMark = true;
                            } else {
                                woundedEnemies.push(global.tiledMap[i][j].getInhabitant());
                            }
                            //console.log("health end: " + action.target.getInhabitant().healthpoint);
                        }
                    }
                }
            }
        } else {
            action.sender.getInhabitant().useDamageSkill(action.target.getInhabitant(), action.ability);
            if (action.target.getInhabitant().isDead()) {
                deadEnemies.push(action.target.getInhabitant());
            } else {
                woundedEnemies.push(action.target.getInhabitant());
            }
            console.log('health end: ' + action.target.getInhabitant().healthpoint);
        }

        if (deadEnemies.length > 0) {
            // console.log(action.target.getInhabitant().name + " IS DEAD");

            this.gameManager.unitManager.unitAttackAndKill(action.ability.name, action.sender, action.target, deadEnemies, woundedEnemies);
            for (let i = 0; i < deadEnemies.length; i++) {
                this.initiativeLine.RemoveUnit(deadEnemies[i]);
            } //graph.deleteFromLowBar(action.target.getInhabitant().barIndex);
        } else {
            console.log('SOMEONE GET WOUNDED: ', woundedEnemies);
            this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, woundedEnemies);
        }
    }

    loseGame() {
        this.stopGameLoop();
        document.getElementsByClassName('container')[0].setAttribute('class', 'blur container');
        document.getElementById('lose').removeAttribute('hidden');
        //createoverlaylose
    }

    winGame() {
        this.stopGameLoop();
        document.getElementsByClassName('container')[0].setAttribute('class', 'blur container');
        document.getElementById('win').removeAttribute('hidden');
        //createoverlaywin
    }

    generatePlayers() {
        let newPlayers = [];
        let Roderick = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
        Roderick.makeWarrior('Roderick');
        let Gendalf = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
        Gendalf.makeMage('Gendalf');
        let Garreth = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
        Garreth.makeThief('Garreth');
        let Ethelstan = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
        Ethelstan.makePriest('Ethelstan');

        newPlayers.push(Roderick);
        newPlayers.push(Gendalf);
        newPlayers.push(Garreth);
        newPlayers.push(Ethelstan);

        return newPlayers;
    }

    generateEnemies() {
        let newEnemies = [];
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            console.log(i);
            let Skeleton = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
            let texture;
            if (i % 2 === 0) {
                texture = 'skeleton1';
            } else {
                texture = 'skeleton2';
            }
            Skeleton.makeSkeleton(texture);
            newEnemies.push(Skeleton);
        }
        return newEnemies;
    }

    setPlayersPositions(players) {
        for (let i = 0; i < this.PARTYSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * this.HEIGHT);
                randCol = Math.floor(Math.random() * 3); //первые три столбца поля
                if (global.tiledMap[randCol][randRow].isWall === this.NOTWALL && !global.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            players[i].xpos = randCol;
            players[i].ypos = randRow;
            global.tiledMap[randCol][randRow].occupy(players[i]);
        }
    }

    setEnemiesPositions(enemies) {
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * this.HEIGHT);
                randCol = Math.floor(Math.random() * 3) + this.WIDTH - 3; //последние три столбца поля
                if (global.tiledMap[randCol][randRow].isWall === this.NOTWALL && !global.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            enemies[i].xpos = randCol;
            enemies[i].ypos = randRow;
            global.tiledMap[randCol][randRow].occupy(enemies[i]);
        }
    }

    isPartyDead() {
        for (let i = 0; i < this.PARTYSIZE; i++) {
            if (!this.players[i].isDead()) {
                return false;
            }
        }
        return true;
    }

    isEnemiesDead() {
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            if (!this.enemies[i].isDead()) {
                return false;
            }
        }
        return true;
    }

    startGameLoop() {
        this.intervalId = setInterval(() => this.gameLoop(), this.interval);
    }

    stopGameLoop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    skipAction() {
        this.timer = 30000;
        this.beginTurn();
    }

    sendPossibleMoves() {
        let pathfinding = new __WEBPACK_IMPORTED_MODULE_2__Pathfinding__["a" /* default */](global.tiledMap[this.activeUnit.xpos][this.activeUnit.ypos], global.tiledMap);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        for (let key of allMoves.keys()) {
            path.push(key);
        }
        path.shift();
        this.gameManager.unitManager.showPossibleMoves(path);
    }

    beginTurn() {
        this.activeUnit = this.initiativeLine.NextUnit();
        console.log('This turn: ');
        console.log(this.initiativeLine.ShowEveryoneInLine());
        console.log(this.activeUnit.name + ' = now your move! Cause initiative:' + this.activeUnit.initiative);
        this.activeUnit.actionPoint = 2;
        this.gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
        //изменяем LowerBar
        //изменяем activeEntity
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DemoGameModule;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class InitiativeLine {
	constructor() {
		this.queue = [];
	}

	ShowEveryoneInLine() {
		let resultString = "";
		for (let i = 0; i < this.queue.length; i++) {
			resultString += i;
			resultString += ": ";
			resultString += this.queue[i].name;
			resultString += "[";
			resultString += this.queue[i].xpos;
			resultString += ",";
			resultString += this.queue[i].ypos;
			resultString += "]";
			resultString += "  ";
		}
		return resultString;
	}

	NextUnit() {
		let unit = this.queue.shift();
		this.queue.push(unit);
		this.SynchronizeLineId();
		return this.CurrentUnit();
	}

	SynchronizeLineId() {
		for (let i = 0; i < this.queue.length; i++) {
			this.queue[i].lineId = i;
		}
	}

	CurrentUnit() {
		return this.queue[0];
	}

	RemoveUnit(unit) {
		this.queue.splice(unit.lineId, 1);
	}

	PushEveryone(allies, enemies) {

		for (let i = 0; i < allies.length; i++) {
			this.queue.push(allies[i]);
		}

		for (let i = 0; i < enemies.length; i++) {
			this.queue.push(enemies[i]);
		}
		this.queue.sort(InitiativeLine.compareUnitsByInitiative);
		this.SynchronizeLineId();
	}

	static compareUnitsByInitiative(unit1, unit2) {
		if (unit1.initiative < unit2.initiative) {
			return 1;
		}
		if (unit1.initiative > unit2.initiative) {
			return -1;
		}
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = InitiativeLine;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Skill__ = __webpack_require__(12);

class Unit {
    constructor() {
        this.name = 'noname';
        this.class = 'noname';
        this.xpos = 0;
        this.ypos = 0;
        this.healthpoint = [0, 0];
        this.armor = 0;
        this.damage = [0, 0];
        this.initiative = 0;
        this.criticalRate = 0.05;
        this.dodgeRate = 0.05;
        this.blockRate = 0.05;
        this.speed = 4;
        this.skills = [new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]()];
        this.type = 'enemy'; //enemy player
        this.actionPoint = 2;
        this.lineId = 0;
        this.shooter = false;
        this.skills[0].createSkill('Move', 'Move to this position', 'point', 1, [0, 0], 0);
        this.deadMark = false;
    }

    makeWarrior(name) {
        this.name = name;
        this.class = 'warrior';
        this.healthpoint = [150, 150];
        this.armor = 20;
        this.damage = [35, 40];
        this.initiative = 10;
        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Attack', 'Deals damage in close combat', 'point', 1, this.damage, 0);
        let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        firstSkill.createSkill('Shield Strike', 'Smash enemy with a shield, knocking him down for 1 turn', 'point', 1, this.damage, 2);
        let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        secondSkill.createSkill('Heavy blow', 'Attack your enemy with double damage', 'point', 1, [this.damage[0] * 2, this.damage[1] * 2], 3);
        this.skills.push(attackSkill, firstSkill, secondSkill);
        this.type = 'player';
    }

    makeMage(name) {
        this.name = name;
        this.class = 'mage';
        this.healthpoint = [100, 100];
        this.armor = 10;
        this.damage = [30, 40];
        this.initiative = 11;
        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Attack', 'Deals damage on distance', 'point', 1, this.damage, 0);
        let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        firstSkill.createSkill('Thunderbolt', 'An electrical jolt deals air damage to target character, knocking him down for 1 turn', 'point', 1, this.damage, 2);
        let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        secondSkill.createSkill('Fire ball', 'Hurl a fiery sphere that will explode', 'circle', 2, this.damage, 2);
        this.skills.push(attackSkill, firstSkill, secondSkill);
        this.type = 'player';
        this.shooter = true;
    }

    makeThief(name) {
        this.name = name;
        this.class = 'thief';
        this.healthpoint = [125, 125];
        this.armor = 15;
        this.damage = [40, 60];
        this.initiative = 12;
        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Attack', 'Deals damage in close combat', 'point', 1, this.damage, 0);
        let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        firstSkill.createSkill('Sawtooth knife', 'Attack enemy with guaranteed critical hit', 'point', 1, [this.damage[0] * 2, this.damage[1] * 2], 3);
        let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        secondSkill.createSkill('Blade flurry', 'Attack enemies around and deals 100% damage', 'circle', 1, this.damage, 2);
        this.skills.push(attackSkill, firstSkill, secondSkill);
        this.type = 'player';
    }

    makePriest(name) {
        this.name = name;
        this.class = 'priest';
        this.healthpoint = [100, 100];
        this.armor = 10;
        this.damage = [-20, -30];
        this.initiative = 11;
        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Heal', 'Heal with healing power on distance', 'point', 1, this.damage, 0);
        let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        firstSkill.createSkill('Massive Heal', 'Heal all your units in area with 100% healing power', 'circle', 1, this.damage, 3);
        let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        secondSkill.createSkill('Holly wrath', 'Deal 200% healing power to cursed creatures', 'point', 1, [this.damage[0] * -2, this.damage[1] * -2], 2);
        this.skills.push(attackSkill, firstSkill, secondSkill);
        this.type = 'player';
        this.shooter = true;
    }

    makeSkeleton(textureName) {
        this.name = 'Skeleton';
        this.class = textureName;
        this.healthpoint = [150, 150];
        this.armor = 5;
        this.damage = [35, 40];
        this.initiative = 10;

        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Attack', 'Deals damage', 'point', 1, this.damage, 0);
        this.skills.push(attackSkill);
    }

    isDead() {
        if (this.healthpoint[0] <= 0) {
            return true;
        }
    }

    useDamageSkill(unit, skill) {

        let currentSkillDamage = Math.floor(Math.random() * (skill.damage[1] - skill.damage[0])) + skill.damage[0];

        if (Math.random() < this.criticalRate) {
            currentSkillDamage *= 2;
        }

        if (Math.random() < unit.dodgeRate) {
            currentSkillDamage = 0;
        } else if (Math.random() < unit.blockRate) {
            currentSkillDamage *= 0.3;
        }
        console.log('Current Damage: ' + Math.floor(currentSkillDamage * ((100 - unit.armor) / 100)));

        unit.healthpoint[0] -= Math.floor(currentSkillDamage * ((100 - unit.armor) / 100));
    }

    useHealSkill(unit, skill) {
        unit.healthpoint[0] += Math.floor(Math.abs(Math.random() * (skill.damage[1] - skill.damage[0])) + Math.abs(skill.damage[0]));
        if (unit.healthpoint[0] > unit.healthpoint[1]) {
            unit.healthpoint[0] = unit.healthpoint[1];
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Unit;


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loader__ = __webpack_require__(16);




class Background {
    constructor(numberSchene) {
        this.ratio = 16 / 9;
        this.engine = new __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__["a" /* default */]('background', false);
        this.schene = numberSchene;
    }

    static randomInteger() {
        var rand = Math.random() * 4;
        rand = Math.floor(rand);
        return rand;
    }

    InitMapAndSprites() {
        this.engine.addSprite([0, 0], this.textures[4], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(-1, 1, 1, -1));
        let coord = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 - 0.015, -(1.2 / 16 - 0.015) * this.ratio);
        global.tiledMap.forEach(function (item, j) {
            item.forEach(function (value, i) {
                if (value.isWall) {
                    let trans = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(i, j);
                    this.engine.addSprite([trans[0] + 0.0075, trans[1] - 0.0075], this.textures[Background.randomInteger()], coord, true);
                }
            }.bind(this));
        }.bind(this));
        for (let i = -0.6; i <= 0.6; i += 1.2 / 16) {
            this.engine.addColorSprite([i, 0.65], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.001, -1.6), [1, 1, 1, 1]);
        }
        for (let i = -0.95; i <= 0.65; i += 1.2 / 16 * global.ratio) {
            this.engine.addColorSprite([-0.6, i], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2, -0.0018), [1, 1, 1, 1]);
        }
        this.engine.addSprite([-0.6, 0.995], this.textures[5], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.1875, -0.13), true);
        this.engine.addSprite([0.68, 0.97], this.textures[6], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.07, -0.07 * global.ratio));
        this.engine.addSprite([0.78, 0.97], this.textures[7], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.07, -0.07 * global.ratio));
        this.engine.addSprite([0.88, 0.97], this.textures[8], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.07, -0.07 * global.ratio));
    }

    render() {
        let loader;
        switch (this.schene) {
            case 0:
                loader = new __WEBPACK_IMPORTED_MODULE_2__Loader__["a" /* default */](['/views/singleplay/textures/wall0.png', '/views/singleplay/textures/wall1.png', '/views/singleplay/textures/wall2.png', '/views/singleplay/textures/wall3.png', '/views/singleplay/textures/back1.png', '/views/singleplay/textures/timer.png', '/views/singleplay/icons/talk.png', '/views/singleplay/icons/bag.png', '/views/singleplay/icons/settings.png'], this.engine.gl);
                break;
        }
        loader.load(this.onLoad.bind(this));
    }
    onLoad(textures) {
        this.textures = textures;
        this.InitMapAndSprites();
        this.engine.render();
        window.addEventListener('resize', function () {
            this.engine.render(performance.now());
        }.bind(this));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return vertexShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fragmentShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return vertexShader1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fragmentShader1; });
let vertexShader = `attribute vec2 a_position;
attribute vec2 a_texcoord;
uniform vec2 u_translation;
varying vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position + u_translation, 0, 1);
  v_texcoord = a_texcoord;
}`;
let fragmentShader = `precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texcoord;
void main() {
  gl_FragColor = texture2D(u_texture, v_texcoord);
}`;
let vertexShader1 = `attribute vec2 a_position;
uniform vec2 u_translation;
uniform vec4 u_color;
varying vec4 v_color;
void main() {
  gl_Position = vec4(a_position + u_translation, 0, 1);
  v_color = u_color;
}`;
let fragmentShader1 = `precision mediump float;
varying vec4 v_color;
void main() { 
  gl_FragColor = v_color;
}`;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Program {
  constructor(gl, vertexShader, fragmentShader) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
  }

  createShader(type, source) {
    let shader = this.gl.createShader(type); // создание шейдера
    this.gl.shaderSource(shader, source); // устанавливаем шейдеру его программный код
    this.gl.compileShader(shader); // компилируем шейдер
    let success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      // если компиляция прошла успешно - возвращаем шейдер
      return shader;
    }
    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  create() {
    let program = this.gl.createProgram();
    this.gl.attachShader(program, this.createShader(this.gl.VERTEX_SHADER, this.vertexShader));
    this.gl.attachShader(program, this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShader));
    this.gl.linkProgram(program);
    let success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Program;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Sprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Uniform; });
class Sprite {
  constructor(gl, program, attributes, uniforms, blend, texture) {
    this.gl = gl;
    this.program = program;
    this.attributes = attributes;
    this.uniforms = uniforms;
    this.texture = texture;
    this.blend = blend;
    this.setAttributes();
    this.setUniforms();
    this.needRender = true;
  }

  getLocUnif(uniform) {
    return this.gl.getUniformLocation(this.program, uniform.name);
  }

  setUniforms() {
    this.uniforms.forEach(function (item) {
      item.location = this.getLocUnif(item);
    }.bind(this));
  }

  getLocAttr(attr) {
    return this.gl.getAttribLocation(this.program, attr.name);
  }

  setAttributes(valueAttributes) {
    this.attributes.forEach(function (item) {
      item.location = this.getLocAttr(item);
      item.buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(item.data), this.gl.STATIC_DRAW);
    }.bind(this));
  }

  setVertexs(vertexs) {
    this.attributes[0].data = vertexs;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[0].buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.attributes[0].data), this.gl.STATIC_DRAW);
    this.needRender = true;
  }

  setTexCoord(coord) {
    this.attributes[1].data = coord;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[1].buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.attributes[1].data), this.gl.STATIC_DRAW);
    this.needRender = true;
  }

  setTrans(translation) {
    this.uniforms[0].value = translation;
    this.needRender = true;
  }

  getTrans() {
    return this.uniforms[0].value;
  }

  setTexture(texture) {
    this.texture = texture;
    this.needRender = true;
  }

  render() {
    this.attributes.forEach(function (item) {
      this.gl.enableVertexAttribArray(item.location);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
      this.gl.vertexAttribPointer(item.location, 2, this.gl.FLOAT, false, 0, 0);
    }.bind(this));

    this.uniforms.forEach(function (item) {
      if (item.value.length == 2) {
        this.gl.uniform2fv(item.location, item.value);
      } else if (item.value.length == 4) {
        this.gl.uniform4fv(item.location, item.value);
      }
    }.bind(this));

    if (this.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    if (this.blend) {
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } else {
      this.gl.disable(this.gl.BLEND);
    }

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.attributes[0].data.length / 2);
    this.needRender = false;
  }
}

class Attribute {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }
}

class Uniform {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DungeonMapMaker__ = __webpack_require__(46);


global.actionDeque = [];
global.tiledMap = new __WEBPACK_IMPORTED_MODULE_0__DungeonMapMaker__["a" /* default */]().dungeonMapMaker(Math.random() * 10 + 25);
global.mapShiftX = -0.6;
global.mapShiftY = 0.65;
global.ratio = 16 / 9;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WIDTH */
/* unused harmony export HEIGHT */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tile__ = __webpack_require__(15);



let WIDTH = 16;
let HEIGHT = 12;
//console.log(WIDTH);
class DungeonMapMaker {
    constructor() {
        this.UP = 0;
        this.LEFT = 1;
        this.DOWN = 2;
        this.RIGHT = 3;
        this.counter = WIDTH * HEIGHT;
    }

    isDirectionValid(curX, curY, direction) {

        switch (direction) {
            case this.UP:
                return curY - 1 >= 0;
            case this.DOWN:
                return curY + 1 < HEIGHT;
            case this.LEFT:
                return curX - 1 >= 0;
            case this.RIGHT:
                return curX + 1 < WIDTH;
            default:
                break;
        }
    }

    dungeonMapMaker(tileWalls) {
        let map = [];
        for (let i = 0; i < WIDTH; i++) {
            map[i] = [];
            for (let j = 0; j < HEIGHT; j++) {
                let newTile = new __WEBPACK_IMPORTED_MODULE_0__Tile__["a" /* default */]();
                newTile.xpos = i;
                newTile.ypos = j;
                newTile.isWall = 1;
                map[i][j] = newTile;
            }
        }

        let randY = Math.floor(Math.random() * HEIGHT);
        let randX = Math.floor(Math.random() * WIDTH);
        let pointer = [randX, randY];
        console.log(HEIGHT + ' ' + WIDTH);
        console.log(randY + ' ' + randX);
        map[randX][randY].isWall = 0;
        this.counter--;
        let direction;
        while (this.counter > tileWalls) {
            do {
                direction = Math.floor(Math.random() * 4);
            } while (!this.isDirectionValid(pointer[0], pointer[1], direction));

            switch (direction) {
                case this.UP:
                    pointer[1] = pointer[1] - 1;
                    break;
                case this.DOWN:
                    pointer[1] = pointer[1] + 1;
                    break;
                case this.LEFT:
                    pointer[0] = pointer[0] - 1;
                    break;
                case this.RIGHT:
                    pointer[0] = pointer[0] + 1;
                    break;
            }

            if (map[pointer[0]][pointer[1]].isWall === 1) {
                map[pointer[0]][pointer[1]].isWall = 0;
                this.counter--;
            }
        }

        return map;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DungeonMapMaker;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SpriteManager__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__State__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Loader__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AnimationManager__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__UnitManager__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Animation__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Action__ = __webpack_require__(17);










//import {global.tiledMap,test} from './GameModule'
//import   './GameModule'

class GameManager {
    constructor() {
        this.ratio = 16 / 9;
        this.engine = new __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__["a" /* default */]('canvas', true);
        this.spriteManager = new __WEBPACK_IMPORTED_MODULE_1__SpriteManager__["a" /* default */](this.engine);
        this.state = new __WEBPACK_IMPORTED_MODULE_2__State__["a" /* default */]();
        this.fullScreen = false;
    }

    startGameRendering(callback) {
        console.log('work rendering uints');
        let loaderTextures = new __WEBPACK_IMPORTED_MODULE_3__Loader__["a" /* default */](['/views/singleplay/textures/moveTile.png', '/views/singleplay/textures/activeTile.png', '/views/singleplay/textures/select.png', '/views/singleplay/icons/fullscreen.png', '/views/singleplay/textures/actionBack.png', '/views/singleplay/icons/circle.png', '/views/singleplay/icons/radio2.png', '/views/singleplay/icons/radio1.png'], this.engine.gl);
        let loaderAnimations = new __WEBPACK_IMPORTED_MODULE_3__Loader__["a" /* default */](['/views/singleplay/animations/fireball.png', '/views/singleplay/animations/Fire 5.png', '/views/singleplay/animations/thunderbolt.png', '/views/singleplay/animations/healing.png', '/views/singleplay/animations/blade_flurry.png', '/views/singleplay/animations/attack.png', '/views/singleplay/animations/holly_wrath.png', '/views/singleplay/animations/activeTile.png'], this.engine.gl);
        let loaderConditions = new __WEBPACK_IMPORTED_MODULE_3__Loader__["a" /* default */](['/views/singleplay/conditions/WarriorAngry.png', '/views/singleplay/conditions/WarriorAttack.png', '/views/singleplay/conditions/WarriorDead.png', '/views/singleplay/conditions/MageAngry.png', '/views/singleplay/conditions/MageAttack.png', '/views/singleplay/conditions/MageDead.png', '/views/singleplay/conditions/ThiefAngry.png', '/views/singleplay/conditions/ThiefAttack.png', '/views/singleplay/conditions/ThiefDead.png', '/views/singleplay/conditions/PriestAngry.png', '/views/singleplay/conditions/PriestAttack.png', '/views/singleplay/conditions/PriestDead.png', '/views/singleplay/conditions/Skeleton1Angry.png', '/views/singleplay/conditions/Skeleton1Attack.png', '/views/singleplay/conditions/Skeleton1Dead.png', '/views/singleplay/conditions/Skeleton2Angry.png', '/views/singleplay/conditions/Skeleton2Attack.png', '/views/singleplay/conditions/Skeleton2Dead.png'], this.engine.gl);
        let loaderEntities = new __WEBPACK_IMPORTED_MODULE_3__Loader__["a" /* default */](['/views/singleplay/entity/warrior_portrait.png', '/views/singleplay/entity/mage_portrait.png', '/views/singleplay/entity/thief_portrait.png', '/views/singleplay/entity/priest_portrait.png', '/views/singleplay/entity/skeleton1_portrait.png', '/views/singleplay/entity/skeleton2_portrait.png', '/views/singleplay/entity/warrior.png', '/views/singleplay/entity/mage.png', '/views/singleplay/entity/thief.png', '/views/singleplay/entity/priest.png', '/views/singleplay/entity/skeleton1.png', '/views/singleplay/entity/skeleton2.png'], this.engine.gl);
        loaderTextures.load(textures => {
            loaderAnimations.load(animations => {
                loaderConditions.load(conditions => {
                    loaderEntities.load(entities => {
                        this.textures = textures;
                        this.initGui();
                        this.initEvents();
                        let animation = new __WEBPACK_IMPORTED_MODULE_7__Animation__["a" /* default */](this);
                        this.animtaionManager = new __WEBPACK_IMPORTED_MODULE_5__AnimationManager__["a" /* default */](animation, this.spriteManager, this.activeTile, this.actionPoint, this.state, animations, this.textures[7]);
                        this.unitManager = new __WEBPACK_IMPORTED_MODULE_6__UnitManager__["a" /* default */](animation, this.animtaionManager, this.spriteManager, this.activeTile, this.actionPoint, this.state, entities, textures, conditions);
                        this.engine.render();
                    }, callback);
                });
            });
        });
    }

    initEvents() {
        document.addEventListener('mousemove', function (event) {
            let x = event.clientX / window.innerWidth;
            let y = event.clientY / window.innerHeight;
            let xMin = (1 + global.mapShiftX) / 2;
            let xMax = xMin + 0.6;
            let yMin = (1 - global.mapShiftY) / 2;
            let yMax = yMin + 0.8;
            if (x >= xMin && x < xMax && y >= yMin && y < yMax && document.getElementById('win').hidden && document.getElementById('lose').hidden && !this.state.AnimationOnMap) {
                let i = Math.floor((x - xMin) / 0.6 / (1 / 16));
                let j = Math.floor((y - yMin) / 0.8 / (1 / 12));
                if (i < 16 && j < 12 && global.tiledMap[i][j].active) {
                    this.spriteManager.getSprite(this.activeElem).setTrans(__WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].translationOnMap(j, i));
                } else {
                    this.spriteManager.getSprite(this.activeElem).setTrans([-2, -2]);
                }
            }
        }.bind(this));
        document.addEventListener('click', event => {
            let x = event.clientX / this.engine.gl.canvas.clientWidth;
            let y = event.clientY / this.engine.gl.canvas.clientHeight;
            if (x >= 0.95 && y >= 0.95) {
                console.log(event.clientX + ' ' + event.clientY);
                if (!this.fullScreen) {
                    document.documentElement.mozRequestFullScreen();
                    this.fullScreen = true;
                } else {
                    document.mozCancelFullScreen();
                    this.fullScreen = false;
                }
            }
            if (x >= 0.25 && x <= 0.3 && y <= 0.05) {
                let action = new __WEBPACK_IMPORTED_MODULE_8__Action__["a" /* default */]();
                action.sender = null;
                action.target = null;
                action.ability = null;
                global.actionDeque.push(action);
            }
        });
    }

    initGui() {
        this.activeTile = this.spriteManager.addSprite(-0.9, [-2, 3], this.textures[1], __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio), true);
        this.activeElem = this.spriteManager.addSprite(-1, [-2, 3], this.textures[2], __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio), true);
        this.spriteManager.addSprite(1, [0.95, -1 + 0.05 * this.ratio], this.textures[3], __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].madeRectangle(0, 0, 0.05, -0.05 * this.ratio), true);
        this.actionPoint = this.spriteManager.addSprite(0, __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].transActionPoint(0), this.textures[6], __WEBPACK_IMPORTED_MODULE_4__Utils__["a" /* default */].madeRectangle(0, 0, 0.023, -0.050 * global.ratio), true);
        document.body.style.height = '100vh';
        let rigthBar = document.createElement('div');
        rigthBar.style.position = 'absolute';
        rigthBar.style.right = '1vw';
        rigthBar.style.top = '17.7vh';
        rigthBar.style.height = '80vh';
        rigthBar.style.width = '8vw';
        rigthBar.style.backgroundImage = 'url(\'/views/singleplay/textures/right_bar.png\')';
        rigthBar.style.backgroundSize = '100% 100%';
        rigthBar.style.backgroundRepeat = 'no-repeat';
        document.getElementsByClassName('container')[0].appendChild(rigthBar);
        let skillBar = document.createElement('div');
        skillBar.style.position = 'absolute';
        skillBar.style.right = '32.5vw';
        skillBar.style.top = '0';
        skillBar.style.width = '35vw';
        skillBar.style.height = '7vh';
        skillBar.style.backgroundImage = 'url(\'/views/singleplay/textures/skill_bar.png\')';
        skillBar.style.backgroundSize = '100% 100%';
        skillBar.style.backgroundRepeat = 'no-repeat';
        document.getElementsByClassName('container')[0].appendChild(skillBar);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameManager;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SpriteManager {
  constructor(engine) {
    this.indexes = [];
    this.count = 0;
    this.engine = engine;
  }

  setIndexAndOrder(spriteIndex, order) {
    this.engine.sprites[spriteIndex].index = this.count;
    this.engine.sprites[spriteIndex].order = order;
    this.indexes[this.count] = spriteIndex;
    return this.count++;
  }

  addSprite(order, translation, texture, vertexs, blend, texCoord) {
    let spriteIndex = this.engine.addSprite(translation, texture, vertexs, blend, texCoord);
    return this.setIndexAndOrder(spriteIndex, order);
  }

  addColorSprite(order, translation, vertexs, color, blend) {
    let spriteIndex = this.engine.addColorSprite(translation, vertexs, color, blend);
    return this.setIndexAndOrder(spriteIndex, order);
  }

  getSprite(index) {
    return this.engine.sprites[this.indexes[index]];
  }

  deleteSprite(index) {
    delete this.engine.sprites[this.indexes[index]];
  }

  sortSprites() {
    this.engine.sprites.sort((a, b) => {
      if (a.order > b.order) return 1;
      return -1;
    });
    for (let i = 0; i < this.engine.sprites.length; i++) {
      if (this.engine.sprites[i] != undefined) {
        this.indexes[this.engine.sprites[i].index] = i;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteManager;


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class State {
  constructor() {
    this.AnimationOnMap = false;
    this.AnimationOnLowbar = false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = State;


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);

class AnimationManager {
    constructor(Animation, spriteManager, activeTile, actionPoint, state, animations, texture) {
        this.Animation = Animation;
        this.state = state;
        this.spriteManager = spriteManager;
        this.texture = texture;
        this.activeTile = activeTile;
        this.actionPoint = actionPoint;
        this.animations = animations;
        // this.activetile = this.spriteManager.addSprite(12, [-2, -2], this.animations[7], Utils.madeRectangle(0, 0, 1.2 / 16 + 0.04, (1.2/16)*global.ratio - 0.06), true,
        //     Utils.madeRectangle(0, 0, 1/5, -1/4));
        // this.loopActiveTile();
    }

    stateCheck(callback) {
        if (this.state.AnimationOnMap) {
            setTimeout(function () {
                requestAnimationFrame(callback);
            }, 50);
            return true;
        }
        this.state.AnimationOnMap = true;
    }

    movingTo(TileStart, path) {
        if (this.stateCheck(this.movingTo.bind(this, TileStart, path))) {
            return;
        }
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.texture);
        let unit = TileStart.unitOnTile;
        for (let i = path.length - 1; i >= 0; i--) {
            if (i == path.length - 1) {
                this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(unit), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i]), 0.2, unit.entity.mapId);
                this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(unit), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
            } else {
                setTimeout(function () {
                    this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i + 1]), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i]), 0.2, unit.entity.mapId);
                    this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i + 1]), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
                }.bind(this), 200 * (path.length - 1 - i));
            }
        }
        let transActiveTile = this.spriteManager.getSprite(this.activeTile).getTrans();
        setTimeout(function () {
            if (transActiveTile == this.spriteManager.getSprite(this.activeTile).getTrans()) {
                this.spriteManager.getSprite(this.activeTile).setTrans(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(unit.ypos, unit.xpos));
            }
            this.state.AnimationOnMap = false;
        }.bind(this), 200 * path.length);
    }

    thunderbolt(TileStart, TileDest) {
        let DestT = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(TileDest.unitOnTile);
        let thunderboltId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileDest.ypos, TileDest.xpos), this.animations[2], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, 1.2 - DestT[1]), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 2));
        this.Animation.FrameAnimation(thunderboltId, 0.5, 8, 5, 2, true);
    }

    fireball(TileStart, TileDest) {
        let timeA = Math.sqrt(Math.pow(TileStart.xpos - TileDest.xpos, 2) + Math.pow(TileStart.ypos - TileDest.ypos, 2)) / 6;
        let fireballId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileStart.ypos, TileDest.xpos), this.animations[0], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 0.06, -0.06 * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 6, -1 / 6));
        this.Animation.FrameAnimation(fireballId, timeA, 32, 6, 6, true);
        this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(TileStart), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileDest.ypos, TileDest.xpos), timeA, fireballId);
        setTimeout(function () {
            for (let ii = TileDest.xpos - 2; ii < TileDest.xpos + 3; ii++) {
                for (let jj = TileDest.ypos - 2; jj < TileDest.ypos + 3; jj++) {
                    if (ii >= 0 && ii < 16 && jj >= 0 && jj < 12) {
                        this.Animation.FrameAnimation(this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(jj, ii), this.animations[1], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 16, -(1 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 4)), 1.2, 20, 5, 4, true);
                    }
                }
            }
        }.bind(this), timeA * 1000);
    }

    healing(units) {
        units.forEach(function (unit) {
            let healId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(unit.ypos - 1, unit.xpos - 1), this.animations[3], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 3.6 / 16, -(3.6 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 5));
            this.Animation.FrameAnimation(healId, 1, 25, 5, 5, true);
        }.bind(this));
    }

    blade_flurry(target) {
        let blade_flurryId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(target.ypos - 2, target.xpos - 2), this.animations[4], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 6 / 16, -(6 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 4));
        this.Animation.FrameAnimation(blade_flurryId, 1, 20, 5, 4, true);
    }

    attack(target) {
        let attackId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(target.ypos - 0.9, target.xpos - 0.7), this.animations[5], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 2.8 / 16, -(2.8 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 2));
        this.Animation.FrameAnimation(attackId, 0.5, 10, 5, 2, true);
    }

    holly_wrath(sender, target) {
        let timeA = Math.sqrt(Math.pow(sender.xpos - target.xpos, 2) + Math.pow(sender.ypos - target.ypos, 2)) / 6;
        let holly_wrathId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(sender.ypos - 1, sender.xpos - 1), this.animations[6], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 3.6 / 16, -(3.6 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 6, -1 / 6));
        this.Animation.FrameAnimation(holly_wrathId, timeA, 21, 5, 5, true);
        this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(sender), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(target.ypos - 1, target.xpos - 1), timeA, holly_wrathId);
    }

    loopActiveTile() {
        this.Animation.FrameAnimation(this.activetile, 1, 11, 5, 4);
        setTimeout(function () {
            this.loopActiveTile();
        }.bind(this), 1000);
    }

    animationActiveTile(unit) {
        let trans = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(unit);
        this.spriteManager.getSprite(this.activetile).setTrans([trans[0] - 0.02, trans[1] - 0.01]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnimationManager;


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Action__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Pathfinding__ = __webpack_require__(13);





class UnitManager {
    constructor(Animation, animationManager, spriteManager, activeTile, actionPoint, state, entities, textures, conditions) {
        this.Animation = Animation;
        this.units = [];
        this.ratio = 16 / 9;
        this.spriteManager = spriteManager;
        this.animationManager = animationManager;
        this.entities = entities;
        this.textures = textures;
        this.conditions = conditions;
        this.firstActiveUnit = true;
        this.activeTile = activeTile;
        this.circle = spriteManager.addSprite(0, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transActiveCircle(0), this.textures[5], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.015, -0.015 * global.ratio), true);
        this.actionPoint = actionPoint;
        this.activeIndex = 0;
        this.possibleMoves = [];
        this.dropMenu = 0;
        this.state = state;
        this.indexUnit = {
            warrior: 0,
            mage: 1,
            thief: 2,
            priest: 3,
            skeleton1: 4,
            skeleton2: 5
        };
        this.skillbar = [];
    }

    stateCheck(callback) {
        if (this.state.AnimationOnLowbar) {
            setTimeout(function () {
                requestAnimationFrame(callback);
            }, 50);
            return true;
        }
        this.state.AnimationOnLowbar = true;
    }

    timeAndRunSkill(nameSkill, sender, target, runAnimation, wounded) {
        let timeA = Math.sqrt(Math.pow(sender.xpos - target.xpos, 2) + Math.pow(sender.ypos - target.ypos, 2)) / 6;
        switch (nameSkill) {
            case 'Fire ball':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.fireball(sender, target);
                    }.bind(this), 500);
                }
                return timeA * 1000;
            case 'Thunderbolt':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.thunderbolt(sender, target);
                    }.bind(this), 500);
                }
                return 500;

            case 'Massive Heal':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.healing(wounded);
                    }.bind(this), 500);
                }
                return 1000;
            case 'Blade flurry':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.blade_flurry(target);
                    }.bind(this), 500);
                }
                return 1000;
            case 'Attack':case 'Sawtooth knife':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.attack(target);
                    }.bind(this), 500);
                }
                return 500;
            case 'Holly wrath':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.holly_wrath(sender, target);
                    }.bind(this), 500);
                }
                return timeA * 1000;
        }
        return 500;
    }

    updateHealth(wounded) {
        wounded.forEach(function (item) {
            if (item.healthpoint[0] > 0) {
                this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 * (item.healthpoint[0] / item.healthpoint[1]) - 0.006, -0.015));
            } else {
                this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0, 0));
            }
        }.bind(this));
    }

    addUnit(unit) {
        unit.entity = new __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */]();
        unit.entity.lowbarId = this.spriteManager.addSprite(0, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(this.units.length), this.entities[this.indexUnit[unit.class]], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.075, -0.075 * this.ratio), true);
        unit.entity.mapId = this.spriteManager.addSprite(unit.ypos, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationForUnits(unit), this.entities[6 + this.indexUnit[unit.class]], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 9 * 1.7, -(1.2 / 9) * 1.7 * this.ratio), true);
        unit.entity.lowbarHealthId = this.spriteManager.addColorSprite(0, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbarHealth(this.units.length), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.075, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
        unit.entity.healthbarId = this.spriteManager.addColorSprite(unit.ypos, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transForHealthbar(unit), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 - 0.006, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
        this.units.push(unit);
    }

    changeActiveUnit() {
        if (this.stateCheck(this.changeActiveUnit.bind(this))) {
            return;
        }

        let t = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(0);
        this.Animation.MoveAnimation(t, [t[0], t[1] + 0.17], 0.5, this.units[this.units.length - 1].entity.lowbarId);
        for (let i = 0; i < this.units.length - 1; i++) {
            this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(i + 1), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(i), 0.8, this.units[i].entity.lowbarId);
        }
        setTimeout(function () {
            let t = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(0);
            this.Animation.MoveAnimation([t[0], t[1] + 0.17], [t[0] + (this.units.length - 1) * 0.1, t[1] + 0.17], 0.5, this.units[this.units.length - 1].entity.lowbarId);
        }.bind(this), 600);
        setTimeout(function () {
            let t = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(this.units.length - 1);
            this.Animation.MoveAnimation([t[0], t[1] + 0.17], t, 0.5, this.units[this.units.length - 1].entity.lowbarId);
        }.bind(this), 1120);
        setTimeout(function () {
            this.state.AnimationOnLowbar = false;
        }.bind(this), 1650);
    }

    removeUnitsInInitiativeLine(units) {
        if (this.stateCheck(this.removeUnitsInInitiativeLine.bind(this, units))) {
            return;
        }
        units.forEach(function (unit) {
            this.units.splice(this.units.indexOf(unit), 1);
            this.spriteManager.deleteSprite(unit.entity.lowbarId);
        }.bind(this));
        this.units.forEach(function (unit, i) {
            this.Animation.MoveAnimation(this.spriteManager.getSprite(unit.entity.lowbarId).getTrans(), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(i), 0.5, unit.entity.lowbarId);
        }.bind(this));
        setTimeout(function () {
            this.state.AnimationOnLowbar = false;
        }.bind(this), 510);
    }

    updateSkillbar(name) {
        if (this.skillbar.length + 1 > 7) {
            this.skillbar.pop();
            document.getElementById(6).remove();
            document.getElementById(6 + 'box').remove();
        }
        this.skillbar.forEach(function (skill, i) {
            let elem = document.getElementById(i + 'box');
            elem.id = i + 1 + 'box';
            let trans = [parseFloat(elem.style.right.substring(0, elem.style.right.length - 2)), parseFloat(elem.style.top.substring(0, elem.style.top.length - 2))];
            this.Animation.MoveHtmlAnimation(elem, trans, [trans[0], trans[1] + 10], 0.5);
            elem = document.getElementById(i);
            elem.id = i + 1;
            trans = [parseFloat(elem.style.right.substring(0, elem.style.right.length - 2)), parseFloat(elem.style.top.substring(0, elem.style.top.length - 2))];
            this.Animation.MoveHtmlAnimation(elem, trans, [trans[0], trans[1] + 10], 0.5);
        }.bind(this));
        this.skillbar.unshift(name);
        setTimeout(function () {
            let skillBox = document.createElement('img');
            skillBox.id = 0 + 'box';
            skillBox.style.position = 'absolute';
            skillBox.style.right = 3.4 + 'vw';
            skillBox.style.top = 24.72 + 'vh';
            skillBox.style.width = '3.6vw';
            skillBox.style.height = '6.3vh';
            skillBox.src = '/views/singleplay/textures/skillBox.png';
            document.getElementsByClassName('container')[0].appendChild(skillBox);
            let skillImg = document.createElement('img');
            skillImg.id = 0;
            skillImg.style.position = 'absolute';
            skillImg.style.right = 3.8 + 'vw';
            skillImg.style.top = 25.5 + 'vh';
            skillImg.style.width = '2.7vw';
            skillImg.style.height = '4.6vh';
            skillImg.src = '/views/singleplay/icons/' + name + '.png';
            document.getElementsByClassName('container')[0].appendChild(skillImg);
        }, 500);
    }

    neighbors(sender, target) {
        console.log("sender" + sender + " target" + target + " neighvoors?");
        if (target.xpos + 1 === sender.xpos && target.ypos === sender.ypos) {
            return true;
        }

        if (target.xpos - 1 === sender.xpos && target.ypos === sender.ypos) {
            return true;
        }

        if (target.ypos + 1 === sender.ypos && target.xpos === sender.xpos) {
            return true;
        }

        if (target.ypos - 1 === sender.ypos && target.xpos === sender.xpos) {
            return true;
        }

        return false;
    }

    activeUnit(unit) {
        if (this.firstActiveUnit) {
            this.firstActiveUnit = false;
        } else {
            // this.changeActiveUnit(unit);
        }

        let skills = document.getElementsByClassName('skill');
        for (let i = skills.length - 1; i >= 0; i--) {
            skills[i].remove();
        }
        let activeSkillImg = document.getElementById('activeSkill');
        if (!activeSkillImg) {
            activeSkillImg = document.createElement('img');
            activeSkillImg.id = 'activeSkill';
            activeSkillImg.style.position = 'absolute';
            activeSkillImg.style.top = '0';
            activeSkillImg.style.left = 32.5 + 'vw';
            activeSkillImg.style.width = '3.7vw';
            activeSkillImg.style.height = 3.7 * global.ratio + 'vh';
            activeSkillImg.src = '/views/singleplay/textures/activeTile.png';
            document.getElementsByClassName('container')[0].appendChild(activeSkillImg);
        } else {
            activeSkillImg.style.left = 32.5 + 'vw';
        }
        unit.skills.forEach(function (skill, i) {
            console.log(skill.name);
            let skillImg = document.createElement('img');
            skillImg.className = 'skill';
            skillImg.style.position = 'absolute';
            skillImg.style.top = '1.1vh';
            skillImg.style.left = i * 3.5 + 0.45 + 32.5 + 'vw';
            skillImg.style.width = '2.6vw';
            skillImg.style.height = 2.6 * global.ratio + 'vh';
            skillImg.src = '/views/singleplay/icons/' + skill.name + '.png';
            document.getElementsByClassName('container')[0].appendChild(skillImg);
        }.bind(this));
        // this.animationManager.animationActiveTile(unit);
        while (this.units[this.activeIndex % this.units.length].isDead()) {
            this.activeIndex++;
        }
        this.spriteManager.getSprite(this.circle).setTrans(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transActiveCircle(this.activeIndex % this.units.length));
        this.spriteManager.getSprite(this.actionPoint).setTrans(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transActionPoint(this.activeIndex++ % this.units.length));
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.textures[6]);
        this.spriteManager.getSprite(this.activeTile).setTrans(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(unit.ypos, unit.xpos));
        document.onmousedown = function (event) {
            let x = event.clientX / window.innerWidth;
            let y = event.clientY / window.innerHeight;
            let xMin = (1 + global.mapShiftX) / 2;
            let xMax = xMin + 0.6;
            let yMin = (1 - global.mapShiftY) / 2;
            let yMax = yMin + 0.8;
            if (event.which === 1 && x >= xMin && x < xMax && y >= yMin && y < yMax && document.getElementById('win').hidden && document.getElementById('lose').hidden && this.dropMenu === 0 && !this.state.AnimationOnMap) {
                let i = Math.floor((x - xMin) / 0.6 / (1 / 16));
                let j = Math.floor((y - yMin) / 0.8 / (1 / 12));
                let div = document.createElement('div');
                this.dropMenu = div;
                let ul = document.createElement('ul');
                div.className = 'drop-menu';
                div.style.left = event.clientX - 40 + 'px';
                div.style.top = event.clientY - 15 + 'px';
                div.appendChild(ul);
                let elem = global.tiledMap[i][j];
                let func = function (item) {
                    let li = document.createElement('li');
                    li.innerHTML = item.name;
                    li.onclick = function () {
                        let action = new __WEBPACK_IMPORTED_MODULE_2__Action__["a" /* default */]();
                        action.sender = global.tiledMap[unit.xpos][unit.ypos];
                        action.target = global.tiledMap[i][j];
                        action.ability = item;
                        global.actionDeque.push(action);
                        this.dropMenu.remove();
                        this.dropMenu = 0;
                    }.bind(this);
                    ul.appendChild(li);
                }.bind(this);

                if (elem.isOccupied() && elem.unitOnTile.type === unit.type) {
                    console.log('Союзник');
                    unit.skills.forEach(function (item) {
                        if (item.damage[0] < 0) {
                            func(item);
                        }
                    });
                } else if (elem.isOccupied() && elem.unitOnTile.type !== unit.type && (unit.shooter || this.neighbors(global.tiledMap[unit.xpos][unit.ypos], elem))) {
                    console.log('Противник');
                    unit.skills.forEach(function (item) {
                        if (item.damage[0] > 0) {
                            func(item);
                        }
                    });
                } else {
                    console.log('Карта');
                    unit.skills.forEach(function (item) {
                        if (item.typeOfArea === 'circle') {
                            func(item);
                        }
                    });
                    if (elem.active) {
                        let li = document.createElement('li');
                        li.innerHTML = 'Move';
                        li.onclick = function () {
                            let action = new __WEBPACK_IMPORTED_MODULE_2__Action__["a" /* default */]();
                            action.sender = global.tiledMap[unit.xpos][unit.ypos];
                            action.target = global.tiledMap[i][j];
                            action.ability = null;
                            global.actionDeque.push(action);
                            this.dropMenu.remove();
                            this.dropMenu = 0;
                        }.bind(this);
                        ul.appendChild(li);
                    }
                }
                document.getElementsByClassName('container')[0].appendChild(div);
            } else if (event.which === 1 && this.dropMenu !== 0 && event.target.tagName !== 'LI') {
                this.dropMenu.remove();
                this.dropMenu = 0;
            }
        }.bind(this);
    }

    unitAttack(nameSkill, sender, target, wounded) {
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.textures[7]);
        this.updateSkillbar(nameSkill);
        let index = this.indexUnit[sender.unitOnTile.class];
        this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[3 * index]);
        let timer = this.timeAndRunSkill(nameSkill, sender, target, true, wounded);
        setTimeout(function (nameSkill, sender, target) {
            this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[1 + 3 * index]);
            setTimeout(function (sender, target) {
                // gameManager.spriteManager.getSprite(target.unitOnTile.entity.mapId).setTexture(images[92]);
                if (sender.unitOnTile.healthpoint[0] > 0) {
                    this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.entities[6 + index]);
                }
                this.updateHealth(wounded);
            }.bind(this, sender, target), timer + 100);
        }.bind(this, nameSkill, sender, target), 500);
    }

    unitAttackAndKill(nameSkill, sender, target, DeadUnits, wounded) {
        this.unitAttack(nameSkill, sender, target, wounded);
        let timer = this.timeAndRunSkill(nameSkill, sender, target);
        setTimeout(() => {
            // this.removeUnitsInInitiativeLine(DeadUnits);
            DeadUnits.forEach(unit => {
                this.spriteManager.getSprite(unit.entity.mapId).setTexture(this.conditions[2 + 3 * this.indexUnit[unit.class]]);
                this.spriteManager.getSprite(unit.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0, 0));
            });
        }, timer + 800);
    }

    showPossibleMoves(path) {
        for (let i = 0; i < this.possibleMoves.length; i++) {
            global.tiledMap[this.possibleMoves[i].xpos][this.possibleMoves[i].ypos].active = false;
            this.spriteManager.deleteSprite(this.possibleMoves[i].id);
        }
        this.possibleMoves = [];
        for (let i = 0; i < path.length; i++) {
            this.possibleMoves.push({
                id: this.spriteManager.addSprite(-2, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(path[i].ypos, path[i].xpos), this.textures[0], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio), true),
                xpos: path[i].xpos,
                ypos: path[i].ypos
            });
            global.tiledMap[path[i].xpos][path[i].ypos].active = true;
        }
        this.units.forEach(unit => {
            this.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
            this.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        });
        this.spriteManager.sortSprites();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UnitManager;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity {
  constructor() {
    this.mapId = 0;
    this.healthbarId = 0;
    this.lowbarId = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);

class Animation {
  constructor(gameManager) {
    this.gameManager = gameManager;
  }
  static deltaTrans(start, deltaT, deltaTime, timeA) {
    return [start[0] + deltaT[0] * (deltaTime / timeA), start[1] + deltaT[1] * (deltaTime / timeA)];
  }

  MoveAnimation(start, dest, timeA, id) {
    let currentTime = performance.now() * 0.001;
    let deltaT = [dest[0] - start[0], dest[1] - start[1]];
    requestAnimationFrame(Moving.bind(this));
    function Moving(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        this.gameManager.unitManager.units.forEach(function (unit) {
          this.gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          this.gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        }.bind(this));
        this.gameManager.spriteManager.sortSprites();
      } else {
        this.gameManager.spriteManager.getSprite(id).setTrans(Animation.deltaTrans(start, deltaT, deltaTime, timeA));
        this.gameManager.unitManager.units.forEach(function (unit) {
          this.gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          this.gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        }.bind(this));
        this.gameManager.spriteManager.sortSprites();
        requestAnimationFrame(Moving.bind(this));
      }
    }
  }

  MoveHtmlAnimation(element, start, dest, time) {
    let currentTime = performance.now() * 0.001;
    let deltaT = [dest[0] - start[0], dest[1] - start[1]];
    requestAnimationFrame(Moving.bind(this));
    function Moving(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= time) {
        element.style.right = dest[0] + 'vw';
        element.style.top = dest[1] + 'vh';
      } else {
        let dT = Animation.deltaTrans(start, deltaT, deltaTime, time);
        element.style.right = dT[0] + 'vw';
        element.style.top = dT[1] + 'vh';
        requestAnimationFrame(Moving.bind(this));
      }
    }
  }

  FrameAnimation(id, timeA, countFrames, colls, rows, deleteInEnd) {
    let currentTime = performance.now() * 0.001;
    requestAnimationFrame(FrameAnim.bind(this));
    function FrameAnim(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        if (deleteInEnd) {
          this.gameManager.spriteManager.deleteSprite(id);
        }
      } else {
        let frame = Math.floor(deltaTime % timeA / timeA * countFrames);
        this.gameManager.spriteManager.getSprite(id).setTexCoord(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(frame % colls / colls, Math.floor(frame / colls) / rows, (frame % colls + 1) / colls, (Math.floor(frame / colls) + 1) / rows));
        requestAnimationFrame(FrameAnim.bind(this));
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Animation;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Document</title>\n  <link rel=\"stylesheet\" href=\"/views/singleplay/style.css\">\n</head>\n\n<body>\n  <div class=\"container\">\n    <canvas id=\"background\"></canvas>\n    <canvas id=\"canvas\"></canvas>\n    <div style=\"position: relative;\">\n      <span style=\"position:absolute; left:20.8vw; top:2vh;font-size:1.5vw;color: white\" id=\"time\"></span>\n    </div>\n  </div>\n  <img hidden id=\"win\" style=\"position:absolute;width: 100vw; height: 100vh;\" src=\"/views/singleplay/textures/win.png\">\n  <img hidden id=\"lose\" style=\"position:absolute;width: 100vw; height: 100vh;\" src=\"/views/singleplay/textures/lose.png\">\n  </img>\n</body>\n\n</html>\n";

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_scss__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__module_scss__);




const enity = [{
    src: '../../../images/warrior.png'
}, {
    src: '../../../images/priest.png'
}, {
    src: '../../../images/mage.png'
}, {
    src: '../../../images/thief.png'
}];
let index = 0;
const wrape = document.querySelector('div.wrapper');
class Choose extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('div', ['choose'], {});
        this.createChildren();
        return this;
    }

    // const wrappe = document.querySelector('div.wrapper');
    // if (wrappe.childNodes[0] !== undefined) {
    //     wrappe.removeChild(wrappe.childNodes[0])
    // }
    // wrappe.appendChild(this._element);

    createChildren() {
        this.appendChildBlock('img', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('img', ['person']));
    }
    choose() {
        this.appendChildBlock('choose', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['choose_left']));
        wrape.appendChild(this._element);

        this.appendChildBlock('choose', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['choose_right']));
        wrape.appendChild(this._element);

        document.querySelector('a.choose_right').addEventListener('click', () => {
            if (index !== 3) {
                console.log(index);
                ++index;
                document.querySelector('img.person').setAttribute('src', enity[index].src);
            }
        });

        document.querySelector('a.choose_left').addEventListener('click', () => {
            if (index !== 0) {
                --index;
                document.querySelector('img.person').setAttribute('src', enity[index].src);
            }
        });
    }

    leftbar() {
        this.appendChildBlock('left_bar', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['left_bar']).setText('test'));
        wrape.appendChild(this._element);

        this.appendChildBlock('new_character', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['new_character']).setText('CREATE NEW'));
        wrape.appendChild(this._element);

        this.appendChildBlock('new_character', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['delete']).setText('DELETE'));
        wrape.appendChild(this._element);
    }
    footbarCreate() {
        this.appendChildBlock('footbar', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['enter']).setText('ENTER'));
        wrape.appendChild(this._element);
        this.appendChildBlock('footbar', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['back']).setText('BACK'));
        wrape.appendChild(this._element);
    }
    creation() {
        const image = document.querySelector('img.wall');
        if (document.querySelector('div.main-menu') !== null) {
            console.log(image);
            document.querySelector('div.main-menu').remove();
        }
        image.remove();

        wrape.appendChild(this._element);
        this.footbarCreate();
        this.choose();
        this.leftbar();
        let value = document.querySelector('img.person');
        value.setAttribute('src', enity[0].src);

        // const navigator = document.querySelector('a.buttonBack');
        //     navigator.addEventListener('click', () => {
        //         new Router().go('/')
        //     });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Choose;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./module.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./module.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, ".person {\n  top: 30%;\n  left: 32%;\n  font-size: 120%;\n  position: absolute; }\n\n.enter {\n  display: inline-block;\n  width: 12vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 90%;\n  left: 44%;\n  font-size: 150%; }\n\n.enter:hover {\n  color: white;\n  cursor: pointer; }\n\n.enter:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.back {\n  display: inline-block;\n  width: 10vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 90%;\n  right: 6%;\n  font-size: 150%; }\n\n.back:hover {\n  color: white;\n  cursor: pointer; }\n\n.back:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.choose_left {\n  display: inline-block;\n  outline: none;\n  border: 3px black;\n  border-radius: 100px;\n  transition: 0.2s;\n  background-size: cover;\n  font-family: fantasy;\n  position: absolute;\n  padding: 20px;\n  background-image: url(" + __webpack_require__(18) + ");\n  top: 77%;\n  left: 42%;\n  font-size: 150%;\n  cursor: pointer; }\n\n.choose_left:hover {\n  background: green; }\n\n.choose_right {\n  display: inline-block;\n  outline: none;\n  border: 3px black;\n  border-radius: 100px;\n  transition: 0.2s;\n  background-size: cover;\n  font-family: fantasy;\n  position: absolute;\n  padding: 20px;\n  background-image: url(" + __webpack_require__(18) + ");\n  top: 77%;\n  left: 53%;\n  font-size: 150%;\n  cursor: pointer;\n  transform: rotate(180deg); }\n\n.choose_right:hover {\n  background: green; }\n\n.left_bar {\n  width: 20vw;\n  height: 50vh;\n  background: #382c2f;\n  margin: -215px 0 0 -125px;\n  position: absolute;\n  top: 60%;\n  left: 15%;\n  padding: 10px;\n  border: solid 3px #5b2d0c;\n  color: white;\n  font-family: fantasy;\n  font-size: 150%;\n  background-size: cover; }\n\n.new_character {\n  display: inline-block;\n  width: 12vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 90%;\n  left: 10%;\n  font-size: 150%; }\n\n.new_character:hover {\n  color: white;\n  cursor: pointer; }\n\n.new_character:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.delete {\n  display: inline-block;\n  width: 11vw;\n  height: 5vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 75%;\n  left: 10%;\n  font-size: 120%; }\n\n.delete:hover {\n  color: white;\n  cursor: pointer; }\n\n.delete:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n", ""]);

// exports


/***/ }),
/* 58 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 59 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 59;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./forms/forms.scss": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 60;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./http.js": 9,
	"./mediator.js": 62,
	"./router.js": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 61;

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

class Mediator {
    constructor() {
        if (Mediator.__instance) {
            return Mediator.__instance;
        }

        this.channels = new Map();

        Mediator.__instance = this;
    }

    subscribe(name, func) {

        if (!this.channels.get(name)) {
            this.channels.set(name, []);
        }
        this.channels.get(name).push(func);
        return this;
    }

    publish(name, payload = null) {
        if (!this.channels.get(name)) {
            return;
        }
        this.channels.get(name).forEach(func => {
            func(payload);
        });
    }

    unsubscribe(name, f) {
        if (!this.channels.get(name)) {
            return;
        }
        this.channels.get(name).splice(this.channels.get(name).indexOf(f), 1);
        return;
    }

}
/* harmony export (immutable) */ __webpack_exports__["default"] = Mediator;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./banner.png": 64,
	"./logo2.png": 65,
	"./mage.png": 66,
	"./priest.png": 67,
	"./thief.png": 68,
	"./warrior.png": 69
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 63;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./banner-8fbe7a02e185423efad976b0be95524b.png";

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./logo2-3cf843d080ef7f43169fc926bd2e4895.png";

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./mage-c458dd5d04052ebc27883fbfecf7db54.png";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./priest-87d5d9da08d4f88271884f821fd9c79f.png";

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./thief-44dd92f7e16a9964c45341046cc9cacc.png";

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./warrior-39d7246a94bd3c09959c9649a740eed9.png";

/***/ })
/******/ ]);