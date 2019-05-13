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
    const start_time = points.length > 0 ? points[0].time : null;
    const formations = points.reduce((res, point, i, points) => {
      res[i % this.num_formations].push(Object.assign({}, point, {
        id: i,
        cumulative: point.time - start_time,
        incremental: i > 0 ? point.time - points[i - 1].time : 0,
      }));
      return res;
    }, Array.from({length: this.num_formations}, () => []));

    const num_points = points.length;
    const num_pages = Math.max(1, Math.ceil(num_points / this.num_formations));
    const pages = Array.from({length: num_pages}, (v, i) => {
      if (points.length === 0) {
        return {start: 0.0, finish: 0.0};
      }
      const start = Math.max(0, i * this.num_formations - 1);
      const end = Math.min((i + 1) * this.num_formations - 1, points.length - 1);
      return {start: points[start].time, finish: points[end].time};
    });
    const finish_time = points.length > 0 ? points[points.length - 1].time : null;
    return {
      start_time,
      finish_time,
      formations,
      pages,
    };
  }

  formation(seq) {
    return this.formations[seq % this.num_formations];
  }
}

export default {Random, Block, Position, Draw};
