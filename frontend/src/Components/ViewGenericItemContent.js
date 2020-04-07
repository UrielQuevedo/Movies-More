import React from 'react'
import ViewItemContent from './ViewItemContent';

const ViewGenericItemContent = ({type, classStyle, content, ...rest}) => {
  let season_and_episode_number_component;
  if (type === 'new episodes') {
    season_and_episode_number_component = (
      <div className={"show-on-small-only " + classStyle }>
        <p style={{margin:'0', color:'#FAEBD7', textAlign:'center'}}>
          E0{content.episode_number}xS0{content.season_number}
        </p>
      </div>
    )
  }

  return <ViewItemContent {...rest} content={content} classStyle={classStyle} injectComponent={season_and_episode_number_component} />
}
 
export default ViewGenericItemContent;