const Gists = require('gists')

async function test() {
    const gists = new Gists({
        username: 'haskoe'
    });
    var resumeJson = null;
    const lst = await gists.list('haskoe');
    const filtered = lst.body.filter(x => Object.keys(x.files)[0] == 'resume.json');
    if (filtered.length == 1) {
        const theGist = await gists.get(filtered[0].id);
        resumeJson = JSON.parse(theGist.body.files[RESUME_JSON].content);
    }
    console.log(resumeJson);
};

(async () => {
    await test();
})()
