const sessionCacher = store => next => action => {
    const reduxState = store.getState();
    let sessionState = JSON.parse(sessionStorage.getItem('state'));

    if (!sessionState) {
        sessionState = {
            mainReducer: {},
        };
    }

    let dirty = false;

    if (!sessionState.mainReducer.userdata && reduxState.mainReducer.userdata) {
        sessionState.mainReducer = { ...sessionState.mainReducer, userdata: reduxState.mainReducer.userdata };
        dirty = true;
    }

    if (!sessionState.mainReducer.categories && reduxState.mainReducer.categories) {
        sessionState.mainReducer = { ...sessionState.mainReducer, categories: reduxState.mainReducer.categories };
        dirty = true;
    }

    if (!sessionState.mainReducer.languages && reduxState.mainReducer.languages) {
        sessionState.mainReducer = { ...sessionState.mainReducer, languages: reduxState.mainReducer.languages };
        dirty = true;
    }

    if (dirty) {
        sessionStorage.setItem('state', JSON.stringify(sessionState));
    }

    return next(action);
};

export const sessionState = () => {
    const stringifiedState = sessionStorage.getItem('state');
    if (!stringifiedState) return { mainReducer: {} };
    return JSON.parse(stringifiedState);
};

export default sessionCacher;
