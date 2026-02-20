
const argv = process.argv.slice(2);

const maior = argv[0] > argv[1] ? argv[0] : argv[1];
const menor = argv[0] > argv[1] ? argv[1] : argv[0];

console.log('menor', menor, 'maior', maior);

for (let i = menor; i <= maior; i++) {
    if(i%2==0){
    console.log("\x1b[31m%d\x1b[0m",i);
    }else{
        console.log("\x1b[44m%d\x1b[0m",i);
    }
}