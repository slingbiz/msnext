const capFirst = string => {
  if (!string?.length) {
    return ''
  }

  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = { capFirst }
