import moment from "moment";
import Event from "./classes/Event";

let events = [

  new Event(0, 
    "Old people", 
    "Old people gettin together playing BINGO",
    "Kevin",
    new Date(),
    new Date(moment().add(1, "days")),
    ),

  new Event(2, 
    "Farting contest", 
    "old people farting",
    "Kevin",
    new Date(moment().add(2, "days")),
    new Date(moment().add(2, "days")),
    )
];

export default events;
