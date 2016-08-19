exports = module.exports = () => {
  let strings = [
    "She's very happy!",
    "She seems pleased!",
    "She asks you to pet her more.",
    "She blushes profusely.",
    "Her face turns bright red.",
    "She hopes you enjoy petting her."
  ]

  console.log(`You pet a catgirl. ${strings[Math.floor(Math.random() * strings.length)]}`)
}
