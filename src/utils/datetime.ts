export type TimeInterval = {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};

// Get time interval between two dates
export const getTimeInterval = (
    startTime: Date,
    endTime: Date,
): TimeInterval => {
    // @ts-expect-error Math.abs perfecly works with Date input
    const differenceInMilliseconds = Math.abs(endTime - startTime);

    const hours = Math.floor(differenceInMilliseconds / 1000 / 60 / 60);
    const minutes =
        Math.floor(differenceInMilliseconds / 1000 / 60) - hours * 60;
    const seconds =
        Math.floor(differenceInMilliseconds / 1000) -
        hours * 60 * 60 -
        minutes * 60;
    const milliseconds =
        differenceInMilliseconds -
        hours * 60 * 60 * 1000 -
        minutes * 60 * 1000 -
        seconds * 1000;

    return { hours, minutes, seconds, milliseconds };
};

export const formatDate = (date: Date): string => {
    const dateFormatOptions = {
        dateStyle: "short",
        timeStyle: "long",
    } as Intl.DateTimeFormatOptions;

    return date.toLocaleString(undefined, dateFormatOptions);
};
