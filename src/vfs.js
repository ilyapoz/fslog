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

const G = Random('G');
const _13 = Block('13');
const _14 = Block('14');

export default {G, _13, _14};
