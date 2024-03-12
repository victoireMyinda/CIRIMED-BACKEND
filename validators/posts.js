const validator = (val, pattern, msg) => {
    if (!val)
        throw new Error(msg);
    if (pattern)
        if (!pattern.test(val)) {
            throw new Error(msg)
        }
}

const validatorPost = (post) => {
    validator(post.title, null, 'Veuillez définir un titre svp!');
    validator(post.desc, null, 'Veuillez définir une description svp!');
};

module.exports = {
    validatorPost
}