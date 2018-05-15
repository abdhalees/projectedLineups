module.exports = data => {
  return {
    'P': data.filter(({ FanDuelPosition }) => FanDuelPosition === 'P'),
    'C': data.filter(({ FanDuelPosition }) => FanDuelPosition === 'C'),
    '1B': data.filter(({ FanDuelPosition }) => FanDuelPosition === '1B'),
    '2B': data.filter(({ FanDuelPosition }) => FanDuelPosition === '2B'),
    '3B': data.filter(({ FanDuelPosition }) => FanDuelPosition === '3B'),
    'SS': data.filter(({ FanDuelPosition }) => FanDuelPosition === 'SS'),
    'OF': data.filter(({ FanDuelPosition }) => FanDuelPosition === 'OF')
  }
}
