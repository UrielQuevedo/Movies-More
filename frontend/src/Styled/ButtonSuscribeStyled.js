import styled  from 'styled-components';

const DivBtnSuscribeStyled = styled.div `

  flex: 1 0 auto;
  justify-content: flex-end;
  display: flex;

  .button-suscribe {
    @media (max-width: 670px)
    {
      right: 36px;
    }
    @media (max-width: 600px)
    {
      bottom: 15px;
    }
    position: relative;
    right: 76px;
    border-radius: 4px;
    bottom: 11px;
    font-size: 11px;
    margin: -26px;
    text-align: center;
    line-height: 1px;
  }

`
export default DivBtnSuscribeStyled;