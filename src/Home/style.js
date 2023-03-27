import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 2rem;
  max-width: 1280px;

  p {
    font-size: 150%;
  }

  input {
    max-width: 300px;
    width: 100%;
    margin: 1rem auto;
    outline: none;
    border: none;
    font-size: 130%;
    padding: .2rem .5rem;
  }

`

export const Invocador = styled.div`
  display: flex;
  align-items: center;
  padding: 7px;
  /* border: 1px solid white; */

  .icone {
    max-width: 120px;
    max-height: 120px;
    
    img {
      border-radius: 50%;
      border: 5px solid #c8a972;
      width: 100%;
    }
  }

  .invocador-dados {
    text-align: center;
    padding: 0 1rem;
  }

`

export const Campeoes = styled.ul`
  list-style: none;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  column-gap: 1rem;
  row-gap: 2rem;
  padding: 1rem;
  
  li {
    border: 1px solid white;
    display: flex;
    margin: auto;
    width: 100%;
    
    .img-container {
      height: 100%;
      
      img {
        height: 100%;
      }
    }

    .champ-data {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin-left: auto;
      margin-right: auto;

      .champ-name {
        font-size: 125%;
      }

      img {
        max-width: 45px;
        width: 100%;
      }

      .champ-points {
        font-size: 110%;
      }

    }

  }

`