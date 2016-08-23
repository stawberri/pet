const _ = require('./_')

exports = module.exports = $ => {
  let strings = [
    "She's very happy!",
    "She seems pleased!",
    "She asks you to pet her more.",
    "She blushes profusely.",
    "Her face turns bright red.",
    "She hopes you enjoy petting her."
  ]

  return {
    $,
    action: 'You pet a catgirl.',
    quote: 'Nyaa~',
    description: strings[Math.floor(Math.random() * strings.length)],
    advice: ['Type %s to pet her again.', 'petpet']
  }
}
