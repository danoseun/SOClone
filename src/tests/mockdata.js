// Register
export const validRegisterData = [
    {
      firstname: 'Ikenna',
      lastname: 'James',
      email: 'iknagod@gmail.com',
      password: 'password',
      username: 'iknagod'
    },
    {
     firstname: 'Grace',
     lastname: 'Delove',
     email: 'gracedelove@gmail.com',
     password: 'password',
     username: 'glove'
    }
  ];
  
  export const inValidRegisterData = [
    // undefined email 0
    {
      first_name: 'John',
      last_name: 'James',
      password: 'jamespass',
      address: 'jamespass'
    },
  
    // spaced email 1
    {
      email: 'jja mes@gmail.com',
      first_name: 'John',
      last_name: 'James',
      password: 'jamespass',
      address: '12, joriondo street, Lagos'
    },
  
    // invalid email format 2
    {
      email: 'jjamesgmail.com',
      first_name: 'John',
      last_name: 'James',
      password: 'jamespass',
      address: '23, rondle avenue, Lagos'
    },
    // Existing email 3
    {
      email: 'iknagod@gmail.com',
      first_name: 'John',
      last_name: 'James',
      password: 'jamespass',
      address: '23, randle street, Lagos'
    },
  
    // Firstname
    // undefined firstname 4
    {
      email: 'babnla@gmail.com',
      last_name: 'James',
      password: 'jamespass',
      address: '14 ketu street,Lagos'
    },
    // spaced firstname 5
    {
      email: 'donbabj@gmail.com',
      first_name: 'Ike nna',
      last_name: 'James',
      password: 'jamespass',
      address: '14 ketu street,Lagos'
    },
    // short firstname length 6
    {
      email: 'iknababa@gmail.com',
      first_name: 'I',
      last_name: 'James',
      password: 'jamespass',
      address: '14 ketu street,Lagos'
    },
  
    // lastname
    // undefined lastname 7
    {
      email: 'jekyll@gmail.com',
      first_name: 'Ikenna',
      password: 'jamespass',
      address: '14 ketu street,Lagos'
    },
    // lastname space 8
    {
      email: 'jacintha@gmail.com',
      first_name: 'Ikenna',
      last_name: 'Jam es',
      password: 'jamespass',
      address: '14 ketu street,Lagos'
    },
  
    // Password
    // undefined password 9
    {
      email: 'iknagod@gmail.com',
      first_name: 'Ikenna',
      last_name: 'James',
      address: '14 ketu street,Lagos'
    },
    // short password 10
    {
      email: 'seller@gmail.com',
      first_name: 'Ikenna',
      last_name: 'James',
      password: 'js',
      address: '14 ketu street,Lagos'
    },
    // address
    // undefined address 11
    {
      email: 'iknagod@gmail.com',
      first_name: 'Ikenna',
      last_name: 'James',
      password: 'Kembewoi'
    }
  ];
  
  // Login
  export const inValidLoginData = [
    // no email/empty email 0
    {
      password: 'jamiejesss'
    },
  
    // email not found in the db 1
    {
      email: 'jossyoloye@gmail.com',
      password: 'jossyboy'
    },
  
    // no password/empty password 2
    {
      email: 'iknagod@gmail.com'
    },
    // password not in db 3
    {
      email: 'iknagod@gmail.com',
      password: 'lasiselenu'
    }
  ];