import React, { useState } from 'react'
import { Context } from "../context/contex"

export default function UsePoisson({ children }) {

    const [Team1, setTeam1] = useState("")
    const [Team1Img, setTeam1Img] = useState("")
    const [Team2, setTeam2] = useState("")
    const [Team2Img, setTeam2Img] = useState("")
    const [maxGoles, setMaxGoles] = useState(0)
    const [code, setCode] = useState("")
    const [selectedValue, setSelectedValue] = useState("2");
    const [poisson, setPoisson] = useState();
    


    const mediaGoles = async (team, partidos, code) => {
        let datos = await (await fetch(`https://raw.githubusercontent.com/openfootball/football.json/master/2024-25/${code}.1.json`)).json()
        const h = datos.matches.filter((match) => match.team1 == team || match.team2 == team)
        const fe = h.filter((match) => Object.keys(match.score).length != 0)
        const clavesPrincipales = Object.keys(fe);
        let objetoInterno = [];

        for (let i = clavesPrincipales.length - 1; i >= 0; i--) {
            objetoInterno.push(fe[clavesPrincipales[i]]);
        }
        let equipo = team;
        let goles = []

        for (let index = 0; index < partidos; index++) {
            if (objetoInterno[index].team1 == equipo) {
                goles.push(objetoInterno[index].score.ft[0])
            } else {
                goles.push(objetoInterno[index].score.ft[1])
            }
        }

        let totalGoles = goles.length
        let totalGolesLocal = 0
        let media = 0

        goles.forEach((gol) => {
            totalGolesLocal += gol
        });

        media = totalGolesLocal / totalGoles
        return media
    }

    const ProbabilidadPoisson = async (media, k) => {
        return (Math.pow(await media, k) * Math.exp(- await media)) / factorial(k);
    }

    function factorial(n) {
        return n ? n * factorial(n - 1) : 1;
    }

    const ProbabilidadGoles = async (media, maxGoles) => {
        let probabilidad = [];
        for (let i = 0; i <= maxGoles; i++) {
            probabilidad.push(ProbabilidadPoisson(await media, i));
        }
        return probabilidad;
    }

    const ProbabilidadResultados = async (media1, media2, maxGoles, partidos, code) => {
        let mediaUno = await mediaGoles(media1, partidos, code);
        let mediaDos = await mediaGoles(media2, partidos, code);
        let probabilidadA = await ProbabilidadGoles(mediaUno, maxGoles);
        let probabilidadB = await ProbabilidadGoles(mediaDos, maxGoles);

        let result = {
            winA: 0,
            draw: 0,
            winB: 0,
            probableResult: null,
        };

        let maxProb = 0;
        let probableResult = "";

        for (let goalsA = 0; goalsA <= maxGoles; goalsA++) {
            for (let goalsB = 0; goalsB <= maxGoles; goalsB++) {
                let prob = await probabilidadA[goalsA] * await probabilidadB[goalsB];
                if (goalsA > goalsB) {
                    result.winA += prob;
                } else if (goalsA < goalsB) {
                    result.winB += prob;
                } else {
                    result.draw += prob;
                }

                if (prob > maxProb) {
                    maxProb = prob;
                    probableResult = `${goalsA}-${goalsB}`;
                }
            }
        }

        result.probableResult = { score: probableResult, probability: (maxProb * 100).toFixed(1) + "%" };

        return result;
    };

    const calcular = async (media1, media2, maxGoles, partidos, code) => {
        const j1 = await ProbabilidadResultados(media1, media2, maxGoles, partidos, code)
        setPoisson(j1)
    }

    function handleClick(name,img) {

        if (Team1 == "" && Team1Img == "") {
            setTeam1(name)
            setTeam1Img(img)

        } else {
            setTeam2(name)
            setTeam2Img(img)
        }
        
        if (name == Team1 && img == Team1Img) {
            setTeam1("")
            setTeam1Img("")

        } else if (name == Team2 && img == Team2Img) {
            setTeam2("")
            setTeam2Img("")
        }
    }

    function reset() {
        setTeam1("")
        setTeam2("")
    }

    function handleText(name) {
        setMaxGoles(name)
    }
    return (
        <Context.Provider value={{ selectedValue, setSelectedValue, Team1, Team2, setTeam1, setTeam2, setMaxGoles, maxGoles, calcular, setCode, code, handleClick, reset, handleText, Team1Img, Team2Img, poisson }}>
            {children}
        </Context.Provider>
    )
}
