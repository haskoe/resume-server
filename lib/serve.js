import http from 'node:http';
import url from 'node:url';
import qs from 'node:querystring';
import got from 'got';

const RESUME_JSON = 'resume.json';
const CONTENT_TYPE_HTML = { 'Content-Type': 'text/html' };

function createRequestListener(themes, defaultTheme, localeBundle) {
    return async (req, res) => {
        const parsed = url.parse(req.url);

        if (parsed.pathname.substring(1) == 'themes') {
            res.writeHead(200, CONTENT_TYPE_HTML);
            res.end(Object.keys(themes).join('<br/>'))
            return;
        }

        const args = qs.parse(parsed.query);
        const localeCode = args.locale in localeBundle ? args.locale : 'da';
        const reqThemeName = args.theme || null;
        const theme = reqThemeName ? (themes[reqThemeName] || defaultTheme) : defaultTheme;

        var resumeJson = null;
        if (parsed.pathname.substring(1).length>1) {
            const gistsUrl = `https://api.github.com/users/${parsed.pathname.substring(1)}/gists`
            const gists = await got.get(gistsUrl).json()
            if (gists.length) {
                const filtered = gists.filter(x => x.public && Object.keys(x.files)[0] == RESUME_JSON);
                if (filtered.length == 1) {
                    const gistUrl = `https://api.github.com/gists/${filtered[0].id}`
                    resumeJson = JSON.parse((await got.get(gistUrl).json()).files[RESUME_JSON].content)
                    resumeJson.locale = localeBundle[localeCode];
                    console.log(gistUrl)
                }
            }
        }
        res.writeHead(resumeJson && theme ? 200 : 404, CONTENT_TYPE_HTML);
        res.end(resumeJson ? theme.render(resumeJson) : 'error');
    }
}

export default function Serve({ host, port, themes, defaultTheme, localeBundle }) {
    const server = http.createServer(createRequestListener(themes, defaultTheme, localeBundle));
    server.listen(parseInt(port), host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
};
