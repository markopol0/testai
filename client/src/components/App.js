// Components
import React, { Component } from 'react';
import Main from '../containers/Main';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
	palette: {
		common:{
			black:'#484848',
			white:'#fafafa',
		},
		primary: {
		  	light: '#ffffff',
		  	main: '#fafafa',
		  	dark: '#c7c7c7',
			darker: '#8d8d8d',
		  	contrastText: '#424242',
		},
		secondary: {
		  	// lighter: '#c158dc',
		  	light: '#7953d2',
		  	main: '#4527a0',
		  	dark: '#000070',
		  	// darker: '#38006b',
		  	contrastText: '#fafafa',
		},
		error:{
			light: "#fa5788",
			main: "#c2185b",
			dark: "#8c0032",
			contrastText: "#fafafa",
		},
		text:{
			primary: "#484848",
			secondary: "#424242",
			// disabled: "rgba(0, 0, 0, 0.38)",
			// hint: "rgba(0, 0, 0, 0.38)",
		},
		background:{
			paper: '#fafafa',
			default: "#fafafa",
		},
		divider: "rgba(0, 0, 0, 0.12)"

	},
	// breakpoints: {
	// 	values: {xxs:0, xs:320, sm:600, md:960, lg:1280, xl:1440, xxl:1920},
	// },

});
const styles = theme => ({
	root: {
		width: '100%',
	},

})

class App extends Component {
	render(){
		const {classes} = this.props
		return(
			<MuiThemeProvider theme={theme}>
				<div className={classes.root} >
					<CssBaseline />
					<Main />
				</div>
			</MuiThemeProvider>
		)
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}
export default withStyles(styles, { withTheme: true })(App);