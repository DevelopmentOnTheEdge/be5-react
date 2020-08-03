import $        from 'jquery';
import _        from 'underscore';
import 'jest-canvas-mock'

global._ = _;
global.$ = $;

window.URL.createObjectURL = function () {};
