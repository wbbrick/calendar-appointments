interface Reminder {
    id: string,
    name: string,
    date: number, // store the date as a Unix epoch timestamp so Redux can serialize it
    color: string
}

export default Reminder;