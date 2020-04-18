import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router';
import { getProgram } from '../Service/Api';

const Program = () => {

  const [ program, setProgram ] = useState({});
  const programUid = useParams().id;

  useEffect(() => {
    getProgram(programUid, 'en')
      .then((response) => console.log(response))
  }, [])

  return (
    <div>
      <h1 style={{ color:'#ffff' }}>PROGRAM</h1>
    </div>
  );
}

export default Program;