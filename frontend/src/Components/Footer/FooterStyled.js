import styled  from 'styled-components';

const FooterStyled = styled.footer `

  @media (max-width: 992px)
  {
    padding-bottom: 65px;
  }

  margin-top: 20px;
  left: 0;
  bottom: 0;;
  width: 100%;
  padding-bottom: 20px;
  background-color: #061552;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select:none;

  div h4 {
    @media (max-width: 992px)
    {
      padding-left: 0;
      float: none;
    }
    color: #FAEBD7;
    float: left;
    padding-left: 27px;
  }

  .footer-text-container {
    @media (max-width: 992px)
    {
      padding-right: 10.5px;
    }

    padding-right: 50px;
  }

  .contenedor {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .contenido {
    padding-bottom: 15px;
    padding-top: 39px;
  }

  .urlIcon {
    height: 24px;
    width: 24px;
  }

  .add-icon {
    cursor: pointer;
    color: #F34335;
    transform: scale(1.8,1.8);
  }

  .icons-footer {
    margin-top: 12px;
  }

  .email-icon {
    margin-left: 10px;
    margin-right: 10px;
    color: #384060;
    transform: scale(1.3,1.3);
  }

`
export default FooterStyled;