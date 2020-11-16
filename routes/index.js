const baseRoute = require('./base_router')

const router = baseRoute()

router.get("/", (req, res) => {

    res.status(200).json({
        message: 'welcome'
    })
})

module.exports = router