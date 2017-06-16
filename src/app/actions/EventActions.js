import dispatcher from '../dispatcher/Dispatcher';

export function createEvent(new_event) {
    dispatcher.dispatch({
        type: "CREATE_EVENT",
        new_event: new_event
    })
}

export function getCurrentEvents(key) {
    dispatcher.dispatch({
        type: "DISPLAY_CURRENT_EVENTS",
        key: key
    })
}