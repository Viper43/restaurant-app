const userController = async (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: 'User data'
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error occurred while fetching user data',
            error
        })
    }
}

module.exports = { userController }