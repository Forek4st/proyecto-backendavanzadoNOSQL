const isEmployee = (req, res, next) => {
  if (req.role === 'EMPLOYEE' || req.role === 'ADMIN') {
    next()
  } else {
    res.status(403).json({
      msg: 'Aunauthorized role'
    })
  }
}

export { isEmployee }
