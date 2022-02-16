import moment from "moment"

export const isAValidEndDate = (startDate, endDate) => {
    const momentStart = moment(startDate);
    const momentEnd = moment(endDate);
    return (momentEnd.isSameOrAfter(momentStart));
}

export const validateTitle = (title) => {
    return (title.trim().length > 2);
}