import $        from 'jquery';
import _        from 'underscore';
import 'jest-canvas-mock'
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';
import * as utils from "../src/scripts/be5/utils/utils"
configure({adapter: new Adapter()});


global._ = _;
global.$ = $;

window.URL.createObjectURL = function () {};
jest.spyOn(utils, "isGuest").mockReturnValue(false);