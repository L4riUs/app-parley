import { useEffect, useState } from "react";

export default function useLeagues() {

    const [leagues, setLeagues] = useState([]);
    const [leaguesDetails, setLeaguesDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorStatus, setErrorStatus] = useState(false);

    const getLeagues = async (Pais) => {
        const response = await fetch(`https://api.football-data.org/v4/competitions/${Pais}/teams`, { headers: { "X-Auth-Token": "d1c708a38a994e57803797849fcc5403" } });
        const data = await response.json();
        return data;
    };

    async function ViewLeagues() {
        setLoading(true);
        setError(null);
        setErrorStatus(false);

        try {
            const data = await Promise.all([
                getLeagues("PL"),
                getLeagues("PD"),
                getLeagues("BL1"),
                getLeagues("SA"),
                getLeagues("FL1"),
            ]);

            const leaguesData = data.map((leagueData) => ({
                id: leagueData.competition.code,
                name: leagueData.competition.name,
                emblem: leagueData.competition.emblem,
            }));

            setLeagues(leaguesData);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("Error en la solicitud");
            setErrorStatus(true);
        }
    }

    async function DetailLeague(code) {
        try {
            const data = await getLeagues(code);
            if (data && data.teams) { 
                const teams = data.teams;
                const nameTeams = teams.map((item) => item.name);
                const logoTeams = teams.map((item) => item.crest);
                
                setLeaguesDetails([{ team: nameTeams, logo: logoTeams }]);
            } else {
                setLeaguesDetails([]);
                console.error("No se encontraron equipos en la respuesta");
            }
        } catch (error) {
            console.error("Error al obtener los detalles de la liga", error);
            setLeaguesDetails([]); 
        }
    }
    
    return { leagues, loading, error, errorStatus, ViewLeagues, DetailLeague, leaguesDetails };
}