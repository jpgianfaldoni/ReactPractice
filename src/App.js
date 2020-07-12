import React from 'react';
import Movies from "./components/Movies"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import 'fontsource-roboto';
import {key} from "./components/Keys"




class App extends React.Component {

	constructor(){
		super()
		this.state = {
			loading: true,
			movieData : {},
			pageNumber: 2,
			topText : "Lord"
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	componentDidMount() {
		const id = this.props.id
		this.setState({loading:true})
		fetch("http://www.omdbapi.com/?s=%27Lord%27&apikey=" + key)
			.then(response => response.json())
			.then(data => {
				this.setState({
					loading: false,
					movieData : data.Search,
				})
			})
	}

	handleChange(event){
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		fetch("http://www.omdbapi.com/?s=%27" + this.state.topText + "%27&apikey=" + key)
			.then(response => response.json())
			.then(data2 => {
				this.setState({
					movieData : data2.Search
				})
			})
	}

	handleClick(){
		fetch("http://www.omdbapi.com/?s=%27" + this.state.topText + "%27&page=" + this.state.pageNumber + "&apikey=" + key)
			.then(response => response.json())
			.then(data3 => {
				this.setState({
					pageNumber: this.state.pageNumber + 1,
					movieData : data3.Search,
				})
			})
	}

	render(){
		console.log(key)
		const elements = []
		var i
		for (i = 0; i < this.state.movieData.length; i++) {
  			elements.push(<Movies id = {i} movieDataSent = {this.state.movieData} />);
			}
		return(
			<div className = "movies">
				{
					this.state.loading ? <h1>Loading</h1> :
				<div className = "movies">
					<form className = "header" onSubmit = {this.handleSubmit}>
      					<TextField className = "button"
      						id="outlined-basic"
      						variant="outlined" 
      						value = {this.state.topText} 
      						onChange={this.handleChange}
      						name = "topText"
      					/>
						<Button type = "submit" variant="contained"  size="medium">
						  submit
						</Button>
					</form>
					<Button type = "submit" variant="contained"  size="medium" onClick ={this.handleClick}>
						  Next
					</Button>
						<Grid className = "movies">
							{elements}
						</Grid>
				</div>
				}
			</div>	
	)

}
}


export default App;
