const isClient = (req, res, next) => {
  if (req.role === 'CLIENT') {
    next()
  } else {
    res.status(403).json({
      msg: 'Unauthorized role'
    })
  }
}

export { isClient }
