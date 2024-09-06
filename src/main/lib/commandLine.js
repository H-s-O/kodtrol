import yargs from 'yargs/yargs';

import isDev from '../../common/js/lib/isDev';

const argv = yargs(process.argv.slice(isDev ? 2 : 1)).argv;

export const cliScreenshotsFile = () => {
    if ('screenshots' in argv && !!argv.screenshots) {
        return argv.screenshots;
    }
    return null;
};

export const cliProjectFile = () => {
    if ('project' in argv && !!argv.project) {
        return argv.project;
    }
    return null;
};

export const cliNewProject = () => {
    return 'newProject' in argv && argv.newProject === true;
}

export const cliRunBoard = () => {
    if ('runBoard' in argv && !!argv.runBoard) {
        return argv.runBoard;
    }
    return null;
}