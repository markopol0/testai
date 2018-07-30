// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';
import { Typography } from '../../node_modules/@material-ui/core';
import ToggleButton, { ToggleButtonGroup } from '@material-ui/lab/ToggleButton';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';


import data from './data.json';
import {BarChart, Bar, XAxis, LabelList, ResponsiveContainer} from 'recharts';

const styles = theme => ({
    root: {
        width: '100%',
    },
    mainColumn: {
        width: '100%',
    },
    testCaseContainer:{
        width: '100%',
        border: 'solid 1px '+ theme.palette.primary.dark
    },
    testCaseHeader: {
        width: '100%',
        border: 'solid 1px '+ theme.palette.primary.dark,
        
    },
    testCaseScreenshots: {
        width: '100%',
        borderRight: 'solid 1px '+ theme.palette.primary.dark,
    },
    testCaseCharts:{
        width: '100%',

    },
    successIcon: {
        color: green[500],
        marginRight: theme.spacing.unit,
    },
    title:{
        fontSize: 15,
        marginLeft: theme.spacing.unit,
    },
    failIcon: {
        color: red[500],
        marginRight: theme.spacing.unit
    },
    testStatus:{
        height: 50,
        margin: 10,
        
    },
    testStatusSelected:{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover':{
            cursor: 'default',
            backgroundColor: theme.palette.secondary.main,
        }
    },

    testName: {
        margin: 10,
        fontSize: 20,
        fontWeight: 700,
        textTransform: 'capitalize'
    },
    screenShot:{
        width: 80,
        margin: 10,
        '&:hover':{
            cursor: 'pointer',
        } ,
        border: 'solid 3px transparent'

    },
    screenShotSelected:{
        border: 'solid 3px '+ theme.palette.secondary.main,
    },
    testCaseChartsHeader:{
        height: 80,
        alignItems: 'flex-start',
        justifyContent: 'center',
        display: 'flex',
    },
    testCaseChart:{
        // height: 140,
        width: '100%',

    },
    chartTypeIcon:{
        width: 20,

    }
})

class HomePage extends Component {
    constructor(props) {
		super(props);
        this.state = {
            statusFilter: 'total',
            selectedTest: -1,
            selectedScreenshot: -1,
            chartType:'time',//time,cpu,memory
        };
    }
    componentDidMount() {		    
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#insertion-point-jss'),
        );
    }
    handleStatusFilter = (filter) => {
        const { statusFilter } = this.state;
        if(statusFilter!==filter){        
            this.setState({
                statusFilter: filter,
            });
        }
    };
    handleChartType  = (newChartType) => {
        const { chartType } = this.state;
        if(chartType!==newChartType){        
            this.setState({
                chartType: newChartType,
            });
        }
    };
    handleScreenshotSelect = (newTest,newScreenshot) => {
        const { selectedTest, selectedScreenshot } = this.state;
        if(selectedTest==newTest && selectedScreenshot==newScreenshot){
            this.setState({
                selectedTest: -1,
                selectedScreenshot: -1
            });
        }else{
            this.setState({
                selectedTest: newTest,
                selectedScreenshot: newScreenshot
            });
        }
        if(selectedTest!=newTest){
            this.setState({
                chartType: 'time',
            })
        }
    };
    render(){
        const { classes, theme} = this.props        
        const { statusFilter, selectedTest, selectedScreenshot, chartType } = this.state;

        return (
            <Grid container spacing={0} justify={'center'} alignItems={'flex-start'} className={classes.root}>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={0} direction={'column'} justify={'flex-start'} alignItems={'center'} className={classes.mainColumn}>
                        <Grid item xs={12} className={classes.testCaseHeader}>
                            <Button variant="outlined" className={classNames(classes.testStatus, {[classes.testStatusSelected]: statusFilter=='total'})} onClick={() => this.handleStatusFilter('total')}>
                                total : {data.test_cases.length}
                            </Button>
                            
                            <Button variant="outlined" className={classNames(classes.testStatus, {[classes.testStatusSelected]: statusFilter=='success'})} onClick={() => this.handleStatusFilter('success')}>
                                <Icon className={classNames(classes.successIcon, 'fas fa-check-circle')} />  passed : {data.test_cases.filter(t=>t.status).length}
                            </Button>

                            <Button variant="outlined" className={classNames(classes.testStatus, {[classes.testStatusSelected]: statusFilter=='fail'})} onClick={() => this.handleStatusFilter('fail')}>
                                <Icon className={classNames(classes.failIcon, 'fas fa-times-circle')} />  failed : {data.test_cases.length-data.test_cases.filter(t=>t.status).length}
                            </Button>

                        </Grid>
                        
                        {data.test_cases.map( (test,i) =>{

                            if(statusFilter=='total' || (test.status==true && statusFilter=='success' ) || (test.status==false && statusFilter=='fail' )){
                            return(
                                <React.Fragment key={i}>
                                    <Grid item xs={12} className={classes.testCaseContainer}>
                                        <Grid container spacing={0} direction={'row'} justify={'flex-start'} alignItems={'center'} style={{width:'100%'}}>
                                            <Grid item xs={i==selectedTest? 8 : 12} className={classes.testCaseScreenshots}>
                                                <Typography className={classes.testName}>
                                                    {test.test_name}
                                                    {test.status
                                                        ?   <Icon className={classNames(classes.successIcon, classes.title, 'fas fa-check-circle')} /> 
                                                        :   <Icon className={classNames(classes.failIcon, classes.title, 'fas fa-times-circle')} /> 
                                                    }
                                                </Typography>
                                                <div style={{overflow: 'scroll', whiteSpace: 'nowrap'}}>
                                                    {test.test_steps.map((step,j)=>{
                                                        return(
                                                            <img key={j} src={'../../images/'+step.screenshot} className={classNames(classes.screenShot, {[classes.screenShotSelected]:i==selectedTest && j==selectedScreenshot})} onClick={() => this.handleScreenshotSelect(i,j)}/>
                                                        )
                                                    })}
                                                </div>

                                            </Grid>
                                            {i==selectedTest &&
                                                <Grid key={i} item xs={4} className={classes.testCaseCharts}>
                                                    <Grid container spacing={0} direction={'column'} justify={'space-between'} alignItems={'center'} style={{width:'100%'}}>
                                                            <Grid item xs={12} className={classes.testCaseChartsHeader}>
                                                                <ToggleButtonGroup value={chartType} exclusive onChange={this.handleChartType}>
                                                                    <ToggleButton value="time">
                                                                        <Icon className={classNames(classes.chartTypeIcon, 'fas fa-stopwatch')} />    
                                                                    </ToggleButton>
                                                                    <ToggleButton value="memory">
                                                                        <Icon className={classNames(classes.chartTypeIcon, 'fas fa-memory')} />    
                                                                    </ToggleButton>
                                                                    <ToggleButton value="cpu">
                                                                        <Icon className={classNames(classes.chartTypeIcon, 'fas fa-server')} />    
                                                                    </ToggleButton>
                                                                </ToggleButtonGroup>
                                                            </Grid>
                                                            {chartType=='time' &&
                                                                <Grid item xs={12} className={classes.testCaseChart}>
                                                                    <ResponsiveContainer width='100%' height={130}>

                                                                        <BarChart margin={{ top: 30, right: 0, left: 0, bottom: 0 }} data={test.test_steps[selectedScreenshot].launch_times.map(t=>{return {x:t}})}>
                                                                            <Bar dataKey='x' fill='#8884d8'>
                                                                                <LabelList dataKey="x" content={props=>props.value+'ms'} position="top" />
                                                                            </Bar>
                                                                            <XAxis dataKey="" />
                                                                        </BarChart>
                                                                    </ResponsiveContainer>

                                                                </Grid>
                                                            }
                                                            {chartType=='memory' &&

                                                                <Grid item xs={12} className={classes.testCaseChart}>
                                                                    <ResponsiveContainer width='100%' height={130}>

                                                                        <BarChart margin={{ top: 30, right: 0, left: 0, bottom: 0 }} data={test.test_steps[selectedScreenshot].memory.map(m=>{return {x:m}})}>
                                                                            <Bar dataKey='x' fill='#42f48f'>
                                                                                <LabelList dataKey="x" content={props=>props.value+'kb'} position="top" />
                                                                            </Bar>
                                                                            <XAxis dataKey="" />
                                                                        </BarChart>
                                                                    </ResponsiveContainer>

                                                                </Grid>
                                                            }
                                                            {chartType=='cpu' &&
                                                                <Grid item xs={12} className={classes.testCaseChart}>
                                                                    <ResponsiveContainer width='100%' height={130}>

                                                                        <BarChart margin={{ top: 30, right: 0, left: 0, bottom: 0 }} data={test.test_steps[selectedScreenshot].cpu.map(c=>{return {x:c}})}>
                                                                            <Bar dataKey='x' fill='#f441a3'>
                                                                                <LabelList dataKey="x" content={props=>props.value+'%'} position="top" />
                                                                            </Bar>
                                                                            <XAxis dataKey="" />
                                                                        </BarChart>
                                                                    </ResponsiveContainer>

                                                                </Grid>
                                                            }
                                                    </Grid>
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                                
                            )}})
                            
                        }
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default withStyles(styles, { withTheme: true })(HomePage);