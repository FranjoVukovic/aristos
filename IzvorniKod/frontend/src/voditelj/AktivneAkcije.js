import React, { useState, useEffect }  from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';


function PregledAktivnihAkcija(){
    //pregled aktivnih akcija
    //klikom na akciju odlazi na mogucnost dodavanja tragača na akciju bez zahtjeva od istrazivaca

    const [actions, setActions] = useState([]);
    const location = useLocation();
    console.log("data on this location ", location.state);

    useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await fetch(`${BASE_URL}/manager/activeActions`, { 
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
            'username': location.state.username
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("fetchane akcije 2. put: ", data);
          setActions(data);
        } else {
          console.error('Failed to fetch actions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchActions();
    }, []);

    //TODO: UVIJEK KORISTITI useLocation za prijenos podataka izmedu stranica

    const navigate = useNavigate();
    const redirectToPage = async (path, actionId) => {
            navigate(`/${path}`, { state: { actionId: actionId, username: location.state.username} });
        };
      

    return (
        <div>
            <h2>Aktivne akcije</h2>
            <ul>
                {actions.map((action) => (
                    <li key={action.name} onClick={() => redirectToPage('manager/activeActions/mytrackers', action.id)} style={{ cursor: 'pointer' }}>
                        <strong>{action.name}</strong>
                    </li>
                ))}
            </ul>
        </div>
      );
}
export default PregledAktivnihAkcija;