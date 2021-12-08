import React, {Component} from 'react'
import  {Table}  from 'react-bootstrap';
import Name from './Name'
import Date from './spaceDate'
import Descript from './Description'
import SpaceFavourite from './spaceFavourite'
import '/styles.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

type MyComponents = {
     Name: React.ReactNode
     Date: React.ReactNode;
     Description: React.ReactNode;
    Favourite: React.ReactNode;
    
}

class RowFlight extends React.Component<{}, MyComponents> {
    
    constructor(props: MyComponents){
        super(props)
    }
    
    render(){
        return (
            <>
            <Name />
            <Date />
            <Descript />
            <SpaceFavourite />
            </>
        );
    
    }
}


   
export default RowFlight;