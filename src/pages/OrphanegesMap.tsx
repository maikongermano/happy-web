import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcons';
import api from '../services/api';

import '../styles/pages/orphanage-map.css'

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string
}


function OrphanegesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]); // inicia com array vazio
    
    // buscar orphanages
    useEffect(() => {
        api.get('orphanages').then(response => {
            // setando lista
            setOrphanages(response.data)
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>

                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Apucarana</strong>
                    <span>Paraná</span>
                </footer>
            </aside>

            <Map 
                center={[-23.5703901,-51.462465]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />*/}

                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />

                {orphanages.map(orphanage => {
                    return (
                        <Marker 
                            key={orphanage.id}
                            icon={mapIcon}
                            position={[orphanage.latitude,orphanage.longitude]}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color='#FFF'/>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
                
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>
        </div>
    )
}

export default OrphanegesMap