const _ = require('./_')

exports = module.exports = $ => {
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
    _.em(32) + 'pet' + _.em,
    _.em(32) + 'cuddle' + _.em,
    _.em(34) + 'lightly stroke' + _.em,
    _.em(32) + 'pat' + _.em,
    _.em(33) + 'nibble' + _.em,
    _.em(33) + 'tease' + _.em,
    _.em(32) + 'snuggle' + _.em
  ]

  return {
    $,
    action: ['You %s a catgirl.', actions[Math.floor(Math.random() * actions.length)]],
    quote: quotes[Math.floor(Math.random() * quotes.length)],
    description: strings[Math.floor(Math.random() * strings.length)],
    advice: ['Type %s to pet her again.', 'petpet']
  }
}
