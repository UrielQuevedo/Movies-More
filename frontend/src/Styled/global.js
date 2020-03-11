import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

  body {
    background-color: ${({ theme }) => theme.body};
    background-image: url('');
    transition: 1s;
  }
  
  .footer {
    margin-top: 40px;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-bottom: 20px;
    background-color: #061552;
    text-align: center;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select:none;
  }
  
  .contenedor {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .email-icon {
    margin-left: 10px;
    margin-right: 10px;
    color: #384060;
    transform: scale(1.3,1.3);
  }

  .item-selected {
    color: #fff;
    text-transform: uppercase;
    font-weight: 800;
    padding: 0 !important;
    margin-left: 14px;
    height: 51px;
    border-bottom: 5px solid #21FFE2;
  }

  nav {
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select:none;
    background: #061552;
  }

  .nav-item {
    padding-bottom: 11px;
    color: #fff;
    font-weight: 800;
    text-transform: uppercase;
    margin-left: 14px;
    padding: 0 !important;
    height: 51px;
  }

  .input-search:focus {
    border-bottom: 1px solid #21FFE2 !important;
    -webkit-box-shadow: 0 1px 0 0 #21FFE2 !important;
    box-shadow: 0 1px 0 0 #21FFE2 !important;
  }

  .input-search {
    border-bottom: 1px solid #fff !important;
  }

  .input-search::-webkit-input-placeholder {
    font-size: 14px;
    color: #9e9e9e;
  }

  .textBox {
    padding: 11px;
    color: white;
    border: 1.5px solid #5065BD;
    min-height: 100px;
    margin-bottom: 20px;
  }

  .textBox:focus {
    border: 1.5px solid #21ffe2;
  }

  .textBox::-webkit-input-placeholder {
    font-size: 14px;
    color: #21ffe2;
  }

  .btn-close {
    background: black;
    font-weight: 600;
    height: 36px;
    width: 105px;
    border: 1px solid red;
  }

  .modal-footer-content {
    border: 1.5px solid #5065BD;
    border-radius: 8px;
    background: #061552;
  }

  .select-dropdown {
    color: #fff;
    border-bottom: 1px solid #21FFE2 !important;
  }

  .select-dropdown li.disabled>span {
    color: #fff
  }

  .select-dropdown li.disabled>span:hover {
    background: transparent !important;
  }

  .dropdown-content li>span {
    color: #20f8dc;
  }

  .dropdown-content li>span:hover {
    background: #5065bd59 !important;
  }

  .select-dropdown {
    background: #000419;
  }

  .caret {
    fill: #21FFE2 !important;
  }

  .dropdown-content-lenguage-item:hover {
    background-color: #061552b3 !important;
    color: #fff;
  }

  .dropdown-content-lenguage {
    color: #212529 !important;
    background-color: #e4e4e4 !important;
    font-size: 1rem;
    font-weight: 500;
    width: 120px !important;
    height: 27px !important;
  }

  .dropdown-content-lenguage-item {
    transition: 0.5s;
    text-align: center !important;
    min-height: 0 !important;
  }

  .dropdown-content-setting {
    background: #061552;
    min-height: 100px !important;
    width: 240px !important;
    border: 0.1px solid #5065BD;
  }

  .dropdown-content-setting-theme-item {
    color: #FAEBD7 !important;
    margin: 0 !important;
    padding: 0 !important;
    text-align: center !important;
    min-height: 33px !important;
    cursor: default !important;
  }

  .icons-settings {
    line-height: 37px !important;
    color: #21FFE2 !important;
    height: 36px !important;
    transform: scale(0.8, 0.8) !important;
  }

  .text-settings {
    text-align: start !important;
    padding: 0px !important;
    line-height: 37px !important;
  }

  .dropdown-content-setting-theme-item:hover {
    background: transparent !important;
  }
 
  .dropdown-content-setting-item:hover {
    background: #5065bd73 !important;
  }

  .dropdown-content-setting-item {
    margin: 0 !important;
    padding: 0 !important;
    color: #FAEBD7 !important;
    text-align: center !important;
    min-height: 33px !important;
  }

  .setting-name {
    font-weight: 500;
    font-size: 14px;
    margin: 0;
    height: 17px;
  }

  .dropdownContainer {
    display: flex;
    height: 50px; 
    align-items: center;
    justify-content: flex-end;
  }

  .nav-item:hover {
    color: #7A7575;
  }

  .item-selected:hover {
    background: transparent;
    color: #fff;
  }

  .item-selected:after {
    height: 0px !important;
  }

  .nav-item,
  .nav-item:after,
  .nav-item:before {
    transition: all .5s;
  }
  
  .nav-item {
    position: relative;
  }
  .nav-item:after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 0%;
    content: '';
    color: transparent;
    background: #21FFE2;
    height: 5px;
  }

  .nav-item:hover:after {
    width: 100%;
  }

  .add-icon {
    cursor: pointer;
    color: #F34335;
    transform: scale(1.8,1.8);
  }
  
  .contenido {
    padding-bottom: 15px;
    padding-top: 39px;
  }
  
  .icons-footer {
    margin-top: 12px;
  }
  
  .urlIcon {
    height: 24px;
    width: 24px;
  }
  
`