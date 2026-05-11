// Task Object: author ashley dunn. 9/05/2026
class Task {
    constructor(title, description, status){
        this.start_ts = Date.now();
        this.title = title;
        this.description = description;
        this.status = status;
    }

    toString(){
        return `Task Title: ${this.title}
Description: ${this.description}
Status: ${this.status}`;
    }
}