export default (dependencies) => {

    const { moviesValidator } = dependencies;

    const validateFantasyMovie = async (request, response, next) => {
        // Input
        try {
            const validated = await moviesValidator.validateAsync(request.body);
            request.body = validated;
            next();
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        validateFantasyMovie
    };
};