function Random(name) {
  return {
    formations: [{name}]
  }
}

function Block(name) {
  return {
    formations: [{name: name + '+'}, {name: name + '-'}]
  }
}

function Position(name) {
  if (name.length === 1 && 'A' <= name && name <= 'Q') {
    return Random(name);
  }

  return Block(name);
}

class Draw {
  constructor(str) {
    this.str = str;
    this.draw = str.split('-').reduce((draw, element) => {
      draw.push(Position(element));
      return draw;
    }, []);

    this.formations = this.draw.reduce((formations, element) => {
      for (const formation of element.formations) {
        formations.push(formation);
      }
      return formations;
    }, []);

    this.num_formations = this.formations.length;
  }

  stats(points) {
    let result = Array.from({length: this.num_formations}, (v, i) => []);
    const start_time = points.length > 0 ? points[0].time : null;
    return points.reduce((res, point, i, points) => {
      res[i % this.num_formations].push(Object.assign({}, point, {
        id: i,
        cumulative: point.time - start_time,
        incremental: i > 0 ? point.time - points[i - 1].time : 0,
      }));
      return res;
    }, result);
  }

  formation(seq) {
    return this.formations[seq % this.num_formations];
  }
}

export default {Random, Block, Position, Draw};
