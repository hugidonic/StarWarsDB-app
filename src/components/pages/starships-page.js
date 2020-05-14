import React from 'react';
import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom'

const StarshipPage = ({ history }) => {
  return (
    <div>
      <h2>Startships</h2>
      <StarshipList 
        onItemSelected={(itemId)=>{
          history.push(itemId)
        }} />
    </div>
  );
}

export default withRouter(StarshipPage)
