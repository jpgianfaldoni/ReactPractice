import React from 'react';
import 'fontsource-roboto';



class Movies extends React.Component {

	constructor(){
	super()
	this.state = {
		loading: true,
		completeData: {}
		}
	this.handleChange = this.handleChange.bind(this)

	}

	componentDidMount() {
		const id = this.props.id
		fetch("https://www.omdbapi.com/?i=" + this.props.movieDataSent[id].imdbID + "&apikey=a1f39f57")
			.then(response => response.json())
			.then(data => {
				this.setState({
					completeData : data
				})
			})
	}

	componentDidUpdate(prevProps){
		const previusId = prevProps.id
		const id = this.props.id
		if (prevProps.movieDataSent[previusId].imdbID !== this.props.movieDataSent[id].imdbID){
		fetch("https://www.omdbapi.com/?i=" + this.props.movieDataSent[id].imdbID + "&apikey=a1f39f57")
			.then(response => response.json())
			.then(data => {
				this.setState({
					loading : false,
					completeData : data
				})
			})
		}
	}

	

	handleChange(event){
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	render(){
		const id = this.props.id
		return(
			<div>
			{
				this.props.loading ? <h1>Loading</h1> :
				<div className = "moviesComponent">
					<a href = {"https://www.imdb.com/title/" + this.props.movieDataSent[id].imdbID + "/?ref_=nv_sr_srsg_0"}style={{ textDecoration: 'none' }}>
						{this.props.movieDataSent[id].Title}
					</a>
					<div>
						<img src = {this.props.movieDataSent[id].Poster}/>
					</div>
					<h3>
						Release Year: {this.props.movieDataSent[id].Year}
					</h3>
					<h3>
						Genre: {this.state.completeData.Genre}
					</h3>
					<h3>
						Director: {this.state.completeData.Director}
					</h3>
					<h3>
						Imdb Rating: {this.state.completeData.imdbRating}
					</h3>
					<h3>
						Box Office: {this.state.completeData.BoxOffice}
					</h3>
				</div>
			}
			</div>	
	)

}
}


export default Movies;
