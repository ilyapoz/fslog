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
  if (name.length == 1 && 'A' <= name && name <= 'Q') {
    return Random(name);
  }

  return Block(name);
}

function ParseDraw(str) {
  var result = [];
  for (const element of str.split('-')) {
    result.push(Position(element));
  }
  return result;
}

export default {Random, Block, Position, ParseDraw};
