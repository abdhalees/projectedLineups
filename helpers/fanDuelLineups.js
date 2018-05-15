const postions = require('./fanDuelPostions')
const Genetic = require('genetic-js')

module.exports = (data, min, max, limit) => {
  let possibleLineups = []
  const availablePositions = ['P', 'C', '1B', '2B', '3B', 'SS', 'OF', 'OF', 'OF']
  const playerPostions = postions(data)

  const genetic = Genetic.create()
  genetic.optimize = Genetic.Optimize.Maximize
  genetic.select1 = Genetic.Select1.RandomLinearRank

  genetic.seed = () => {
    const { availablePositions, playerPostions, max, min } = this.userData
    const randomSeed = () => availablePositions.map(postion => {
      return Math.floor(Math.random() * playerPostions[postion].length)
    })
    const lineupPrice = (lineup) => lineup.reduce((acc, curr, i) => {
      acc += playerPostions[availablePositions[i]][curr].FanDuelSalary
      return acc
    }, 0)
    let seed = randomSeed()
    let price = lineupPrice(seed)
    while (seed[6] === seed[7] ||
        seed[7] === seed[8] ||
        seed[6] === seed[8] || price > max || price < min) {
      seed = randomSeed()
      price = lineupPrice(seed)
    }
    return seed
  }

  genetic.mutate = (entity) => {
    const { availablePositions, playerPostions, min, max } = this.userData
    const newDrift = () => Math.floor(Math.random() * playerPostions[availablePositions[indexToMutate]].length)
    const lineupPrice = (lineup) => lineup.reduce((acc, curr, i) => {
      acc += playerPostions[availablePositions[i]][curr].FanDuelSalary
      return acc
    }, 0)
    let indexToMutate = Math.floor(Math.random() * availablePositions.length)
    let drift = newDrift()
    entity[indexToMutate] = drift
    let price = lineupPrice(entity)

    while (entity[6] === entity[7] ||
        entity[7] === entity[8] ||
        entity[6] === entity[8] || price > max || price < min) {
      indexToMutate = Math.floor(Math.random() * availablePositions.length)
      drift = newDrift()
      entity[indexToMutate] = drift
      price = lineupPrice(entity)
    }
    return entity
  }

  genetic.fitness = (entity) => {
    const { availablePositions, playerPostions } = this.userData
    const fit = entity.reduce((acc, curr, i) => {
      acc += playerPostions[availablePositions[i]][curr].FantasyPointsFanDuel
      return acc
    }, 0)
    return fit
  }
  genetic.notification = (pop, gen, stats, isFinished) => {
    if (!isArrayInArray(possibleLineups, pop[0].entity)) {
      possibleLineups.push(pop[0].entity)
    }
    if (isFinished) {
      possibleLineups = possibleLineups.slice(possibleLineups.length - limit)
      possibleLineups = possibleLineups.map(lineup => {
        return lineup.map((postion, i) => {
          return playerPostions[availablePositions[i]][postion].PlayerID
        })
      })
    }
  }

  const config = {
    'iterations': 500,
    'size': 250,
    'mutation': 1,
    fittestAlwaysSurvives: true
  }

  const userData = {
    availablePositions,
    playerPostions,
    max,
    min
  }

  genetic.evolve(config, userData)
  return possibleLineups
}

function isArrayInArray (arr, item) {
  const itemAsString = JSON.stringify(item)

  var contains = arr.some((ele) => {
    return JSON.stringify(ele) === itemAsString
  })
  return contains
}
