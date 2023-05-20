import Serve from './serve.js'
import { Command } from 'commander';
const program = new Command();

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

(async () => {
    // program
    //     .name('string-util')
    //     .description('jsonresume server')
    //     .version('0.8.0');

    program
        // .command('serve')
        // .description('Serve resume at http://<host>:<port>')
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

    const opts = program.opts();
    Serve({
        ...opts,
        themes: themes,
        defaultTheme: themes['even'],
        localeBundle: localeBundle
    })
})();
