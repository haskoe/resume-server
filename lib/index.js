import http from 'http'
import { Command } from 'commander'
const program = new Command();
import express from 'express'
import bodyParser from "body-parser";
import { createTerminus } from '@godaddy/terminus'

// require themes
import { render as themeEvenRender } from './theme-even/index.js'

const themes = {
    'even': { render: themeEvenRender },
    'odd': { render: themeEvenRender }
};
const localeBundle = {
    'da': {
        'countryCode': 'da',
        'about': 'Om mig',
        'motivation': 'Motivation',
        'status': 'Status',
        'education': 'Uddannelse',
        'interests': 'Interesser',
        'work': 'Erhvervserfaring'
    },
    'en': {
        'countryCode': 'en',
        'about': 'About',
        'motivation': 'Motivation',
        'status': 'Status',
        'education': 'Education',
        'interests': 'Interests',
        'work': 'Work'
    }
};
const defaultTheme = themes['even']
const defaultLocale = 'da'

async function fromGist(gistId) {
    const gistUrl = `https://api.github.com/gists/${gistId}`
    err = 'error fetching gist'
    resumeJson = JSON.parse((await got.get(gistUrl).json()).files[RESUME_JSON].content)
    resumeJson.locale = localeBundle[localeCode];
    err = 'Error rendering resume'
    output = theme.render(resumeJson)
    err = ''

}

const createInput = (args, resumeJson) => ({
    theme: themes[args.theme] || defaultTheme,
    locale: localeBundle[args.locale] || defaultLocale,
    resumeJson: args.resume || resumeJson
})
const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/themes', (req, res) => {
    res.send(Object.keys(themes).join('<br/>'))
})
app.get('/gists', (req, res) => {
    // get username from qs, get resume.json gist
    const args = parseQueryString(req, globals)
})
app.get('/gist', (req, res) => {
    const args = parseQueryString(req, globals)
    res.send(Object.keys(themes).join('<br/>'))
})
app.post('/', (req, res) => {
    const input = createInput(req.body)
    res.send(input.theme.render(input))
})

const server = http.createServer(app)

program
    .option(
        '-h, --host <item>',
        'host',
        '0.0.0.0'
    )
    .option(
        '-p, --port <item>',
        'port',
        '80'
    )
program.parse();

async function onHealthCheck() {
    // todo: verify mail connection
}
const onSignal = () => console.log('server is starting cleanup')

createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal
})

const opts = program.opts()
server.listen(opts.port, opts.host, () => {
    console.log(`Started on PORT ${opts.port}`);
})
