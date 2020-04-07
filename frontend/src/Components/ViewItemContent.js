import React from 'react'
import { Link } from 'react-router-dom';

const ViewItemContent = ({ content, classStyle, redirectPath, cardStyle, reference, injectComponent }) => {
  return (
    <div ref={reference} className={"carde " + classStyle} style={cardStyle}>
      <div className="contenedor-imagen imagenes">
        <Link to={redirectPath} className="fade">
          <img className='imagen' loading='lazy' src={content.poster_url} width="200" height="325" alt="" style={{borderRadius:'2px'}}/>
        </Link>
      </div> 
      <div className="truncate hide-on-small-only" style={{ color:'white', fontWeight:'500', marginTop:'5px', textAlign:'center' }}>
        {content.title}
      </div>
      {injectComponent}
    </div>
  );
}
 
export default ViewItemContent;