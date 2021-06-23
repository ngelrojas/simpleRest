const routes = (app) => {

    app.route('/')

    .get((req, res) => {
        res.send(`this method is get`)
    })

    .post((req, res) => {
        res.send('this is post method')
    })

    .put((req, res) => {
        res.send('this is put method')
    })

    .delete((req, res) => {
        res.send('this is delete method')
    })
};

module.exports = routes;

