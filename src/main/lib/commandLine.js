import yargs from 'yargs/yargs';

import isDev from '../../common/js/lib/isDev';

const argv = yargs(process.argv.slice(isDev ? 2 : 1)).argv;

export const screenshotsFile = () => {
    if ('screenshots' in argv && !!argv.screenshots) {
        return argv.screenshots;
    }
    return null;
};

export const projectFile = () => {
    if ('project' in argv && !!argv.project) {
        return argv.project;
    }
    return null;
};

export const newProject = () => {
    return 'newProject' in argv && argv.newProject === true;
}