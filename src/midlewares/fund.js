const getFund = (req, res, next) => {
    const data = {
        name: "Long",
        age: 19
    }
    res.setHeader('Content-Type', 'application/json')
    res.send(data)
}

exports.getFund = getFund