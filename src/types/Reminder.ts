interface Reminder {
    id: Number,
    name: String,
    date: number, // store the date as a Unix epoch timestamp so Redux can serialize it
    color: String
}

export default Reminder;