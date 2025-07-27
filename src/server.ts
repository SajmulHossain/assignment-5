import app from "./app";

let server;

const pushStart = async() => {
 let server = app.listen(3000, () => {
    console.log(`Server is running on PORT: 3000`);
 })   
}

pushStart();
