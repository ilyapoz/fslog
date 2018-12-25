import ko from 'knockout';
import vfs from './vfs';

class FsViewModel {
  constructor() {
    this.points = ko.observableArray();
  }

  stats() {
    if (!this.round) {
      return [];
    }
    var map = {};
    for (const point of this.round.points) {
      map[point.name] = {
        sum: 0,
        count: 0
      }
    }

    var prev_time = this.points().length === 0 ? 0 : this.points()[0].time;
    for (const point of this.points()) {
      map[point.name].sum += point.time - prev_time;
      map[point.name].count += 1;
      prev_time = point.time;
    }

    var result = [];
    for (const point of this.round.points) {
      result.push({
        point: point,
        stats: map[point.name]
      })
    }
    return result;
  }

  setup(round) {
    this.round = round;
    this.round.points = []
    for (const element of round.draw) {
      for (const point of element.points) {
        this.round.points.push(point);
      }
    }
  }

  place() {
    this.points.push({
      name: this.nextPoint().name,
      time: player.currentTime
    });
  }

  startTime() {
    return this.points()[0].time
  }

  nextPoint() {
    const length = this.points().length;
    return this.round.points[length % this.round.points.length];
  }
}

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

  var vm = new FsViewModel();
  vm.setup({
    draw: [
      vfs.G, vfs._13, vfs._14
    ]
  });

  ko.applyBindings(vm, document.getElementById('root'));
});
