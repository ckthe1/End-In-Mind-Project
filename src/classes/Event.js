export default class Event {

    /**
     * 
     * @param {Number} id Unique identifier for this event
     * @param {string} title 
     * @param {string} descr 
     * @param {string} author 
     * @param {Date} start 
     * @param {Date} end 
     */
    constructor(id, title, descr, author, start, end) {
        this.id = id;
        this.title = title;
        this.description = descr;
        this.author = author;
        this.start = start;
        this.end = end;
    }
}