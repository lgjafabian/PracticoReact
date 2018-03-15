import React from 'react';
import axios from 'axios';

class App extends React.Component {
    constructor() {
        super();
          
        this.state = {
            height: 3,
            width: 3,
           data: 
           [
                [
                    {id:'1', name:'a', url:'A'},
                    {id:'2', name:'b', url:'B'},
                    {id:'3', name:'c', url:'C'}
                ],
                [
                    {id:'4', name:'d', url:'D'},
                    {id:'5', name:'e', url:'E'},
                    {id:'6', name:'f', url:'F'}
                ],
                [
                    {id:'7', name:'g', url:'G'},
                    {id:'8', name:'h', url:'H'},
                    {id:'9', name:'i', url:'I'}
                ]
           ]
        }        
     }
     

    render() {
        return (
            <div>
            <table>
               <tbody>
                  {
                        this.state.data.map((row, i) => 
                              <TableRow key = {i} row = {row} />
                        )
                  }
               </tbody>
            </table>
         </div>
        );
    }
}

class TableRow extends React.Component {
    render() {
       return (
          <tr>
             <td>{this.props.row[0].name}</td>
             <td>{this.props.row[1].name}</td>
             <td>{this.props.row[2].name}</td>
          </tr>
       );
    }
 }

export default App;