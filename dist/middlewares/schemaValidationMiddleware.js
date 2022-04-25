export function schemaValidationMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body);
        if (validation.error) {
            throw { type: "bad_request", message: "Invalid schema" };
        }
        next();
    };
}
