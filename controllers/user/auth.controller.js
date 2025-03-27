class AuthController {
    async signup(req, res, next) {
        try {
            const user = await new UserModel({
                name: req.body.name,
                email: req.body.email,
                image: req.body.image,
                password: bcrypt.hashSync(req.body.password, 8),
            });
            user.save((err, user) => {
                if (err) {
                    return res.status(500).send({ message: err });
                }
                return res.status(200).send({ message: "User was registered successfully!" });
            });
        } catch (error) {
            next(error);
        }
    }

    async signin(req, res) {
        
    }
}