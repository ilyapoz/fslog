import $ from 'jQuery';

import StateMachine from './state_machine';

$(document).ready(function() {
	$(document).on('keyup', event => {
		if (event.key === ' ') {
            console.log('Play');
		} else if (event.key === 'ArrowLeft') {
            console.log('Step back');
		} else if (event.key === 'ArrowRight') {
            console.log('Step forward');
		} else if (event.key === 'ArrowDown') {
            console.log('Rewind');
		} else if (event.key === 'ArrowUp') {
            console.log('Forward');
		}
	});
	$('#toggle_play').on('click', event => {
        console.log('Play');
	});
});
