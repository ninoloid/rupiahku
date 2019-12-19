const bcrypt = require('bcrypt')

const passwordHash = password => {
  const salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(password, salt)
  return hash
}

module.exports = passwordHash