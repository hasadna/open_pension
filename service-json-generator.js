const { exec } = require("child_process")

const { TRAVIS_COMMIT: gitTag } = process.env;
const ACTIVE_SERVICES = [
    "client"
]

function executeShellCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(error || stdout);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function getDockerImagesByString(tag="latest") {
    const name = "hasadna/"
    const imagesString = await executeShellCommand(`docker images | grep ${tag} | awk '{print $1}' | grep ${name}`)
    const images = imagesString.split("\n")
    return images.filter((value, index, self) => {
        return self.indexOf(value) === index && value !== '';
    })
}

async function tagDockerImages() {
    const images = await getDockerImagesByString();
    const taggingProcess = images.map(image => executeShellCommand(`docker tag ${image}:latest ${image}:${gitTag}`))
    return Promise.all(taggingProcess)
}

async function getServices() {
    const images = await getDockerImagesByString();
    return images.map(image => image.replace("hasadna/open-pension-", '')).filter(service => ACTIVE_SERVICES.includes(service))
}

function pushDockerImage(imageName) {
    return executeShellCommand(`docker push ${imageName}`)
}

function pushTaggedImages(images) {
    return Promise.all(images.map(image => pushDockerImage(image)))
}

function generateUpdatesJSON(services, images) {
    const servicesJSON = services.reduce((acc, service) => {
        acc[service] = { image: images.find(image => image.includes(service)) }
        return acc;
    }, {})
    return {
        opnepension: servicesJSON
    }
}

async function main() {
    try {
        await executeShellCommand("docker-compose push")
        await tagDockerImages()
        let [taggedImages, services] = await Promise.all([
            getDockerImagesByString(gitTag),
            getServices()
        ]);
        taggedImages = taggedImages.map(image => `${image}:${gitTag}`)
        await pushTaggedImages(taggedImages)
        const updatesJson = generateUpdatesJSON(services, taggedImages)
        console.log(JSON.stringify(updatesJson))
        process.exit(0)
    } catch (e) {
        console.error(e);
        process.exit(1)
    }

}
main();
