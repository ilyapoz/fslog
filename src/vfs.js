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

export default {Random, Block, Position};
