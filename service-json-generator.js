const { spawn } = require("child_process")
const { writeFile } = require("fs")

const { TRAVIS_COMMIT: gitTag } = process.env;
const ACTIVE_SERVICES = [
    "client"
]

function executeShellCommand(command) {
    return new Promise((resolve, reject) => {
        let out = ''
        const cmd = spawn(`bash`, ['-c', command])

        cmd.stdout.on("data", data => {
            console.log(`stdout: ${data}`)
            out = out + data
        })

        cmd.stderr.on("data", data => console.log(`stderr: ${data}`))

        cmd.on("error", error => {
            console.log(`error:`)
            console.log(error)
            reject(error)
        })

        cmd.on("close", code => {
            console.log(`command: ${command} exited with status - ${code}`)
            resolve(out)
        })
    });
}

function writeToFile(filename, content) {
    return new Promise((resolve, reject) => {
        writeFile(filename, content, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

function print(str) {
    console.log(`===== ${str} =====`)
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
        print("Running docker compose push")
        await executeShellCommand("docker-compose push")
        print("Finished Running docker compose push")
        print("Tagging images")
        await tagDockerImages()
        print("Done tagging images")
        let [taggedImages, services] = await Promise.all([
            getDockerImagesByString(gitTag),
            getServices()
        ]);
        taggedImages = taggedImages.map(image => `${image}:${gitTag}`)
        print("Pushing tagged images")
        await pushTaggedImages(taggedImages)
        print("Done pushing tagged images")
        print("Generating JSON")
        const updatesJson = JSON.stringify(generateUpdatesJSON(services, taggedImages))
        print("Done generating JSON:")
        print(`\n ${updatesJson} \n`)
        const fileName = 'auto-updates.json'
        print(`Saving JSON to file : ${fileName}`)
        await writeToFile(fileName, updatesJson)
        print("Done saving JSON")
        process.exit(0)
    } catch (e) {
        console.error(e);
        process.exit(1)
    }

}
main();
