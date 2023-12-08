const categorySelect = document.getElementById("category");
const amountSelect = document.getElementById("amount");

//let url = `http://localhost:3000/api?category=${category}&amount=${amount}`;
let url = "http://localhost:3000/api";

const shuffleArr = myArr => {
    let a, b;
    for(let i=0; i<myArr.length; i++) {
        rand=Math.floor(Math.random()*myArr.length);
        a = myArr[i];
        b = myArr[rand];
        myArr[i] = b;
        myArr[rand] = a;
    }
    return myArr;
}

const Submit = () => {
    category = categorySelect.value;
    amount = amountSelect.value;
    console.log(`${url}?category=${category}&amount=${amount}`);
    fetch(`${url}?category=${category}&amount=${amount}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

};



