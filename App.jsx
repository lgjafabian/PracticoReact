import React from 'react';

class App extends React.Component {
    constructor() {
        super()
          
        this.state = {
            height: 4,
            width: 4,
            data: [],
            flat: []
        }        
     }
     
     componentWillMount() {
   
        fetch('https://api.mercadolibre.com/sites/MLA/trends/search').then((response) => {
            return response.json()
        }).then((response) => {
            
            this.state.flat = response
            
            var width = 0
            var height = 0
            var row = []
            
            response.forEach((element) => {
                fetch('https://api.mercadolibre.com/sites/MLA/search?q=' + element.keyword).then((response) => {
                    return response.json()
                }).then((response) => {
                    var aux = { name: element.keyword, url: response.results[0].thumbnail, id: response.results[0].category_id }
                    
                    if (height >= this.state.height) {
                        return 
                    }
                    if (width < this.state.width) {
                        row.push(aux)
                        width ++
                    } else if(width == this.state.width) {
                        this.state.data.push(row)
                        row = []
                        width = 0
                        height ++
                    }  
                })
            })
        }).then(() => {
            console.log(this.props)
            this.t1 = setTimeout(() => this.forceUpdate(), 2000)
        })
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
             {
                 this.props.row.map((element, i) =>
                    <td key={i}>{element.name}</td>
                )
             }
          </tr>
       );
    }
 }

export default App;