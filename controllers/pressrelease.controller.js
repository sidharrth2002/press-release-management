const pressreleases = require('../models').pressreleases 

const controllers = {
    async getPressReleases() {
        const all = await pressreleases
        .findAll({
            where: {
                approved: true
            }
        })
        console.log(all)
        return all
    },
    async getUnapproved() {
        const releases = await pressreleases.findAll({
            where: {
                approved: false
            }
        })
        console.log(releases);
        return releases
    }
}

module.exports = controllers