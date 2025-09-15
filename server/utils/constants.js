import moment from "moment-timezone";

export const regex_validation = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}$/,
    full_name: /^[A-Za-z\s]+$/,
};

export const formatDateByTimezone = (date, timezone = "UTC") => {
    return moment(date).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
};