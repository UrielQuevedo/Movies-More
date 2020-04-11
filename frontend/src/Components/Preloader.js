import React from 'react'

const Preloader = ({style, color}) => {
  return (
    <div className={"preloader-wrapper small active " + style}>
      <div className={"spinner-layer " + color}>
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}
 
export default Preloader;