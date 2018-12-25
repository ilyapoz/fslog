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

export default {Randem, Block};
