class View {
    static displayErr(err) {
        console.log('terjadi error')
        console.log(err)
    }

    static displayMsg(data) {
        console.log(data)
    }
}

module.exports = View