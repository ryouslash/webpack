import "./sub";
import "./app.scss";

const init = async () => {
  console.log("this is a main file");
  await asyncFn();
};
init();

async function asyncFn() {
  console.log([1, 2, 3].includes(0));
  console.log("I'm async function");
}
