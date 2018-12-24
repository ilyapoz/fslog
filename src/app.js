import StateMachine from './state_machine';

$(document).ready(() => {
  var player = $("#player").get(0);

	$(document).on('keyup', event => {
		if (event.key === ' ') {
      player.play();
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
    player.play();
	});
});
