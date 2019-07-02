"use strict"
import React from 'react';
import Menu from './components/menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getReviews} from '../src/actions/reviewsActions';

class Main extends React.Component{
  componentDidMount(){
    this.props.getReviews();
  }
  render(){
    return(
      <div>
        <Menu />
          {this.props.children}
      </div>
    ); 
  }
}

function mapStateToProps(state){
  return {
  }
}

function mapDispatchToProps(dispatch){
 return bindActionCreators({
  getReviews:getReviews
 }, dispatch)
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);