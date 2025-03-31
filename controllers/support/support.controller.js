const {StatusCodes: HttpStatus} = require('http-status-codes');
class SupportController {
    renderChatRoom(req, res, next) {
        try {
            return res.render('chat.ejs', {
                error:undefined
            });
        } catch (error) {
            next(error);  
        }
    }
}

module.exports = {
    SupportController: new SupportController()
}