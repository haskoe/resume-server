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
    }
};

(async () => {
    program
        .name('string-util')
        .description('jsonresume server')
        .version('0.8.0');

    program
        .command('serve')
        .description('Serve resume at http://<host>:<port>')
        .option(
            '-h, --host',
            'host. default 0.0.0.0',
            '0.0.0.0'
        )
        .option(
            '-p, --port',
            'port. default 4000',
            4000
        )
        .action(opts => {
            Serve({ 
                ...opts, 
                themes: themes, 
                defaultTheme: themes['even'],
                localeBundle: localeBundle
            })
        });

     program.parse();
})();
