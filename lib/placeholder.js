const _ = require('./_')

exports = module.exports = (data) => {
  let quotes = [
    'Nyaa~',
    'Meow!',
    'Mew~',
    'Nyan!',
    'More pets!',
    'Maow',
    'More pets please!',
    "Wow, you're really good at petting!",
    'Myaster~',
    'Ehe~',
    "If only I could get pet like this all day long~"
  ]

  let strings = [
    "She's very happy!",
    "She seems pleased!",
    "She asks you to pet her more.",
    "She blushes profusely.",
    "Her face turns bright red.",
    "She hopes you enjoy petting her."
  ]

  let actions = [
    _.em(32)('pet'),
    _.em(32)('cuddle'),
    _.em(34)('lightly stroke'),
    _.em(32)('pat'),
    _.em(33)('nibble'),
    _.em(33)('tease'),
    _.em(32)('snuggle')
  ]

  return {
    quote: quotes[Math.floor(Math.random() * quotes.length)],
    text: [
      'You %s a catgirl. ' + strings[Math.floor(Math.random() * strings.length)],
      actions[Math.floor(Math.random() * actions.length)]
    ]
  }
}
