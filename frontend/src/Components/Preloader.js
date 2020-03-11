import React from 'react'

const Preloader = ({style, color}) => {
  return (
    <div class={"preloader-wrapper small active " + style}>
      <div class={"spinner-layer " + color}>
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  );
}
 
export default Preloader;