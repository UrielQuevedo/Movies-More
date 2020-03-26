import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`


  .react-multiple-carousel__arrow--right {
    right: 0;
  }

  .react-multiple-carousel__arrow--left {
    left: 0;
}

  .react-multiple-carousel__arrow {
    position: absolute;
    outline: 0;
    transition: all .5s;
    border-radius: 0px !important;
    z-index: 0;
    top: 0;
    border: 0;
    background: rgba(0,0,0,.5);
    min-width: 43px;
    min-height: 21.6rem;
    opacity: 1;
    cursor: pointer;
}

button:focus {
  background: rgba(0,0,0,.5) !important;
}

  .contenedor-imagen {
    position: relative;
    height: 0;
    padding-top: 150.27%;
    overflow: hidden;
    background: #202124;
    transition: -webkit-transform .3s ease-in-out;
    transition: transform .3s ease-in-out;
    transition: transform .3s ease-in-out,-webkit-transform .3s ease-in-out;
  }

  .contenedor-imagen:hover {
    transform: scale(1.02);
  }

  .contenedor-imagen.imagenes img {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  .imagenes .imagen {
    opacity: 1;
  }

  .contenedor-imagen img, .contenedor-imagen span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-transform: scale(.97);
    transform: scale(.97);
  }

  .imagen {
    display: block;
    min-height: 1px;
    opacity: 0;
    transition: all .3s ease-in-out;
  }

  img {
    display: inline-block;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }

  .container-items .carde {
    @media (max-width: 1024px)
    {
        width: 18%;
    }
    @media (max-width: 640px)
    {
        width: 33.33333%;
    }
    width: 14%;
    padding: 0 .6rem 0 0;
  }

  .carde {
    @media (min-width: 640px)
    {
      margin-bottom: 2rem;
    }
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .container-items {
    display: flex;
    flex-wrap: wrap;
    margin-right: -.4rem;
    margin-left: -.4rem;
  }

  body {
    background-color: ${({ theme }) => theme.body};
    background-image: url('');
    transition: 1s;
  }

  .collapse-menu-genre {
    width: 100%;
    background: linear-gradient(0deg, 
      rgba(23,30,61,1) 15%, 
      rgba(23,30,61,1) 15%, 
      rgba(23,30,61,1) 15%, 
      rgba(23,30,61,1) 15%, 
      rgba(23,30,61,0.8136205165660014) 30%, 
      rgba(23,30,61,0.8136205165660014) 77%, 
      rgba(23,30,61,1) 98%)
  }

  .genre-list::-webkit-scrollbar {
    display: none;
  }

  .close-buttom-genre {
    color: #ffffff;
    background: black;
    border-radius: 31px;
    transform: scale(1.5);
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0) scale(2);
  }

  .genre-title {
    color: #9c9595;
    height: 48px;
    font-weight: 600;
    font-size: 22px;
  }

  .genre-list {
    overflow: auto;
    height: 92%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-genres-nav {
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    padding: 0 !important;
  }

  .genres-navbar {
    position: fixed;
    width: 100%;
    top: 54px;
    background: #171e3d;
    animation-name: genres;
    animation-duration: 0.5s;
    z-index: 0;
  }

  @keyframes genres {
    0% {
      top: 0px;
    }
  }

  .mobile-navbar-top {
    z-index: 1;
    position: fixed;
    transition: 0.4s;
    width: 100%;
    background: rgb(2, 9, 35);
  }

  .mobile-navbar-top-hidden {
    top: -60px;
  }

  .mobile-navbar-top-visible {
    top: -1px;
  }

  .search-bar {
    position: fixed;
    z-index: -1;
    width: 100%;
    bottom: 50px;
    animation-name: search;
    animation-duration: 0.5s;
    background: #26a69a;
  }

  @keyframes search {
    0% {
      bottom: 0px;
    }
  }

  .input-search-bar {
    padding-left: 9px !important;
    width: 100% !important;
    color: #fff;
  }

  .input-search-bar::-webkit-input-placeholder {
    font-size: 14px;
    color: #0d2321;
  }

  .input-search-bar:focus {
    color: #fff !important;
    background: #26a69a !important;
  }

  .collapse-body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .sidenav-trigger{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  .mobile-navbar-item-selected {
    color: #21FFE2;
  }

  .mobile-nav-item {
    color: #fff;
    font-weight: 800;
    text-transform: uppercase;
    padding: 0 !important;
    transition: 0.5s;
    @media (max-width: 320px)
    {
      font-size: 12px;
    }
  }

  .mobile-nav-item-selected {
    font-size: 17px;
    @media (max-width: 320px)
    {
      font-size: 14.5px;
    }
  }


  .collapse-user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .mobile-navbar-bottom-item {
    text-align: center;
    margin: 0;
    line-height: 0;
    font-size: 9px;
    transform: translateX(0px);
  }

  .collapse-menu-icon-close {
    color: #b92f34;
    transform: scale(2);
    cursor:pointer;
  }

  .collapse-menu-close {
    position: fixed;
    bottom: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12%;
    width: 100%;
  }

  .collapse-menu-font {
    color: #fff;
    font-size: 20px;
    font-weight: 700;
  }

  .collapsible-menu {
    color: #fff;
    background: #2e3d79 !important;
    font-size: 15px !important;
    font-weight: 400 !important;
  }

  .collapse-menu {
    background: #000B38;
    border: 1.5px solid #061552;
    width: 100%;
  }

  .collapse-menu-lenguage {
    margin-right: 16px !important;
    transform: translateX(-7px);
  }

  .collapse-menu-icon {
    text-align:center;
    line-height: 48px;
    color: #ee6e73;
    transform: scale(1.2);
  }

  .mobile-nav-top {
    background: rgb(2, 9, 35);
  }
  
  .mobile-nav-bottom {
    background: rgb(2, 9, 35);
    height:53px;
  }

  .mobile-navbar-bottom {
    position: fixed;
    width: 100%;
    z-index: 1;
    bottom: -1px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select:none;
  }

  .collapse-icon {
    transform: translateY(-5px) scale(1.35) !important;
  }

  .mobile-navbar-bottom-icons {
    height: 41px !important;
    transform: translateY(-7px) scale(1.1);
  }

  .footer {
    @media (max-width: 992px)
    {
      padding-bottom: 65px;
    }
    margin-top: 40px;
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