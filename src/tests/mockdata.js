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
      firstname: 'John',
      lastname: 'James',
      password: 'password',
      username: 'jamespass'
    },
  
    // undefined username 1
    {
      firstname: 'John',
      lastname: 'James',
      email: 'jjames@gmail.com',
      password: 'jamespass' 
    },

    // Existing email 2
    {
      firstname: 'Ikenna',
      lastname: 'James',
      email: 'iknagod@gmail.com',
      password: 'password',
      username: 'iknagod'
    },
  ];
  
  // Login
  export const inValidLoginData = [
    // email not found in the db 1
    {
      email: 'jossyoloye@gmail.com',
      password: 'jossyboy'
    },
  
    // no password/empty password 2
    {
      email: 'iknagod@gmail.com'
    }
  ];


  // Questions
  export const validQuestionData = [
    {
      title: 'simple question',
      text: 'why is my code not working?'
    },
    {
      title: 'another question',
      text: 'what is the difference between let and const?'
    }
  ];


  export const inValidQuestionData = [
    {
      text: 'why is my code not working?'
    },
    {
      title: 'another question'
    }
  ];

  export const answerData = [
    {
      text: 'taht question is ambiguous but welcome to stackoverflow'
    },
    {
      text: 'let is used to declare variables that can change while const is used to declare variables that can not change'
    },
    {
      text: ''
    }
  ];