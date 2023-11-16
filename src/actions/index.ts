export enum ActionTypeEnum {
    ROTATE = 'ROTATE',
    STOP = 'STOP',
}

export const actions = {
    stop,
    rotate
};

function rotate() {
    return { type: ActionTypeEnum.ROTATE };
}

function stop() {
    return { type: ActionTypeEnum.STOP };
}

