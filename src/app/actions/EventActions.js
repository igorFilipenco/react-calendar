import dispatcher from '../dispatcher/Dispatcher';

export function createEvent(new_event) {
    dispatcher.dispatch({
        type: "CREATE_EVENT",
        new_event
    })
}
