function Random(name) {
  return {
    points: [{name}]
  }
}

function Block(name) {
  return {
    points: [{name: name + '+'}, {name: name + '-'}]
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

    this.points = this.draw.reduce((points, element) => {
      for (const point of element.points) {
        points.push(point);
      }
      return points;
    }, []);

    this.num_points = this.points.length;
  }

  stats(points) {
    let result = Array.from({length: this.num_points}, (v, i) => []);
    const start_time = points.length > 0 ? points[0].time : null;
    return points.reduce((res, point, i, points) => {
      res[i % this.num_points].push(Object.assign({}, point, {
        id: i,
        cumulative: point.time - start_time,
        incremental: i > 0 ? point.time - points[i - 1].time : 0,
      }));
      return res;
    }, result);
  }

  point(seq) {
    return this.points[seq % this.num_points];
  }
}

export default {Random, Block, Position, Draw};
