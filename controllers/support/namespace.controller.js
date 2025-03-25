const {StatusCodes: HttpStatus, StatusCodes} = require('http-status-codes');
const {ConversationModel} = require('../../models/conversation');
class NamespaceController {
    async addNamespace(req, res, next) {
        try {
            const {title, endpoint} = req.body;
            const conversation = await ConversationModel.create({title, endpoint});
            return res.StatusCodes(HttpStatus.CREATED).json({
                StatusCodes: HttpStatus.CREATED,
                data: {
                    message: "Namespace created successfully",
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async getListOfNamespaces(req, res, next) {
        try {
            const namespaces = await ConversationModel.find({}, {rooms: 0});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    namespaces
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    NamespaceController: new NamespaceController()
}
