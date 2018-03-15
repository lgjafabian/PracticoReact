import React from 'react';

class App extends React.Component {
    constructor() {
        super();
          
        this.state = {
           data: 
           [
              {id:'1', nombre:'a', url:'A'},
              {id:'2', nombre:'b', url:'B'},
              {id:'3', nombre:'c', url:'C'},
              {id:'4', nombre:'d', url:'D'},
              {id:'5', nombre:'e', url:'E'},
              {id:'6', nombre:'f', url:'F'},
              {id:'7', nombre:'g', url:'G'},
              {id:'8', nombre:'h', url:'H'},
              {id:'9', nombre:'i', url:'I'}
           ]
        }
     }
    
    render() {
        return (
            <div>
                Hola ITAcademy!
            </div>
        );
    }
}

export default App;