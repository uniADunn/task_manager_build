// Task Object: author ashley dunn. 9/05/2026
class Task {
    //constructor to create a new task object with title, description, status, and start timestamp properties
    constructor(title, description, status){
        this.start_ts = this.convertToDate(new Date());
        this.title = title;
        this.description = description;
        this.status = status;
    }
    //method to convert a date object to a readable string representation (dd/mm/yyyy format)
    convertToDate = (date) => {
        // get day month and year from date object and format as dd/mm/yyyy string
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        console.log(`Converting to readable date format...`);
        const now = `${day}/${month}/${year}`;
        console.log(`Converted date: ${now}`);
        return now;
    }
    //method to return a string representation of the task object, including start timestamp (date created), title, description and status
    toString(){
        return `Created: ${this.start_ts}
Task Title: ${this.title}
Description: ${this.description}
Status: ${this.status}`;
    }
}