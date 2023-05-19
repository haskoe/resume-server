import http from 'node:http';
import url from 'node:url';
import qs from 'node:querystring';
import Gists from 'gists';

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
        const localeCode = args.locale || 'da';
        const reqThemeName = args.theme || null;
        const theme = reqThemeName ? (themes[reqThemeName] || defaultTheme) : defaultTheme;

        var resumeJson = null;
        if (parsed.pathname.substring(1)) {
            const gists = new Gists({
                username: 'haskoe'
            });
            const lst = await gists.list(parsed.pathname.substring(1));
            if (lst.body?.length || 0) {
                const filtered = lst.body.filter(x => Object.keys(x.files)[0] == RESUME_JSON);
                if (filtered.length == 1) {
                    const theGist = await gists.get(filtered[0].id);
                    resumeJson = JSON.parse(theGist?.body?.files[RESUME_JSON].content || null);
                    resumeJson.locale = localeBundle[localeCode];
                }
            }
        }
        res.writeHead(resumeJson && theme ? 200 : 404, CONTENT_TYPE_HTML);
        res.end(resumeJson ? theme.render(resumeJson) : 'error');
    }
}

export default function Serve({ host, port, themes, defaultTheme, localeBundle }) {
    const server = http.createServer(createRequestListener(themes, defaultTheme, localeBundle));
    server.listen(port || 4000, host || '0.0.0.0', () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
};
