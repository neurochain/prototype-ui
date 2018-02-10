module.exports = {
      type: 'list',
      name: 'activity',
      message: 'What is your activity? ',
      choices: [{
          key: 'P',
          name: 'Producer',
          activity: {
              type: 'list',
              name: 'variety',
              message: 'What kind of production?',
              choices: [{
                  key: 'G',
                  name: 'Grapes',
                  value: 'Grapes'
              },
              {
                  key: 'A',
                  name: 'Apples',
                  value: 'Apples'
              },
              {
                  key: 'P',
                  name: 'Pears',
                  value: 'Pears'
              }]
          }
      },
      {
          key: 'C',
          name: 'Carrier',
          value: 'Carrier'
      },
      {
          key: 'W',
          name: 'Warehouse',
          value: 'Warehouse'
      },
      {
          key: 'S',
          name: 'Shop',
          value: 'Shop'
      }]
  };
