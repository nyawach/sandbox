fn main() {
  // wrap with arc
  let lock1 = std::sync::Arc::new(std::sync::Mutex::new(()));
  let lock2 = std::sync::Arc::new(std::sync::Mutex::new(()));

  // clone the arc from 
  let lock1_clone = std::sync::Arc::clone(&lock1);
  let lock2_clone = std::sync::Arc::clone(&lock2);

  // create each thread
  let thread1 = std::thread::spawn(move || {
    let _lock = lock1_clone.lock().unwrap();
    println!("Thread 1 acquired lock 1");
    std::thread::sleep(std::time::Duration::from_secs(1));
    let _lock = lock2_clone.lock().unwrap();
    println!("Thread 1 acquired lock 2");
  });

  let thread2 = std::thread::spawn(move || {
    let _lock = lock2.lock().unwrap();
    println!("Thread 1 acquired lock 2");
    std::thread::sleep(std::time::Duration::from_secs(1));
    let _lock = lock1.lock().unwrap();
    println!("Thread 1 acquired lock 1");
  });
  // wait for each thread to finish
  thread1.join().unwrap();
  thread2.join().unwrap();
}
