import React from 'react';
import style from './bootstrap.min.css';
import Styles from './test.css'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

class App extends React.Component {
    constructor() {
        super()
          
        this.state = {
            data: [],
            flat: [],
            mod: 1
        }

        const query = new URLSearchParams(location.search)
        const height = query.get('height') 
        const width = query.get('width')
        this.state.height = (height >= 2 && height <= 5)? height : 3
        this.state.width = (width >= 2 && width <= 5)? width : 3
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
                    var aux = { name: element.keyword, url: response.results[0].thumbnail, id: response.results[0].category_id}
                    
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
            this.t1 = setTimeout(() => {
                this.alternateImg()
                this.forceUpdate()
            }, 1500)
        })
    }

    alternateImg() {
        this.state.mod = (this.state.mod == 1) ? 0 : 1
        for (var i=0 ; i< this.state.height ; i++) {
            var flag = i%2 == this.state.mod    
            for (var j=0 ; j < this.state.width ; j++) {
                this.state.data[i][j].showImg = flag
                flag = !flag
            }
        }
    }

    componentDidMount() {
        setInterval( () => {
            this.suffle(this.state.data)

            this.alternateImg()

            this.forceUpdate()
        },5000)
    }
    
    suffle(array) {
        console.log("HOLA")
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    render() {
        return (
                <div className={style.containerFluid}>
                    <br/>
                    {
                        <Form/>
                    }
                    {
                        this.state.data.map((row, i) =>
                            <Row key = {i} row = {row}/>
                        )
                    }
                </div>
        )
    }
}

class Form extends React.Component {
    render() {
        return (
            <div className={style.container} style={{'margin-bootom':'0px'}}>
                <form method='get' action='' className={style.row}> 
                    <div className={style.col}>
                        <select style={{width:'300px'}} className={style['custom-select']} name='height'>
                            <option selected>Select Height</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    
                    <div className={style.col}>
                        <select style={{width:'300px'}} className={style['custom-select']}  name='width'>
                            <option selected>Select Width</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    
                    <div className={style.col}>
                        <button className={style.btn} type='submmit'>Resize</button>
                    </div>
                </form>
            </div>
        )
    }
}

class Row extends React.Component {
    
    getRandomStyle() {
        var colors = ['#34A852', '#4285F4', '#EA4335', '#FABB05']
        
        var style = {
            'text-align':'center',
            'font-family': 'Nunito,sans-serif',
            'font-weight': '600',
            'color': '#fff',
            'font-size': '25px',
            'backgroundColor': colors[Math.floor(Math.random()*colors.length)],
            'top': '100px',
            'line-height': '120px',
            'height': '20vh'
        }

        return style
    }
    
    render() {
        
        var boxP = {
                'white-space': 'nowrap',
                'overflow': 'hidden' 
        }
        return (     
          <div className={style.row}>
             {
                 this.props.row.map((element, i) =>
                    <div className={style.col} style={this.getRandomStyle()} key={i}>
                    {
                        element.showImg?<img src={element.url}/> : <p className={Styles.animationP} style={boxP}>  {element.name}</p>
                    }
                    
                    </div>
                
                )
             }
          </div>
       );
    }
 }

export default App;