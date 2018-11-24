import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import typeAhead from './modules/typeAhead'
import autocomplete from './modules/autocomplete'
import hero from './modules/hero'
import makeMap from './modules/map'

if ($('.flash')) {
	setTimeout(function () {
		$('.flash').classList.add('fade-out')
	}, 1000)
}

hero( $('.hero') )
autocomplete( $('#address'), $('#lng'), $('#lat'))
typeAhead( $('.search') )


makeMap( $('#map') )