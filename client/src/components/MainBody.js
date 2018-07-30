// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Home from '../containers/Home';
import { Switch, Route, Redirect } from 'react-router-dom';



const styles = theme => ({
    root: {
        width: '100%',
    },

})

class MainBody extends Component {
    
    render(){
        const {classes, theme} = this.props
        
                return (
                    <main className={classes.root}>
                        <Switch>
                            <Route path='*' component={Home} />
                        </Switch>
                    </main>
                )
            
    }
}



MainBody.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    
}

export default withStyles(styles, { withTheme: true })(MainBody);