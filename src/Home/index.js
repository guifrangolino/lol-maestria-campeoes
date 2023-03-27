import { useState, useEffect } from "react"
import { Campeoes, Container, Invocador } from "./style"
import maestria1Img from '../assets/maestria-1.webp'
import maestria2Img from '../assets/maestria-2.webp'
import maestria3Img from '../assets/maestria-3.webp'
import maestria4Img from '../assets/maestria-4.webp'
import maestria5Img from '../assets/maestria-5.webp'
import maestria6Img from '../assets/maestria-6.webp'
import maestria7Img from '../assets/maestria-7.webp'

const maestriaImages = {
  1: maestria1Img,
  2: maestria2Img,
  3: maestria3Img,
  4: maestria4Img,
  5: maestria5Img,
  6: maestria6Img,
  7: maestria7Img,
}

function Home() {

  const [invocadorData, setInvocadorData] = useState({})
  const [nickPesquisa, setNickPesquisa] = useState('invocador')
  const [invocadorMaestrias, setInvocadorMaestrias] = useState([])
  const [champById, setChampById] = useState({})
  // const [pesquisaErro, setPesquisaErro] = useState(false)

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      setNickPesquisa(event.target.value)
    }
  }

  useEffect(() => {
    fetch('https://ddragon.leagueoflegends.com/cdn/13.6.1/data/pt_BR/champion.json')
      .then(response => response.json())
      .then(data => {

        const champById = {}

        for (const champ in data.data) {
          champById[data.data[champ].key] = {
            key: data.data[champ].key,
            name: data.data[champ].name,
            id: data.data[champ].id
          }
        }

        setChampById(champById)

      })


  }, [])

  useEffect(() => {
    fetch(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickPesquisa}?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(data => {


        
        const { id, name, profileIconId, summonerLevel } = data

        const invocadorData = {
          id,
          name,
          profileIconId,
          summonerLevel
        }

        setInvocadorData(invocadorData)

      })
      .catch(err => console.log('erro'))

  }, [nickPesquisa])

  useEffect(() => {
    if (invocadorData.id) {
      fetch(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${invocadorData.id}?api_key=${process.env.REACT_APP_API_KEY}`)
          .then(response => response.json())
          .then(data => {
            setInvocadorMaestrias(data)
          })
    }

  }, [invocadorData])

  return (
    <Container>
      <p>Digite seu nick:</p>
      <input type="text" placeholder="Nick" onKeyDown={handleKeyDown} />

      <Invocador>
        <div className="icone"><img src={invocadorData && invocadorData.profileIconId ? `https://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/${invocadorData.profileIconId}.png` : 'https://media.tenor.com/yc4UCkwXsb8AAAAj/singed.gif'} alt={invocadorData.profileIconId} /></div>
        <div className="invocador-dados">
          <h3>{invocadorData.name}</h3>
          <span>Level: {invocadorData.summonerLevel}</span>
        </div>
      </Invocador>

      <Campeoes>
        {invocadorMaestrias.map(champ => {
          return (
            <li key={champ.championId}>

              <div className="img-container"><img src={`https://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${champById[champ.championId].id}.png`} alt={champ.championId} /></div>

              <div className="champ-data">
                <span className="champ-name">{champById[champ.championId].name}</span>
                <img src={maestriaImages[champ.championLevel]} alt={champ.championLevel} />
                <span className="champ-points">{champ.championPoints.toLocaleString("en-US")} Pts</span>
              </div>
              
            </li>
          )
        })}
      </Campeoes>

    </Container>
  )
}

export default Home