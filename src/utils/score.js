const infrastrukturConvert = {
  'badan jalan': 9,
  drainase: 8,
  trotoar: 7,
  median: 6
}

const breakageConvert = {
  Berat: 9,
  Sedang: 8,
  Ringan: 7
}

const generateScore = (infrastucture, breakage) => {
  const numInfrastucture = infrastrukturConvert[infrastucture]
  const numBreakage = breakageConvert[breakage]

  const score = numInfrastucture * 0.6 + numBreakage * 0.4

  return score.toFixed(1)
}

module.exports = { generateScore }
module.generateScore = generateScore
