import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ko from 'knockout';
import vfs from './vfs';

class FsViewModel {
  constructor() {
    this.points = ko.observableArray();
    this.draw = ko.observable("G-13-14");
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

  updateDraw() {
    this.setup({draw: vfs.ParseDraw(this.draw())});
  }

  reset() {
    this.points.removeAll();
    player.currentTime = 0;
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

  playbackRate(rate) {
    player.playbackRate = rate;
  }

  togglePlay() {
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }

  goTo(point) {
    player.currentTime = point.time;
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

  var vm = new FsViewModel();
  vm.setup({
    draw: vfs.ParseDraw(vm.draw())
  });

  ko.applyBindings(vm, document.getElementById('root'));
});
