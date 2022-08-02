import BackgroundService from 'react-native-background-actions';

const sleep = (time: any) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

// You can do anything in your task such as network requests, timers and so on,
// as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
// React Native will go into "paused" mode (unless there are other tasks running,
// or there is a foreground app).
const veryIntensiveTask = async () => {
    // Example of an infinite loop task
    const delay: number = 10000;
    await new Promise(async (resolve) => {
        for (let i = 0; BackgroundService.isRunning(); i++) {
            console.log(i);
            updateNotificationAction(i.toString());
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'Example',
    taskTitle: ' ',
    taskDesc: ' ',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
        delay: 10000,
    },
};



export const startTaskAction = async () => {
    await BackgroundService.start(veryIntensiveTask, options);
};

export const updateNotificationAction = async (text: string) => {
    await BackgroundService.updateNotification({ taskDesc: text });
    // Only Android, iOS will ignore this call
}

export const stopTaskAction = async () => {
    await BackgroundService.stop();
    // iOS will also run everything here in the background until .stop() is called
};



