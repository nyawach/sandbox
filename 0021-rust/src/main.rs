fn main() {
    for n in 1..40 {
        fizzbuzz(n);
    }
}

fn fizzbuzz(n: i32) {
    match (n % 3, n % 5) {
        (0, 0) => println!("FizzBuzz"), // nを3で割った余りと5で割った余りが両方0
        (0, _) => println!("Fizz"),     // nを3で割った余りが0
        (_, 0) => println!("Buzz"),     // nを5で割った余りが0
        _      => println!("{}", n),
    }
}
