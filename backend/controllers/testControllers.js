module.exports.testFunction = (req, res) => {
    res.status(200).json({
        response: 'success',
        content: 'TEST',
    })
}
