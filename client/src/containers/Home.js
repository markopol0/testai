import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { withRouter } from 'react-router';
import { setAppState } from '../actions/actions'


const mapStateToProps = (state) => {
	return {
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		setAppState: ( (data) => {dispatch(setAppState(data))}),
		dispatch: dispatch
	}
}

const Home = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePage))


export default Home;
