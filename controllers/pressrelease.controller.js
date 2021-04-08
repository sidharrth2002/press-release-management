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
    },
    async getPressRelease(id) {
        const release = await pressreleases.findByPk(id);
        if(!release) {
            return null
        } else {
            return release
        }
    }
}

module.exports = controllers